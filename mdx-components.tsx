import type { MDXComponents } from "mdx/types";
import { headingId } from "./app/blog/headings";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h2: ({ children }) => { const id = headingId(children); return <h2 id={id}><a className="heading-anchor" href={`#${id}`}>{children}</a></h2>; },
		h3: ({ children }) => { const id = headingId(children); return <h3 id={id}><a className="heading-anchor" href={`#${id}`}>{children}</a></h3>; },
		...components
	};
}
