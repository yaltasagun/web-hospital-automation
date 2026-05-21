import { createContext, useContext, useState } from 'react';
import en from './en';
import tr from './tr';


const TRANSLATIONS = { en, tr };

const LangContext = createContext(null);


export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang];

  return (
    <LangContext.Provider value={{ t, lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
