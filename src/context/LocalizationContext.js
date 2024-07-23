import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "../localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
  const [locale, setLocale] = useState(Localization.getLocales()[0].languageTag);
  const i18n = new I18n(translations);
  i18n.locale = locale;
  i18n.enableFallback = true;
  i18n.defaultLocale = "ar";

  useEffect(() => {
    const fetchLocale = async () => {
      const storedLocale = await AsyncStorage.getItem('selectedLocale');
      if (storedLocale) {
        setLocale(storedLocale);
      }
    };
    fetchLocale();
  }, []);

  const handleLocaleChange = async (newLocale) => {
    await AsyncStorage.setItem('selectedLocale', newLocale);
    setLocale(newLocale);
  };

  return (
    <LocalizationContext.Provider value={{ locale, setLocale: handleLocaleChange, t: i18n.t.bind(i18n) }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  return useContext(LocalizationContext);
};
