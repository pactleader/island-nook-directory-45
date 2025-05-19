import { createContext, useState, useContext, useEffect } from 'react';

export type FavoriteType = 'property' | 'vehicle' | 'business' | 'event' | 'hotel' | 'food' | 'shopping' | 'product' | 'government' | 'adventure' | 'buy-and-sell' | 'blog';

export type FavoriteItem = {
  id: string;
  type: FavoriteType;
  dateAdded: string;
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  addFavorite: (id: string, type: FavoriteType) => void;
  removeFavorite: (id: string, type: FavoriteType) => void;
  isFavorite: (id: string, type: FavoriteType) => boolean;
};

const FAVORITES_STORAGE_KEY = 'island-nook-favorites';

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false
});

export const useFavorites = () => useContext(FavoritesContext);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    // Initialize state from localStorage
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  });
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);
  
  const addFavorite = (id: string, type: FavoriteType) => {
    setFavorites(prev => {
      if (!prev.some(fav => fav.id === id && fav.type === type)) {
        return [...prev, { id, type, dateAdded: new Date().toISOString() }];
      }
      return prev;
    });
  };
  
  const removeFavorite = (id: string, type: FavoriteType) => {
    setFavorites(prev => prev.filter(fav => !(fav.id === id && fav.type === type)));
  };
  
  const isFavorite = (id: string, type: FavoriteType) => {
    return favorites.some(fav => fav.id === id && fav.type === type);
  };
  
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
