
import GovernmentServiceCard from './GovernmentServiceCard';
import GovernmentServiceList from './GovernmentServiceList';
import FeaturedServices from './FeaturedServices';
import NoResultsFound from './NoResultsFound';
import ServiceListToggle from './ServiceListToggle';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  address: string;
  hours: string;
  phone: string;
  website: string;
  category: string;
  featured: boolean;
}

interface ServiceResultsSectionProps {
  services: Service[];
  allServices: Service[];
  activeCategory: string;
  activeView: 'grid' | 'list';
  setActiveView: (view: 'grid' | 'list') => void;
  resetFilters: () => void;
}

const ServiceResultsSection = ({
  services,
  allServices,
  activeCategory,
  activeView,
  setActiveView,
  resetFilters
}: ServiceResultsSectionProps) => {
  const showFeaturedSection = activeCategory === 'All' && services.length === allServices.length;
  
  return (
    <div className="lg:col-span-3">
      <ServiceListToggle 
        activeView={activeView}
        setActiveView={setActiveView}
        resultsCount={services.length}
      />
      
      {/* Featured Services Section (only show when no filters are applied) */}
      {showFeaturedSection && <FeaturedServices services={services} />}
      
      {/* Services Listing Grid/List View */}
      {services.length > 0 ? (
        <div className={activeView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
          {services.map(service => (
            activeView === 'grid' ? (
              <GovernmentServiceCard key={service.id} service={service} />
            ) : (
              <GovernmentServiceList key={service.id} service={service} />
            )
          ))}
        </div>
      ) : (
        <NoResultsFound onReset={resetFilters} />
      )}
    </div>
  );
};

export default ServiceResultsSection;
