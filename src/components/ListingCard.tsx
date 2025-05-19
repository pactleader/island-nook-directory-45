import { useLoadingScreen } from '@/hooks/useLoadingScreen';
import LoadingScreen from './LoadingScreen';

interface ListingCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'property' | 'vehicle' | 'business' | 'event' | 'hotel';
}

const ListingCard = ({ id, title, description, image, type }: ListingCardProps) => {
  const { isLoading, handleListingClick } = useLoadingScreen();

  const getPath = () => {
    switch (type) {
      case 'property':
        return `/properties/${id}`;
      case 'vehicle':
        return `/vehicles/${id}`;
      case 'business':
        return `/businesses/${id}`;
      case 'event':
        return `/events/${id}`;
      case 'hotel':
        return `/hotels/${id}`;
      default:
        return '/';
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen onContinue={() => {}} />}
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => handleListingClick(getPath())}
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </>
  );
};

export default ListingCard; 