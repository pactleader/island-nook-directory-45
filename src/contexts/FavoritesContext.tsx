
import { createContext, useState, useContext, useEffect } from 'react';

export type FavoriteType = 'property' | 'vehicle' | 'business' | 'event' | 'hotel' | 'food' | 'shopping' | 'product' | 'government';

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
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  
  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
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
