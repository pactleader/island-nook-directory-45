
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

type FavoriteItem = {
  id: string;
  type: 'property' | 'business' | 'vehicle' | 'event' | 'hotel' | 'food';
  title: string;
  image: string;
};

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string, type: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => [...prev, item]);
    toast.success("Added to favorites");
  };

  const removeFavorite = (id: string, type: string) => {
    setFavorites((prev) => prev.filter(item => !(item.id === id && item.type === type)));
    toast.success("Removed from favorites");
  };

  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
