import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { FavoriteButton } from '@/components/FavoriteButton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MapPin, Phone, Globe, Star } from 'lucide-react';

// Mock data for local product listings (same as in LocalProducts.tsx)
const mockLocalProducts = [
  {
    id: "product1",
    name: "Chamorro Coconut Oil",
    description: "Organic coconut oil produced using traditional methods by local farmers. Great for cooking and beauty routines.",
    category: "Beauty & Health",
    subcategory: "Oils",
    priceRange: "$$",
    rating: 4.8,
    imageUrl: "https://exploreguamevents.com/wp-content/uploads/2023/10/coconut-oil-1024x683.jpg",
    producer: "Island Natural Co-op",
    location: {
      village: "Chalan Kanoa"
    },
    contact: {
      phone: "(670) 234-5678"
    }
  },
  {
    id: "product2",
    name: "Marianas Reef Honey",
    description: "Pure, raw honey harvested from hives located in the pristine forests of Saipan and Tinian.",
    category: "Food",
    subcategory: "Honey & Sweeteners",
    priceRange: "$$",
    rating: 4.9,
    imageUrl: "https://lh7-us.googleusercontent.com/docsz/AD_4nXegGI3TiMP1VA7dg9NM9s74UiVjz03ykV6vriPjhueDEFDByeCykWVlt7jQl9_1oXKFwDTTRSONhfuiVYNX6EpBU1I2EaaDIoUuGC2b5NTa4fNYs7o1tTcQ-JDQQyqqAHDAQYmehDfiFW_q4PpjX5_UHQdB?key=sSd4HTTcsx8a0nLkjBPRVA",
    producer: "CNMI Beekeepers Association",
    location: {
      village: "Capitol Hill"
    },
    contact: {
      phone: "(670) 235-6789"
    }
  },
  {
    id: "product3",
    name: "Traditional Chamorro Pottery",
    description: "Handcrafted pottery made using traditional Chamorro techniques and designs passed down through generations.",
    category: "Crafts",
    subcategory: "Pottery",
    priceRange: "$$$",
    rating: 4.7,
    imageUrl: "https://live.staticflickr.com/65535/3973762776_04c309b266.jpg",
    producer: "Heritage Arts Collective",
    location: {
      village: "San Jose"
    },
    contact: {
      phone: "(670) 233-4567"
    }
  },
  {
    id: "product4",
    name: "Marianas Hot Sauce",
    description: "A locally made hot sauce featuring the Donne' Sali (Boonie Pepper), one of the hottest peppers in the world.",
    category: "Food",
    subcategory: "Condiments",
    priceRange: "$$",
    rating: 4.6,
    imageUrl: "https://micronesiaimports.b-cdn.net/wp-content/uploads/2021/08/Chili-Sauce-1024x683.jpg",
    producer: "Island Spice Company",
    location: {
      village: "Garapan"
    },
    contact: {
      phone: "(670) 234-8901"
    }
  },
  {
    id: "product5",
    name: "Handwoven Pandanus Mats",
    description: "Traditional mats handwoven from pandanus leaves, perfect for home decor or beach outings.",
    category: "Home",
    subcategory: "Textiles",
    priceRange: "$$$",
    rating: 4.5,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/12/Banig.JPG",
    producer: "Weaving Traditions Collective",
    location: {
      village: "Oleai"
    },
    contact: {
      phone: "(670) 235-2345"
    }
  },
  {
    id: "product6",
    name: "Marianas Sea Salt",
    description: "Hand-harvested sea salt from the pristine waters surrounding the Marianas Islands.",
    category: "Food",
    subcategory: "Spices & Seasonings",
    priceRange: "$$",
    rating: 4.7,
    imageUrl: "https://m.media-amazon.com/images/I/81u+HYRigGL.jpg",
    producer: "Ocean Harvest",
    location: {
      village: "Marpi"
    },
    contact: {
      phone: "(670) 287-6789"
    }
  }
];

const LocalProductDetails = () => {
  const { id } = useParams();
  const product = mockLocalProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 md:pt-12 pb-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><a href="/local-products" className="hover:text-gray-900">Local Products</a></li>
              <li>/</li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <AspectRatio ratio={4/3}>
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="object-cover w-full h-full rounded-lg"
                />
              </AspectRatio>
              <div className="absolute top-4 right-4">
                <FavoriteButton 
                  id={product.id}
                  type="product"
                  className="bg-white rounded-full p-2 shadow-lg"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-gray-600">{product.category} • {product.subcategory}</span>
                  <span className="text-gray-600">{product.priceRange}</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg">{product.description}</p>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">{product.location.village}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Contact</p>
                      <p className="text-gray-600">{product.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Producer</p>
                      <p className="text-gray-600">{product.producer}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <button className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Contact Producer
                </button>
                <button className="flex-1 border border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Share Product
                </button>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockLocalProducts
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map(relatedProduct => (
                  <div key={relatedProduct.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={relatedProduct.imageUrl} 
                        alt={relatedProduct.name} 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{relatedProduct.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{relatedProduct.producer}</p>
                      <div className="flex items-center mt-2">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocalProductDetails; 