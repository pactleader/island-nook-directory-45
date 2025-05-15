
import { Building } from 'lucide-react';
import ServiceCategoryTile from './ServiceCategoryTile';

interface CategoryItem {
  name: string;
  icon: JSX.Element;
}

interface ServiceCategoryGridProps {
  categories: CategoryItem[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ServiceCategoryGrid = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: ServiceCategoryGridProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Browse Services by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        <ServiceCategoryTile
          name="All Services"
          icon={<Building size={32} className="mb-2" />}
          isActive={activeCategory === 'All'}
          onClick={() => onCategoryChange('All')}
        />
        
        {categories.map((category, index) => (
          <ServiceCategoryTile
            key={index}
            name={category.name}
            icon={category.icon}
            isActive={activeCategory === category.name}
            onClick={() => onCategoryChange(category.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCategoryGrid;
