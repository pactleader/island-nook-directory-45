
// Business Listings
export interface BusinessListing {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  address: {
    street: string;
    village: string;
    island: string;
    zipCode: string;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  images: string[];
  rating: number;
  reviews: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Property Listings
export interface PropertyListing {
  id: string;
  title: string;
  propertyType: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  description: string;
  features: string[];
  street: string;
  village: string;
  island: string;
  images: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
  listedDate?: string;
}

// Vehicle Listings
export interface VehicleListing {
  id: string;
  title: string;
  price: number;
  condition: 'new' | 'used';
  year: number;
  make: string;
  model: string;
  bodyStyle: string;
  transmission: string;
  mileage?: number;
  exteriorColor: string;
  interiorColor: string;
  fuelType: string;
  engine: string;
  features: string[];
  description: string;
  sellerType: 'dealer' | 'private';
  sellerName: string;
  sellerLocation: string;
  sellerContact: string;
  images: string[];
  createdAt: string;
}

// Blog Posts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
  publishedAt: string;
}

// Business Categories and Subcategories
export const businessCategories = {
  'yard-services': {
    label: 'Yard Services',
    subcategories: [
      { label: 'Lawn Mowing', value: 'lawn-mowing' },
      { label: 'Landscaping', value: 'landscaping' },
      { label: 'Tree Trimming', value: 'tree-trimming' },
      { label: 'Garden Design', value: 'garden-design' },
      { label: 'Irrigation Systems', value: 'irrigation-systems' },
      { label: 'Weed Control', value: 'weed-control' },
      { label: 'Pest Control', value: 'pest-control' },
      { label: 'Fertilization', value: 'fertilization' },
      { label: 'Mulching', value: 'mulching' },
      { label: 'Hedge Trimming', value: 'hedge-trimming' },
      { label: 'Leaf Removal', value: 'leaf-removal' },
      { label: 'Flower Planting', value: 'flower-planting' },
      { label: 'Soil Testing', value: 'soil-testing' },
      { label: 'Yard Cleanup', value: 'yard-cleanup' },
      { label: 'Sod Installation', value: 'sod-installation' },
      { label: 'Artificial Turf', value: 'artificial-turf' },
      { label: 'Lawn Aeration', value: 'lawn-aeration' },
      { label: 'Hardscaping', value: 'hardscaping' },
      { label: 'Water Features', value: 'water-features' },
      { label: 'Outdoor Lighting', value: 'outdoor-lighting' }
    ]
  },
  'restaurants': {
    label: 'Restaurants',
    subcategories: [
      { label: 'Local Cuisine', value: 'local-cuisine' },
      { label: 'Japanese', value: 'japanese' },
      { label: 'Chinese', value: 'chinese' },
      { label: 'Korean', value: 'korean' },
      { label: 'Filipino', value: 'filipino' },
      { label: 'Thai', value: 'thai' },
      { label: 'Vietnamese', value: 'vietnamese' },
      { label: 'American', value: 'american' },
      { label: 'Italian', value: 'italian' },
      { label: 'Mexican', value: 'mexican' },
      { label: 'Fast Food', value: 'fast-food' },
      { label: 'Seafood', value: 'seafood' },
      { label: 'BBQ', value: 'bbq' },
      { label: 'Cafes', value: 'cafes' },
      { label: 'Bakeries', value: 'bakeries' },
      { label: 'Desserts', value: 'desserts' },
      { label: 'Food Trucks', value: 'food-trucks' },
      { label: 'Buffet', value: 'buffet' },
      { label: 'Vegetarian', value: 'vegetarian' },
      { label: 'Fine Dining', value: 'fine-dining' }
    ]
  },
  'professional-services': {
    label: 'Professional Services',
    subcategories: [
      { label: 'Accounting', value: 'accounting' },
      { label: 'Legal', value: 'legal' },
      { label: 'Insurance', value: 'insurance' },
      { label: 'Real Estate', value: 'real-estate' },
      { label: 'Banking', value: 'banking' },
      { label: 'Financial Planning', value: 'financial-planning' },
      { label: 'Tax Preparation', value: 'tax-preparation' },
      { label: 'Notary', value: 'notary' },
      { label: 'Translation', value: 'translation' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Web Design', value: 'web-design' },
      { label: 'Graphic Design', value: 'graphic-design' },
      { label: 'IT Services', value: 'it-services' },
      { label: 'Consulting', value: 'consulting' },
      { label: 'Business Coaching', value: 'business-coaching' },
      { label: 'Photography', value: 'photography' },
      { label: 'Videography', value: 'videography' },
      { label: 'Event Planning', value: 'event-planning' },
      { label: 'Printing', value: 'printing' },
      { label: 'Advertising', value: 'advertising' }
    ]
  },
  'mechanics-and-cars': {
    label: 'Mechanics & Cars',
    subcategories: [
      { label: 'Auto Repair', value: 'auto-repair' },
      { label: 'Oil Change', value: 'oil-change' },
      { label: 'Tire Services', value: 'tire-services' },
      { label: 'Body Shops', value: 'body-shops' },
      { label: 'Car Detailing', value: 'car-detailing' },
      { label: 'Car Wash', value: 'car-wash' },
      { label: 'Auto Parts', value: 'auto-parts' },
      { label: 'Car Dealerships', value: 'car-dealerships' },
      { label: 'Car Rental', value: 'car-rental' },
      { label: 'Towing', value: 'towing' },
      { label: 'Brake Service', value: 'brake-service' },
      { label: 'Transmission', value: 'transmission' },
      { label: 'Engine Repair', value: 'engine-repair' },
      { label: 'AC Service', value: 'ac-service' },
      { label: 'Emissions Testing', value: 'emissions-testing' },
      { label: 'Windshield Repair', value: 'windshield-repair' },
      { label: 'Motorcycle Repair', value: 'motorcycle-repair' },
      { label: 'Boat Repair', value: 'boat-repair' },
      { label: 'Fleet Services', value: 'fleet-services' },
      { label: 'Electric Vehicle Service', value: 'ev-service' }
    ]
  },
  'home-contractors': {
    label: 'Home Contractors',
    subcategories: [
      { label: 'General Contractors', value: 'general-contractors' },
      { label: 'Plumbers', value: 'plumbers' },
      { label: 'Electricians', value: 'electricians' },
      { label: 'HVAC', value: 'hvac' },
      { label: 'Roofers', value: 'roofers' },
      { label: 'Painters', value: 'painters' },
      { label: 'Carpenters', value: 'carpenters' },
      { label: 'Flooring', value: 'flooring' },
      { label: 'Tile & Countertops', value: 'tile-countertops' },
      { label: 'Concrete', value: 'concrete' },
      { label: 'Fencing', value: 'fencing' },
      { label: 'Drywall', value: 'drywall' },
      { label: 'Home Security', value: 'home-security' },
      { label: 'Windows & Doors', value: 'windows-doors' },
      { label: 'Cleaning Services', value: 'cleaning-services' },
      { label: 'Handyman', value: 'handyman' },
      { label: 'Kitchen Remodel', value: 'kitchen-remodel' },
      { label: 'Bathroom Remodel', value: 'bathroom-remodel' },
      { label: 'Deck & Patio', value: 'deck-patio' },
      { label: 'Home Inspection', value: 'home-inspection' }
    ]
  },
  'grocery-stores': {
    label: 'Grocery Stores',
    subcategories: [
      { label: 'Supermarkets', value: 'supermarkets' },
      { label: 'Convenience Stores', value: 'convenience-stores' },
      { label: 'Farmers Markets', value: 'farmers-markets' },
      { label: 'Organic Foods', value: 'organic-foods' },
      { label: 'Butcher Shops', value: 'butcher-shops' },
      { label: 'Seafood Markets', value: 'seafood-markets' },
      { label: 'Bakeries', value: 'bakeries' },
      { label: 'Specialty Foods', value: 'specialty-foods' },
      { label: 'Asian Markets', value: 'asian-markets' },
      { label: 'Filipino Markets', value: 'filipino-markets' },
      { label: 'Wholesale Foods', value: 'wholesale-foods' },
      { label: 'Health Food Stores', value: 'health-food-stores' },
      { label: 'Liquor Stores', value: 'liquor-stores' },
      { label: 'Produce Stands', value: 'produce-stands' },
      { label: 'Imported Foods', value: 'imported-foods' },
      { label: 'Local Producers', value: 'local-producers' },
      { label: 'Frozen Foods', value: 'frozen-foods' },
      { label: 'Delivery Services', value: 'delivery-services' },
      { label: 'Bulk Foods', value: 'bulk-foods' },
      { label: 'Food Co-ops', value: 'food-co-ops' }
    ]
  },
  'other': {
    label: 'Other Services',
    subcategories: [
      { label: 'Education', value: 'education' },
      { label: 'Healthcare', value: 'healthcare' },
      { label: 'Fitness', value: 'fitness' },
      { label: 'Beauty & Spas', value: 'beauty-spas' },
      { label: 'Pet Services', value: 'pet-services' },
      { label: 'Hotels', value: 'hotels' },
      { label: 'Tour Guides', value: 'tour-guides' },
      { label: 'Rental Properties', value: 'rental-properties' },
      { label: 'Entertainment', value: 'entertainment' },
      { label: 'Shipping', value: 'shipping' },
      { label: 'Childcare', value: 'childcare' },
      { label: 'Religious', value: 'religious' },
      { label: 'Laundry', value: 'laundry' },
      { label: 'Tailoring', value: 'tailoring' },
      { label: 'Electronics Repair', value: 'electronics-repair' },
      { label: 'Funeral Services', value: 'funeral-services' },
      { label: 'Moving Services', value: 'moving-services' },
      { label: 'Storage', value: 'storage' },
      { label: 'Travel Agencies', value: 'travel-agencies' },
      { label: 'Driving Schools', value: 'driving-schools' }
    ]
  }
};

// Mock Business Listings
export const mockBusinesses: BusinessListing[] = [
  {
    id: "b001",
    name: "Pacific Lawn Care",
    category: "yard-services",
    subcategory: "landscaping",
    description: "Professional landscaping and lawn maintenance services for residential and commercial properties. We specialize in tropical garden design and maintenance.",
    address: {
      street: "123 Beach Road",
      village: "Garapan",
      island: "Saipan",
      zipCode: "96950"
    },
    contact: {
      phone: "(670) 234-5678",
      email: "info@pacificlawncare.com",
      website: "www.pacificlawncare.com"
    },
    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed"
    },
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviews: 28,
    featured: true,
    createdAt: "2023-06-12T08:30:00Z",
    updatedAt: "2023-11-05T15:45:00Z"
  },
  {
    id: "b002",
    name: "Island Eats Restaurant",
    category: "restaurants",
    subcategory: "local-cuisine",
    description: "Authentic local cuisine featuring fresh seafood and traditional Chamorro dishes. Our oceanfront dining experience offers spectacular sunset views.",
    address: {
      street: "456 Coral Tree Avenue",
      village: "Susupe",
      island: "Saipan",
      zipCode: "96950"
    },
    contact: {
      phone: "(670) 235-6789",
      email: "reservations@islandeats.com",
      website: "www.islandeats.com"
    },
    hours: {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "11:00 AM - 11:00 PM",
      sunday: "11:00 AM - 9:00 PM"
    },
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=800&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviews: 156,
    featured: true,
    createdAt: "2023-03-20T10:15:00Z",
    updatedAt: "2023-12-10T12:30:00Z"
  },
  {
    id: "b003",
    name: "Mariana Legal Services",
    category: "professional-services",
    subcategory: "legal",
    description: "Comprehensive legal services specializing in business law, real estate transactions, and immigration matters for the CNMI and Guam.",
    address: {
      street: "789 Flame Tree Lane",
      village: "Capitol Hill",
      island: "Saipan",
      zipCode: "96950"
    },
    contact: {
      phone: "(670) 236-7890",
      email: "contact@marianalegal.com",
      website: "www.marianalegal.com"
    },
    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "By Appointment",
      sunday: "Closed"
    },
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviews: 42,
    featured: false,
    createdAt: "2023-04-05T09:00:00Z",
    updatedAt: "2023-10-22T14:15:00Z"
  },
  {
    id: "b004",
    name: "AutoFix Masters",
    category: "mechanics-and-cars",
    subcategory: "auto-repair",
    description: "Full-service auto repair shop with certified mechanics. We handle everything from routine maintenance to complex repairs for all vehicle makes and models.",
    address: {
      street: "101 Industrial Way",
      village: "Lower Base",
      island: "Saipan",
      zipCode: "96950"
    },
    contact: {
      phone: "(670) 237-8901",
      email: "service@autofixmasters.com",
      website: "www.autofixmasters.com"
    },
    hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "8:00 AM - 2:00 PM",
      sunday: "Closed"
    },
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11ff8a2c45c8?w=800&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviews: 89,
    featured: false,
    createdAt: "2023-02-10T11:30:00Z",
    updatedAt: "2023-09-15T16:45:00Z"
  },
  {
    id: "b005",
    name: "Island Home Builders",
    category: "home-contractors",
    subcategory: "general-contractors",
    description: "Custom home building and renovation experts serving the CNMI for over 15 years. We specialize in typhoon-resistant construction and tropical home designs.",
    address: {
      street: "202 Construction Drive",
      village: "San Vicente",
      island: "Saipan",
      zipCode: "96950"
    },
    contact: {
      phone: "(670) 238-9012",
      email: "build@islandhomebuilders.com",
      website: "www.islandhomebuilders.com"
    },
    hours: {
      monday: "7:30 AM - 4:30 PM",
      tuesday: "7:30 AM - 4:30 PM",
      wednesday: "7:30 AM - 4:30 PM",
      thursday: "7:30 AM - 4:30 PM",
      friday: "7:30 AM - 4:30 PM",
      saturday: "By Appointment",
      sunday: "Closed"
    },
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviews: 64,
    featured: true,
    createdAt: "2023-01-15T13:45:00Z",
    updatedAt: "2023-11-20T09:30:00Z"
  },
  {
    id: "b006",
    name: "Joeten Supermarket",
    category: "grocery-stores",
    subcategory: "supermarkets",
    description: "Largest supermarket chain in the CNMI offering a wide selection of local and imported groceries, fresh produce, and household goods at competitive prices.",
    address: {
      street: "303 Shopping Center Road",
      village: "Susupe",
      island: "Saipan",
      zipCode: "96950"
    },
    contact: {
      phone: "(670) 239-0123",
      email: "customer@joetensupermarket.com",
      website: "www.joetensupermarket.com"
    },
    hours: {
      monday: "6:00 AM - 10:00 PM",
      tuesday: "6:00 AM - 10:00 PM",
      wednesday: "6:00 AM - 10:00 PM",
      thursday: "6:00 AM - 10:00 PM",
      friday: "6:00 AM - 10:00 PM",
      saturday: "6:00 AM - 10:00 PM",
      sunday: "6:00 AM - 10:00 PM"
    },
    images: [
      "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop"
    ],
    rating: 4.5,
    reviews: 210,
    featured: false,
    createdAt: "2022-12-01T08:00:00Z",
    updatedAt: "2023-10-05T11:15:00Z"
  },
  {
    id: "b007",
    name: "Marianas Healing Arts",
    category: "other",
    subcategory: "healthcare",
    description: "Holistic wellness center offering massage therapy, acupuncture, and traditional healing practices combined with modern therapeutic techniques.",
    address: {
      street: "404 Wellness Way",
      village: "San Antonio",
      island: "Saipan",
      zipCode: "96950"
    },
    contact: {
      phone: "(670) 240-1234",
      email: "appointments@marianashealingarts.com",
      website: "www.marianashealingarts.com"
    },
    hours: {
      monday: "10:00 AM - 7:00 PM",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 7:00 PM",
      friday: "10:00 AM - 7:00 PM",
      saturday: "10:00 AM - 5:00 PM",
      sunday: "Closed"
    },
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviews: 72,
    featured: true,
    createdAt: "2023-05-20T14:20:00Z",
    updatedAt: "2023-12-15T10:30:00Z"
  },
  {
    id: "b008",
    name: "Tropical Garden Experts",
    category: "yard-services",
    subcategory: "garden-design",
    description: "Specializing in tropical garden design and installation with a focus on native and adaptive plants that thrive in the Marianas climate.",
    address: {
      street: "505 Garden Path",
      village: "Papago",
      island: "Saipan",
      zipCode: "96950"
    },
    contact: {
      phone: "(670) 241-2345",
      email: "design@tropicalgardenexperts.com",
      website: "www.tropicalgardenexperts.com"
    },
    hours: {
      monday: "7:00 AM - 4:00 PM",
      tuesday: "7:00 AM - 4:00 PM",
      wednesday: "7:00 AM - 4:00 PM",
      thursday: "7:00 AM - 4:00 PM",
      friday: "7:00 AM - 4:00 PM",
      saturday: "8:00 AM - 12:00 PM",
      sunday: "Closed"
    },
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviews: 36,
    featured: false,
    createdAt: "2023-07-10T09:45:00Z",
    updatedAt: "2023-11-25T13:20:00Z"
  }
];

// Mock Properties
export const mockProperties: PropertyListing[] = [
  {
    id: "p001",
    title: "Oceanfront Villa with Private Beach Access",
    propertyType: "residential",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    description: "Luxurious oceanfront villa with breathtaking views, private beach access, and a spacious garden. Perfect for family living or vacation rental investment.",
    features: [
      "Oceanfront",
      "Private Beach Access",
      "Swimming Pool",
      "Outdoor Kitchen",
      "Tropical Garden",
      "Covered Patio",
      "Security System",
      "Solar Power"
    ],
    street: "123 Oceanview Drive",
    village: "San Vicente",
    island: "Saipan",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop"
    ],
    featured: true,
    createdAt: "2023-05-12T08:30:00Z",
    updatedAt: "2023-11-05T15:45:00Z",
    listedDate: "2023-05-15T00:00:00Z"
  },
  {
    id: "p002",
    title: "Modern Apartment in Downtown Garapan",
    propertyType: "residential",
    price: 425000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    description: "Contemporary apartment in the heart of Garapan with stunning city and ocean views. Walking distance to shops, restaurants, and entertainment venues.",
    features: [
      "City Views",
      "Ocean Views",
      "Balcony",
      "Central AC",
      "Modern Kitchen",
      "Secure Building",
      "Assigned Parking",
      "Storage Unit"
    ],
    street: "456 Palm Avenue",
    village: "Garapan",
    island: "Saipan",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop"
    ],
    featured: false,
    createdAt: "2023-06-20T10:15:00Z",
    updatedAt: "2023-10-10T12:30:00Z",
    listedDate: "2023-06-25T00:00:00Z"
  },
  {
    id: "p003",
    title: "Commercial Building with Prime Location",
    propertyType: "commercial",
    price: 1850000,
    sqft: 5400,
    description: "Excellent commercial opportunity in a high-traffic area. Currently leased to multiple successful businesses with long-term contracts. Great investment potential.",
    features: [
      "Prime Location",
      "Multiple Units",
      "Ample Parking",
      "Recently Renovated",
      "Long-term Tenants",
      "Strong ROI",
      "Highway Frontage",
      "Signage Potential"
    ],
    street: "789 Business Boulevard",
    village: "Chalan Kanoa",
    island: "Saipan",
    images: [
      "https://images.unsplash.com/photo-1617713964959-d9a36bbc7b52?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577905938905-6a6447c64bd4?w=800&auto=format&fit=crop"
    ],
    featured: true,
    createdAt: "2023-02-05T09:00:00Z",
    updatedAt: "2023-09-22T14:15:00Z",
    listedDate: "2023-02-10T00:00:00Z"
  }
];

// Mock Vehicles (you'll need to add this)
export const mockVehicles: VehicleListing[] = [
  {
    id: "v001",
    title: "2019 Toyota Tacoma TRD Off-Road",
    price: 34995,
    condition: "used",
    year: 2019,
    make: "Toyota",
    model: "Tacoma",
    bodyStyle: "Pickup Truck",
    transmission: "Automatic",
    mileage: 35000,
    exteriorColor: "Magnetic Gray",
    interiorColor: "Black",
    fuelType: "Gasoline",
    engine: "3.5L V6",
    features: [
      "4WD",
      "Navigation System",
      "Bluetooth",
      "Backup Camera",
      "Tow Package",
      "Roof Rack",
      "Bed Liner",
      "Off-Road Package"
    ],
    description: "Well-maintained 2019 Toyota Tacoma TRD Off-Road with low mileage. Perfect for island living and off-road adventures. Includes factory warranty.",
    sellerType: "dealer",
    sellerName: "Island Motors",
    sellerLocation: "Garapan, Saipan",
    sellerContact: "(670) 234-5678",
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop"
    ],
    createdAt: "2023-04-15T10:30:00Z"
  },
  {
    id: "v002",
    title: "2020 Honda CR-V EX-L",
    price: 29500,
    condition: "used",
    year: 2020,
    make: "Honda",
    model: "CR-V",
    bodyStyle: "SUV",
    transmission: "CVT",
    mileage: 22500,
    exteriorColor: "Pearl White",
    interiorColor: "Tan Leather",
    fuelType: "Gasoline",
    engine: "1.5L Turbo",
    features: [
      "AWD",
      "Leather Seats",
      "Sunroof",
      "Apple CarPlay",
      "Android Auto",
      "Lane Keep Assist",
      "Adaptive Cruise Control",
      "Heated Seats"
    ],
    description: "One-owner 2020 Honda CR-V EX-L with low mileage and all maintenance records. Perfect family vehicle with plenty of cargo space and excellent fuel economy.",
    sellerType: "private",
    sellerName: "John Smith",
    sellerLocation: "San Vicente, Saipan",
    sellerContact: "(670) 788-1234",
    images: [
      "https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop"
    ],
    createdAt: "2023-05-20T14:45:00Z"
  },
  {
    id: "v003",
    title: "2023 Hyundai Tucson Limited",
    price: 37995,
    condition: "new",
    year: 2023,
    make: "Hyundai",
    model: "Tucson",
    bodyStyle: "SUV",
    transmission: "Automatic",
    mileage: 15,
    exteriorColor: "Amazon Gray",
    interiorColor: "Black",
    fuelType: "Hybrid",
    engine: "1.6L Turbo Hybrid",
    features: [
      "AWD",
      "Panoramic Sunroof",
      "360-degree Camera",
      "Wireless Charging",
      "Remote Smart Parking Assist",
      "Ventilated Front Seats",
      "Bose Premium Audio",
      "10.25-inch Touchscreen"
    ],
    description: "Brand new 2023 Hyundai Tucson Limited Hybrid with full factory warranty. Cutting-edge technology, excellent fuel efficiency, and spacious interior make this the perfect vehicle for island living.",
    sellerType: "dealer",
    sellerName: "Marianas Auto Group",
    sellerLocation: "Chalan Kanoa, Saipan",
    sellerContact: "(670) 235-6789",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop"
    ],
    createdAt: "2023-06-10T09:15:00Z"
  }
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: "blog001",
    title: "Top 10 Beaches in the Northern Marianas",
    slug: "top-10-beaches-northern-marianas",
    excerpt: "Discover the most beautiful beaches across Saipan, Tinian, and Rota, from popular tourist spots to hidden local gems.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl...",
    author: {
      name: "Maria Santos",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    category: "Travel",
    tags: ["beaches", "tourism", "travel", "Saipan", "Tinian", "Rota"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
    featured: true,
    publishedAt: "2023-04-15T10:00:00Z"
  },
  {
    id: "blog002",
    title: "Living in Saipan: A Local's Guide to Island Life",
    slug: "living-in-saipan-locals-guide",
    excerpt: "Everything you need to know about living in Saipan, from housing and transportation to shopping and entertainment.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl...",
    author: {
      name: "James Fitial",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    category: "Lifestyle",
    tags: ["living", "Saipan", "expats", "housing", "tips"],
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop",
    featured: false,
    publishedAt: "2023-05-22T14:30:00Z"
  },
  {
    id: "blog003",
    title: "Investing in CNMI Real Estate: What You Need to Know",
    slug: "investing-cnmi-real-estate-guide",
    excerpt: "A comprehensive guide to real estate investment opportunities in the Commonwealth of the Northern Mariana Islands.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl...",
    author: {
      name: "David Chen",
      avatar: "https://randomuser.me/api/portraits/men/47.jpg"
    },
    category: "Real Estate",
    tags: ["investment", "real estate", "property", "business", "CNMI"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
    featured: true,
    publishedAt: "2023-06-10T09:15:00Z"
  }
];
