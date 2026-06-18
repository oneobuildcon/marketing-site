"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "mr";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("oneo_lang") as Lang | null;
      if (stored === "en" || stored === "mr") {
        setLangState(stored);
      }
    } catch {}
  }, []);

  function setLang(newLang: Lang) {
    setLangState(newLang);
    try {
      localStorage.setItem("oneo_lang", newLang);
    } catch {}
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
