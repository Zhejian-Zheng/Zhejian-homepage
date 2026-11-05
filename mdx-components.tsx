import type { MDXComponents } from "mdx/types";
import { Children, isValidElement, type ReactNode } from "react";
function plainText(children: ReactNode): string {
 return Children.toArray(children).map(child => isValidElement<{ children?: ReactNode }>(child) ? plainText(child.props.children) : typeof child === "string" || typeof child === "number" ? String(child) : "").join("");
}
function headingId(children: ReactNode) { return plainText(children).toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-"); }
export function useMDXComponents(components: MDXComponents): MDXComponents {
 return {
  h2: ({ children }) => { const id = headingId(children); return <h2 id={id}><a className="heading-anchor" href={`#${id}`}>{children}</a></h2>; },
  h3: ({ children }) => { const id = headingId(children); return <h3 id={id}><a className="heading-anchor" href={`#${id}`}>{children}</a></h3>; },
  ...components
 };
}
