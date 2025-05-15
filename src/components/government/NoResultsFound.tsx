
import { Building } from 'lucide-react';

interface NoResultsFoundProps {
  onReset: () => void;
}

const NoResultsFound = ({ onReset }: NoResultsFoundProps) => {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      <Building size={48} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
      <p className="text-gray-500 mb-6">We couldn't find any government services matching your search criteria.</p>
      <button 
        onClick={onReset}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default NoResultsFound;
