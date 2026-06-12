"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type Language = "en" | "zh";

type LanguageContextValue = {
	language: Language;
	isSwitching: boolean;
	setLanguage: (language: Language) => void;
	toggleLanguage: () => void;
};

const STORAGE_KEY = "zhejian-homepage-language";
const LANGUAGE_FADE_OUT_MS = 360;
const LANGUAGE_SWAP_PAUSE_MS = 40;

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguageState] = useState<Language>("en");
	const [isSwitching, setIsSwitching] = useState(false);
	const fadeOutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const fadeInTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const saved = window.localStorage.getItem(STORAGE_KEY);
		if (saved === "en" || saved === "zh") {
			setLanguageState(saved);
		}
	}, []);

	useEffect(() => {
		document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
		window.localStorage.setItem(STORAGE_KEY, language);
	}, [language]);

	useEffect(() => {
		return () => {
			if (fadeOutTimer.current) {
				clearTimeout(fadeOutTimer.current);
			}
			if (fadeInTimer.current) {
				clearTimeout(fadeInTimer.current);
			}
		};
	}, []);

	const setLanguage = useCallback(
		(nextLanguage: Language) => {
			if (nextLanguage === language || isSwitching) {
				return;
			}

			setIsSwitching(true);
			fadeOutTimer.current = setTimeout(() => {
				setLanguageState(nextLanguage);
				fadeInTimer.current = setTimeout(() => {
					setIsSwitching(false);
				}, LANGUAGE_SWAP_PAUSE_MS);
			}, LANGUAGE_FADE_OUT_MS);
		},
		[isSwitching, language]
	);

	const toggleLanguage = useCallback(() => {
		setLanguage(language === "en" ? "zh" : "en");
	}, [language, setLanguage]);

	const value = useMemo<LanguageContextValue>(
		() => ({
			language,
			isSwitching,
			setLanguage,
			toggleLanguage
		}),
		[isSwitching, language, setLanguage, toggleLanguage]
	);

	return (
		<LanguageContext.Provider value={value}>
			<div className="language-transition-root" data-language-switching={isSwitching ? "true" : "false"}>
				{children}
			</div>
		</LanguageContext.Provider>
	);
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
			className="inline-flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/10 px-3 text-sm font-semibold text-white shadow-lg shadow-primary/10 transition hover:border-primary/50 hover:bg-primary/25"
			aria-label={`Switch language to ${nextLanguage}`}
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
