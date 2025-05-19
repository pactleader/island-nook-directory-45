
import { useMediaQuery } from "@/hooks/useMediaQuery";

const AdBanner = () => {
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)");
  
  if (!isMobileOrTablet) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[60px] bg-gray-100 border-t border-gray-200 z-40 flex items-center justify-center">
      <div className="text-sm text-gray-500 flex items-center">
        <span className="mr-2">Advertise with us</span>
        <a href="/advertise" className="text-blue-600 underline text-xs">
          Learn more
        </a>
      </div>
    </div>
  );
};

export default AdBanner;
