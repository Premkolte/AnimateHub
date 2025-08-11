import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import enTranslation from "./en";

import enTranslation from "./en/translation.json"
import hiTranslation from "./hi/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation },
    },
    lng: "en",  // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
