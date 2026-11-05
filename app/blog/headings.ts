import { Children, isValidElement, type ReactNode } from "react";

export function plainText(children: ReactNode): string {
	return Children.toArray(children).map(child => isValidElement<{ children?: ReactNode }>(child) ? plainText(child.props.children) : typeof child === "string" || typeof child === "number" ? String(child) : "").join("");
}

export function headingIdFromText(text: string): string {
	return text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");
}

export function headingId(children: ReactNode): string {
	return headingIdFromText(plainText(children));
}
