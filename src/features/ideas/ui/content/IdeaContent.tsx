'use client';

import { memo } from 'react';

import { cn } from '@/shared/lib/helpers/styles';

import type { Children, Children2 } from '../../model/types';
import st from './IdeaContent.module.scss';

export const IdeaContent = memo(({ node, type }: { node: Children; type: string }) => {
  if (type === 'heading') {
    return (
      <h2 key={`${node.type}-${type}`} className={cn(node.tag === 'h2' ? st.heading : st.heading2)}>
        {node.children?.map((item) => {
          return <span key={item.text}>{item.text}</span>;
        })}
      </h2>
    );
  }

  if (type === 'paragraph') {
    return (
      <div key={`${node.type}-${type}`}>
        <p className={st.text}>
          {node.children?.map((item, i) => {
            if (item.type === 'linebreak') {
              return <br key={`br-${i}`} />;
            }

            if (item.type === 'link') {
              return (
                <a
                  key={`link-${i}`}
                  href={item.fields?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={st.link}
                >
                  {item.children?.map((child, j) => (
                    <span key={`link-text-${j}`}>{child.text}</span>
                  ))}
                </a>
              );
            }

            return (
              <span key={`text-${i}`} className={cn(item.format === 1 && st.bold)}>
                {item.text}
              </span>
            );
          })}
        </p>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <ul
        key={`${node.type}-${type}`}
        className={cn(st.list, node.listType === 'bullet' ? st.listDisc : st.listDecimal)}
      >
        {node.children?.map((item, i) => {
          const hasNestedList = item.children?.some((child) => child.type === 'list');
          return (
            <li key={`li-${i}`} className={cn(hasNestedList && st.liWithNested)}>
              <ListItem value={item.children} />
            </li>
          );
        })}
      </ul>
    );
  }

  return null;
});

IdeaContent.displayName = 'IdeaContent';

const ListItem = ({ value }: { value?: Children2[] }) => {
  if (!value) return null;

  return value.map((item, i) => {
    if (item.type === 'list') {
      const listNode = item as unknown as Children;
      return (
        <ul
          key={`nested-list-${i}`}
          className={cn(st.list, listNode.listType === 'bullet' ? st.listCircle : st.listDecimal)}
        >
          {listNode.children?.map((subItem, j) => (
            <li key={`nested-li-${j}`}>
              <ListItem value={subItem.children} />
            </li>
          ))}
        </ul>
      );
    }

    if (item.type === 'link' || item.type === 'autolink') {
      return (
        <a key={`link-${i}`} href={item.fields?.url} target="_blank" rel="noopener noreferrer">
          {item.children?.map((child, j) => (
            <span key={`link-text-${j}`} className={st.listUrl}>
              {child.text}
            </span>
          ))}
        </a>
      );
    }

    if (item.type === 'linebreak') {
      return <br key={`br-${i}`} />;
    }

    return (
      <span key={`list-text-${i}`} className={cn(st.listItem, item.format === 1 && st.bold)}>
        {item.text}
      </span>
    );
  });
};
