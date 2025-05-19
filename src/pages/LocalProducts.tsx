import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { FavoriteButton } from '@/components/FavoriteButton';
import { Link } from 'react-router-dom';

// Mock data for local product listings
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

// Filter groups for search functionality
const filterGroups = [
  {
    name: "Category",
    options: [
      { label: "Food", value: "food" },
      { label: "Crafts", value: "crafts" },
      { label: "Beauty & Health", value: "beauty" },
      { label: "Home", value: "home" },
      { label: "Clothing", value: "clothing" }
    ]
  },
  {
    name: "Price Range",
    options: [
      { label: "$", value: "$" },
      { label: "$$", value: "$$" },
      { label: "$$$", value: "$$$" },
      { label: "$$$$", value: "$$$$" }
    ]
  },
  {
    name: "Rating",
    options: [
      { label: "4+ Stars", value: "4+" },
      { label: "3+ Stars", value: "3+" }
    ]
  }
];

const ProductCard = ({ product }: { product: any }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md relative">
    <div className="relative w-full">
      <AspectRatio ratio={16/9}>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="object-cover w-full h-full"
        />
      </AspectRatio>
      <div className="absolute top-3 right-3">
        <FavoriteButton 
          id={product.id}
          type="product"
          className="bg-white rounded-full p-1.5 shadow"
        />
      </div>
    </div>
    <Link to={`/local-products/${product.id}`} className="block p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
          <span className="text-yellow-500 mr-1">★</span>
          <span>{product.rating}</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm mt-1">{product.category} • {product.subcategory}</p>
      <p className="text-gray-600 text-sm mt-1">{product.producer} • {product.location.village} • {product.priceRange}</p>
      <p className="text-gray-700 mt-2 text-sm line-clamp-2">{product.description}</p>
    </Link>
  </div>
);

const LocalProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handlers for search and filtering (to be expanded)
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    console.log("Search term:", value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Local Products</h1>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search local products..."
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {filterGroups.map((group) => (
                <div key={group.name} className="flex items-center">
                  <span className="text-sm font-medium mr-2">{group.name}:</span>
                  <div className="flex flex-wrap gap-1">
                    {group.options.map((option) => (
                      <button
                        key={option.value}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockLocalProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export { LocalProducts as default };
