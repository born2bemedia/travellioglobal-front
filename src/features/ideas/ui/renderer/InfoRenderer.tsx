import type { Children } from "../../model/types";
import { IdeaContent } from "../content/IdeaContent";

export const InfoRenderer = ({ content }: { content: Children[] }) => (
  <>
    {!Array.isArray(content) ? null : (
      <>
        {content.map((node, i) => (
          <IdeaContent
            key={String(`node-${i}`)}
            node={node}
            type={node.type}
          />
        ))}
      </>
    )}
  </>
);
