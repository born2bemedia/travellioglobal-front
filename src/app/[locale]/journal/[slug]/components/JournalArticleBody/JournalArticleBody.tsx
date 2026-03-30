"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import type { Children, Children2 } from "@/features/articles/model/types";

import { cn } from "@/shared/lib/helpers/styles";

import styles from "./JournalArticleBody.module.scss";

type JournalArticleBodyProps = {
  introNodes: Children[];
  contentNodes: Children[];
  contentsLabel: string;
};

type Section = {
  id: string;
  title: string;
  nodes: Children[];
};

const extractHeadingText = (node: Children) =>
  node.children
    ?.map((child) => child.text ?? "")
    .join("")
    .trim() ?? "";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)/g, "");

const groupIntoSections = (nodes: Children[]) => {
  const sections: Section[] = [];
  let currentSection: Section | null = null;

  for (const node of nodes) {
    if (node.type === "heading" && node.tag === "h2") {
      const title = extractHeadingText(node);
      const id = slugify(title);

      currentSection = {
        id,
        title,
        nodes: [node],
      };

      sections.push(currentSection);
      continue;
    }

    if (!currentSection) {
      currentSection = {
        id: "intro",
        title: "",
        nodes: [],
      };

      sections.push(currentSection);
    }

    currentSection.nodes.push(node);
  }

  return sections.filter((section) => section.title || section.nodes.length > 0);
};

const renderInlineContent = (children?: Children2[]) =>
  children?.map((child, index) => {
    if (child.type === "linebreak") {
      return <br key={`br-${index}`} />;
    }

    if (child.type === "link" || child.type === "autolink") {
      return (
        <a
          key={`link-${index}`}
          href={child.fields?.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {renderInlineContent(child.children)}
        </a>
      );
    }

    return (
      <span
        key={`text-${index}`}
        className={cn(child.format === 1 && styles.strong)}
      >
        {child.text}
      </span>
    );
  }) ?? null;

const renderListItem = (items?: Children2[]) =>
  items?.map((item, index) => {
    if (item.type === "list") {
      const nestedList = item as unknown as Children;

      return (
        <ul
          key={`nested-list-${index}`}
          className={cn(
            styles.list,
            nestedList.listType === "bullet"
              ? styles.listBullet
              : styles.listOrdered,
          )}
        >
          {nestedList.children?.map((nestedItem, nestedIndex) => (
            <li key={`nested-item-${nestedIndex}`} className={styles.listItem}>
              {renderListItem(nestedItem.children)}
            </li>
          ))}
        </ul>
      );
    }

    if (item.type === "linebreak") {
      return <br key={`linebreak-${index}`} />;
    }

    if (item.type === "link" || item.type === "autolink") {
      return (
        <a
          key={`list-link-${index}`}
          href={item.fields?.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {renderInlineContent(item.children)}
        </a>
      );
    }

    return (
      <span
        key={`list-text-${index}`}
        className={cn(styles.listText, item.format === 1 && styles.strong)}
      >
        {item.text}
      </span>
    );
  }) ?? null;

const RichTextNode = ({
  node,
  isIntro = false,
}: {
  node: Children;
  isIntro?: boolean;
}) => {
  if (node.type === "heading") {
    return (
      <h2 className={styles.section__title}>{renderInlineContent(node.children)}</h2>
    );
  }

  if (node.type === "paragraph") {
    return (
      <p className={cn(isIntro ? styles.intro__paragraph : styles.section__paragraph)}>
        {renderInlineContent(node.children)}
      </p>
    );
  }

  if (node.type === "list") {
    return (
      <ul
        className={cn(
          styles.list,
          node.listType === "bullet" ? styles.listBullet : styles.listOrdered,
        )}
      >
        {node.children?.map((item, index) => (
          <li key={`item-${index}`} className={styles.listItem}>
            {renderListItem(item.children)}
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

export const JournalArticleBody = ({
  introNodes,
  contentNodes,
  contentsLabel,
}: JournalArticleBodyProps) => {
  const sections = useMemo(() => groupIntoSections(contentNodes), [contentNodes]);
  const tocSections = useMemo(
    () => sections.filter((section) => section.title),
    [sections],
  );

  const [activeId, setActiveId] = useState(tocSections[0]?.id ?? "");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const setSectionRef = useCallback(
    (id: string) => (node: HTMLElement | null) => {
      if (node) {
        sectionRefs.current.set(id, node);
        return;
      }

      sectionRefs.current.delete(id);
    },
    [],
  );

  useEffect(() => {
    if (tocSections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryA.boundingClientRect.top - entryB.boundingClientRect.top);

        const currentId = visibleEntries[0]?.target.getAttribute("data-section-id");

        if (currentId) {
          setActiveId(currentId);
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: 0,
      },
    );

    sectionRefs.current.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [tocSections]);

  const handleScrollToSection = (id: string) => {
    const section = sectionRefs.current.get(id);

    if (!section) {
      return;
    }

    const top = section.getBoundingClientRect().top + window.scrollY - 132;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className={styles.body}>
      {introNodes.length > 0 ? (
        <div className={styles.intro}>
          {introNodes.map((node, index) => (
            <RichTextNode key={`intro-${index}`} node={node} isIntro />
          ))}
        </div>
      ) : null}

      <div className={styles.layout}>
        {tocSections.length > 0 ? (
          <aside className={styles.toc} aria-label={contentsLabel}>
            {tocSections.map((section) => {
              const isActive = activeId === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  className={cn(styles.toc__item, isActive && styles["toc__item--active"])}
                  onClick={() => handleScrollToSection(section.id)}
                >
                  <span className={styles.toc__icon} aria-hidden="true">
                    <Image
                      src="/images/journal/article-toc-arrow.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </span>
                  <span className={styles.toc__label}>{section.title}</span>
                </button>
              );
            })}
          </aside>
        ) : null}

        <div className={styles.sections}>
          {sections.map((section) => (
            <section
              key={section.id}
              ref={setSectionRef(section.id)}
              data-section-id={section.id}
              className={styles.section}
            >
              {section.nodes.map((node, index) => (
                <RichTextNode key={`${section.id}-${index}`} node={node} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
