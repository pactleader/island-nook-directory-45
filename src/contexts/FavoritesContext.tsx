
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for different listing categories that can be favorited
type FavoriteItem = {
  id: string;
  type: 'property' | 'vehicle' | 'business' | 'event';
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  toggleFavorite: (id: string, type: FavoriteItem['type']) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  // Initialize favorites from localStorage if available
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle an item in favorites
  const toggleFavorite = (id: string, type: FavoriteItem['type']) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(item => item.id === id);
      
      if (isAlreadyFavorite) {
        return prevFavorites.filter(item => item.id !== id);
      } else {
        return [...prevFavorites, { id, type }];
      }
    });
  };

  // Check if an item is favorited
  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook to use the favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
