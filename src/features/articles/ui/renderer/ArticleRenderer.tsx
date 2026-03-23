import type { Children } from "../../model/types";
import { ArticleContent } from "../content/ArticleContent";

export const ArticleRenderer = ({ content }: { content: Children[] }) => (
  <>
    {!Array.isArray(content) ? null : (
      <>
        {content.map((node, i) => (
          <ArticleContent
            key={String(`node-${i}`)}
            node={node}
            type={node.type}
          />
        ))}
      </>
    )}
  </>
);
