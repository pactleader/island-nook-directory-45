
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

interface FavoriteButtonProps {
  id: string;
  type: 'property' | 'business' | 'vehicle' | 'event' | 'hotel' | 'food';
  title: string;
  image: string;
  className?: string;
}

const FavoriteButton = ({ id, type, title, image, className = "" }: FavoriteButtonProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFav = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFav) {
      removeFavorite(id, type);
    } else {
      addFavorite({ id, type, title, image });
    }
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className={`flex items-center justify-center rounded-full p-2 transition-all duration-300 ${
        isFav 
          ? 'bg-red-50 text-red-500 hover:bg-red-100' 
          : 'bg-white/80 text-gray-500 hover:text-red-500 hover:bg-white'
      } ${className}`}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart size={18} className={isFav ? "fill-current" : ""} />
    </button>
  );
};

export default FavoriteButton;
