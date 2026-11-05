"use client";
import { createContext, useContext } from "react";
export type Language = "en" | "zh";
type LanguageContextValue = { language: Language; isSwitching: boolean; setLanguage: (language: Language) => void; toggleLanguage: () => void };
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
export function LanguageProvider({ children, initialLanguage }: { children: React.ReactNode; initialLanguage: Language }) {
 const setLanguage = (language: Language) => {
  const url = new URL(window.location.href); url.searchParams.set("lang", language);
  window.location.assign(url.href);
 };
 return <LanguageContext.Provider value={{ language: initialLanguage, isSwitching: false, setLanguage, toggleLanguage: () => setLanguage(initialLanguage === "en" ? "zh" : "en") }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within LanguageProvider");
	}
	return context;
}

export function LanguageToggle() {
	const { language, isSwitching, toggleLanguage } = useLanguage();
	const nextLanguage = language === "en" ? "中文" : "English";

	return (
		<button
			type="button"
			onClick={toggleLanguage}
			disabled={isSwitching}
			className="inline-flex h-10 items-center justify-center rounded-md border border-white/15 bg-white/10 px-3 text-sm font-semibold text-field-paper transition hover:border-primary/50 hover:bg-primary/25"
			aria-label={language === "zh" ? "切换到英文" : `Switch language to ${nextLanguage}`}
			title={`Switch language to ${nextLanguage}`}
		>
			<span className="hidden sm:inline">{language === "en" ? "中文" : "EN"}</span>
			<span className="sm:hidden">{language === "en" ? "中" : "EN"}</span>
		</button>
	);
}

export function LocalizedText({ en, zh }: { en: string; zh: string }) {
	const { language } = useLanguage();
	return <>{language === "zh" ? zh : en}</>;
}

export function EnglishOnly({ children }: { children: React.ReactNode }) {
	const { language } = useLanguage();
	return language === "en" ? <>{children}</> : null;
}

export function ChineseOnly({ children }: { children: React.ReactNode }) {
	const { language } = useLanguage();
	return language === "zh" ? <>{children}</> : null;
}
