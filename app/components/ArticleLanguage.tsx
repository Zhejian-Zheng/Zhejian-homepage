import { getLanguage } from "../site";
export default function ArticleLanguage({ language, children }: { language: "en" | "zh"; children: React.ReactNode }) {
 return getLanguage() === language ? <div className="article-language">{children}</div> : null;
}
