import { useState, useEffect } from 'react';

export interface UserPreferences {
  language: string;
  island: string;
  visitorType: string;
}

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    language: 'English',
    island: 'All Islands',
    visitorType: 'Visitor'
  });

  // Load preferences from cookies
  const loadPreferences = () => {
    const savedPreferences = {
      language: getCookie('userLanguage') || 'English',
      island: getCookie('userIsland') || 'All Islands',
      visitorType: getCookie('userVisitorType') || 'Visitor'
    };
    setPreferences(savedPreferences);
    return savedPreferences;
  };

  // Save preferences to cookies
  const savePreferences = (newPreferences: UserPreferences) => {
    setCookie('userLanguage', newPreferences.language, 365);
    setCookie('userIsland', newPreferences.island, 365);
    setCookie('userVisitorType', newPreferences.visitorType, 365);
    setPreferences(newPreferences);
  };

  // Update a single preference
  const updatePreference = (type: keyof UserPreferences, value: string) => {
    const newPreferences = { ...preferences, [type]: value };
    savePreferences(newPreferences);
  };

  // Load preferences on mount
  useEffect(() => {
    loadPreferences();
  }, []);

  return {
    preferences,
    loadPreferences,
    savePreferences,
    updatePreference
  };
};

// Cookie utility functions
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
