
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  name: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

interface SearchFiltersProps {
  title: string;
  placeholder: string;
  filterGroups: FilterGroup[];
  onSearch: (search: string, filters: Record<string, string | string[]>) => void;
}

const SearchFilters = ({ 
  title, 
  placeholder, 
  filterGroups, 
  onSearch 
}: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string | string[]>>({});
  
  // Handle search button click
  const handleSearchClick = () => {
    onSearch(searchQuery, selectedFilters);
  };
  
  // Handle pressing Enter key in search field
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };
  
  // Handle filter selection
  const handleFilterSelect = (groupName: string, optionValue: string, multiSelect?: boolean) => {
    setSelectedFilters(prev => {
      // For multiselect, we maintain an array of values
      if (multiSelect) {
        const currentValues = Array.isArray(prev[groupName]) ? [...prev[groupName] as string[]] : [];
        
        // Toggle selection: if already selected, remove it; otherwise, add it
        if (currentValues.includes(optionValue)) {
          const newValues = currentValues.filter(val => val !== optionValue);
          return {
            ...prev,
            [groupName]: newValues.length > 0 ? newValues : undefined
          };
        } else {
          return {
            ...prev,
            [groupName]: [...currentValues, optionValue]
          };
        }
      } 
      // For single select, we just store the value (or clear it if clicking the same one)
      else {
        if (prev[groupName] === optionValue) {
          const { [groupName]: _, ...rest } = prev;
          return rest;
        } else {
          return {
            ...prev,
            [groupName]: optionValue
          };
        }
      }
    });
  };
  
  // Check if a filter is selected
  const isFilterSelected = (groupName: string, optionValue: string) => {
    const selectedValue = selectedFilters[groupName];
    
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(optionValue);
    } else {
      return selectedValue === optionValue;
    }
  };
  
  // Count total selected filters
  const countSelectedFilters = () => {
    return Object.values(selectedFilters).reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value.length;
      } else {
        return count + 1;
      }
    }, 0);
  };
  
  return (
    <div className="glass-card rounded-lg overflow-hidden shadow-sm border border-gray-200/50">
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
        
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-field pr-14"
          />
          <button
            onClick={handleSearchClick}
            className="absolute right-1 top-1 p-2 text-gray-600 hover:text-gray-900 rounded-md transition-all-300"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
        
        {/* Filter Toggle */}
        <div className="mt-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all-300"
          >
            <div className="flex items-center">
              <Filter size={16} className="mr-2" />
              <span className="font-medium">Filters</span>
            </div>
            {countSelectedFilters() > 0 && (
              <span className="bg-gray-800 text-white text-xs rounded-full px-2 py-1 ml-2">
                {countSelectedFilters()}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Filter Options Panel */}
      {showFilters && (
        <div className="border-t border-gray-200/50 p-4 max-h-80 overflow-y-auto">
          {filterGroups.map((group, groupIndex) => (
            <div key={groupIndex} className={groupIndex > 0 ? 'mt-4 pt-4 border-t border-gray-200/50' : ''}>
              <h3 className="font-medium text-gray-900 mb-2">{group.name}</h3>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleFilterSelect(group.name, option.value, group.multiSelect)}
                    className={`filter-chip ${isFilterSelected(group.name, option.value) ? 'active' : ''}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
