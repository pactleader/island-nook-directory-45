
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites, FavoriteType } from '@/contexts/FavoritesContext';

type FavoriteButtonProps = {
  id: string;
  type: FavoriteType;
  className?: string;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id, type, className = '' }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);
  
  const isCurrentlyFavorite = isFavorite(id, type);
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    
    setTimeout(() => {
      if (isCurrentlyFavorite) {
        removeFavorite(id, type);
      } else {
        addFavorite(id, type);
      }
      setIsLoading(false);
    }, 300);
  };
  
  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      aria-label={isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`${className} transition-all duration-300 flex items-center justify-center`}
    >
      <Heart
        size={20}
        className={`${isCurrentlyFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors duration-300`}
      />
    </button>
  );
};
