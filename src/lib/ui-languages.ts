// Языки интерфейса, которые можно выбрать сразу (переключатель в шапке,
// LanguageSwitcher): если перевода ещё нет — его делает ИИ сайта
// (lib/ui-locale-ai.ts). Названия — на самих этих языках (Intl.DisplayNames).
// Клиент-безопасный файл.
export const UI_LANGUAGES = [
  "en", "ru", "uk", "be", "kk", "uz", "ky", "tg", "az", "hy", "ka", "ro", "pl", "cs", "sk", "hu", "bg", "sr", "hr", "sl", "lt", "lv", "et", "fi", "sv", "no", "da", "is",
  "de", "nl", "fr", "es", "pt", "it", "el", "tr", "he", "ar", "fa", "ur", "hi", "bn", "ta", "zh", "ja", "ko", "vi", "th", "id", "ms", "tl", "sw", "am",
  // Варианты языка по странам — со своим флагом.
  "en-gb", "en-us", "pt-br", "es-mx", "fr-ca", "zh-tw",
] as const;

export function isKnownUiLanguage(code: string): boolean {
  return (UI_LANGUAGES as readonly string[]).includes(code) || /^[a-z]{2,3}(-[a-z0-9]{2,8})?$/i.test(code);
}

// Свои названия — не во всех браузерах есть данные Intl для всех языков.
const NATIVE: Record<string, string> = {
  en: "English", ru: "Русский", uk: "Українська", be: "Беларуская", kk: "Қазақ тілі", uz: "Oʻzbek", ky: "Кыргызча", tg: "Тоҷикӣ", az: "Azərbaycan", hy: "Հայերեն", ka: "ქართული",
  "en-gb": "English (UK)", "en-us": "English (US)", "pt-br": "Português (Brasil)", "es-mx": "Español (México)", "fr-ca": "Français (Canada)", "zh-tw": "中文（台灣）",
  ro: "Română", pl: "Polski", cs: "Čeština", sk: "Slovenčina", hu: "Magyar", bg: "Български", sr: "Српски", hr: "Hrvatski", sl: "Slovenščina", lt: "Lietuvių", lv: "Latviešu", et: "Eesti",
  fi: "Suomi", sv: "Svenska", no: "Norsk", da: "Dansk", is: "Íslenska", de: "Deutsch", nl: "Nederlands", fr: "Français", es: "Español", pt: "Português", it: "Italiano", el: "Ελληνικά",
  tr: "Türkçe", he: "עברית", ar: "العربية", fa: "فارسی", ur: "اردو", hi: "हिन्दी", bn: "বাংলা", ta: "தமிழ்", zh: "中文", ja: "日本語", ko: "한국어", vi: "Tiếng Việt", th: "ไทย",
  id: "Bahasa Indonesia", ms: "Bahasa Melayu", tl: "Tagalog", sw: "Kiswahili", am: "አማርኛ",
};

export function nativeLanguageName(code: string): string {
  if (NATIVE[code]) return NATIVE[code];
  try {
    const name = new Intl.DisplayNames([code], { type: "language" }).of(code);
    return name ? name.charAt(0).toLocaleUpperCase(code) + name.slice(1) : code;
  } catch {
    return code;
  }
}

// Флаг страны, где язык главный (у языка нет своего флага — берём самую
// узнаваемую страну). С регионом («en-gb», «pt-br») — флаг этой страны.
// Английский без страны — язык всех, у него 🌐; неизвестный — тоже 🌐.
const FLAG_COUNTRY: Record<string, string> = {
  ru: "ru", uk: "ua", be: "by", kk: "kz", uz: "uz", ky: "kg", tg: "tj", az: "az", hy: "am", ka: "ge", ro: "ro", pl: "pl", cs: "cz", sk: "sk", hu: "hu", bg: "bg",
  sr: "rs", hr: "hr", sl: "si", lt: "lt", lv: "lv", et: "ee", fi: "fi", sv: "se", no: "no", da: "dk", is: "is", de: "de", nl: "nl", fr: "fr", es: "es", pt: "pt", it: "it",
  el: "gr", tr: "tr", he: "il", ar: "sa", fa: "ir", ur: "pk", hi: "in", bn: "bd", ta: "lk", zh: "cn", ja: "jp", ko: "kr", vi: "vn", th: "th", id: "id", ms: "my", tl: "ph",
  sw: "tz", am: "et",
};

export function languageFlag(code: string): string {
  const [base, region] = code.toLowerCase().split("-");
  const country = region && /^[a-z]{2}$/.test(region) ? region : FLAG_COUNTRY[base];
  if (!country) return "🌐";
  return String.fromCodePoint(...[...country.toUpperCase()].map((letter) => 0x1f1e6 + letter.charCodeAt(0) - 65));
}
