
import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface FavoriteButtonProps {
  id: string;
  type: 'property' | 'vehicle' | 'business' | 'event' | 'food';
  className?: string;
  size?: number;
  showToast?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const FavoriteButton = ({ 
  id, 
  type, 
  className = '',
  size = 20,
  showToast = true,
  onClick
}: FavoriteButtonProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const favorite = isFavorite(id);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleFavorite(id, type);
    setIsAnimating(true);
    
    if (showToast) {
      toast({
        title: favorite ? "Removed from favorites" : "Added to favorites",
        description: favorite 
          ? `This ${type} has been removed from your favorites` 
          : `This ${type} has been added to your favorites`,
        duration: 2000,
      });
    }
    
    if (onClick) onClick(e);
  };
  
  return (
    <button
      onClick={handleClick}
      className={cn(
        "transition-all duration-300 flex items-center justify-center",
        className,
        isAnimating && "animate-pulse"
      )}
      onAnimationEnd={() => setIsAnimating(false)}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart 
        size={size} 
        className={cn(
          "transition-colors duration-300",
          favorite ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-500"
        )} 
      />
    </button>
  );
};

export default FavoriteButton;
