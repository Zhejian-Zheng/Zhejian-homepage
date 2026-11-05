"use client";

import { useLanguage, type Language } from "../components/language";

const labels: Record<Language, string> = {
	en: "EN",
	zh: "中文"
};

export default function BlogLanguageSwitch({ label = "Language" }: { label?: string }) {
	const { language, setLanguage } = useLanguage();

	return (
		<div className="lang-switch" aria-label={language === "zh" ? "文章语言" : "Article language"}>
			<span className="lang-switch__label">{label}</span>
			<div className="lang-switch__options">
				{(["en", "zh"] as const).map(option => (
					<button
						key={option}
						type="button"
						onClick={() => setLanguage(option)}
						aria-pressed={language === option}
						className={language === option ? "is-active" : undefined}
					>
						{labels[option]}
					</button>
				))}
			</div>
		</div>
	);
}
