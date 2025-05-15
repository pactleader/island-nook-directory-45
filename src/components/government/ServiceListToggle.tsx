
interface ServiceListToggleProps {
  activeView: 'grid' | 'list';
  setActiveView: (view: 'grid' | 'list') => void;
  resultsCount: number;
}

const ServiceListToggle = ({ activeView, setActiveView, resultsCount }: ServiceListToggleProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <p className="text-gray-600">
        <span className="font-semibold">{resultsCount}</span> services found
      </p>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => setActiveView('grid')}
          className={`p-2 rounded ${activeView === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          aria-label="Grid view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        </button>
        <button 
          onClick={() => setActiveView('list')}
          className={`p-2 rounded ${activeView === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          aria-label="List view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        </button>
      </div>
    </div>
  );
};

export default ServiceListToggle;
