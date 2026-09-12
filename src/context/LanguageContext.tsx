import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent, SPANISH_CONTENT, ENGLISH_CONTENT } from '../../server/translations';

interface LanguageContextType {
  lang: 'es' | 'en';
  language: 'es' | 'en';
  content: SiteContent;
  isLoading: boolean;
  setLanguage: (newLang: 'es' | 'en') => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  language: 'es',
  content: SPANISH_CONTENT,
  isLoading: false,
  setLanguage: async () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [content, setContent] = useState<SiteContent>(SPANISH_CONTENT);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchContentForLanguage = async (targetLang: 'es' | 'en') => {
    setIsLoading(true);
    try {
      // Llamada real al backend Express según el idioma seleccionado por el usuario
      const response = await fetch(`/api/content/${targetLang}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Error al recuperar textos para ${targetLang}`);
      }
      const json = await response.json();
      if (json && json.data) {
        setContent(json.data);
      }
    } catch (err) {
      console.warn('[LanguageContext] Error en llamada API al backend, usando fallback local:', err);
      // Fallback local seguro
      setContent(targetLang === 'en' ? ENGLISH_CONTENT : SPANISH_CONTENT);
    } finally {
      setIsLoading(false);
      setLang(targetLang);
      document.documentElement.lang = targetLang;
    }
  };

  const handleSetLanguage = async (newLang: 'es' | 'en') => {
    if (newLang === lang) return;
    await fetchContentForLanguage(newLang);
  };

  // Sincronizar título de página al cambiar contenido
  useEffect(() => {
    if (content?.meta?.siteTitle) {
      document.title = content.meta.siteTitle;
    }
  }, [content]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        language: lang,
        content,
        isLoading,
        setLanguage: handleSetLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
