
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ServiceCategoryTileProps {
  name: string;
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const ServiceCategoryTile = ({ name, icon, isActive, onClick }: ServiceCategoryTileProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "category-tile flex flex-col items-center justify-center p-4 rounded-lg transition-all cursor-pointer h-28",
        isActive 
          ? 'bg-blue-600 text-white shadow-md transform scale-105' 
          : 'bg-blue-100 text-gray-800 hover:bg-blue-200'
      )}
    >
      <div className="mb-2 text-2xl">{icon}</div>
      <span className="text-center font-medium text-sm">{name}</span>
    </div>
  );
};

export default ServiceCategoryTile;
