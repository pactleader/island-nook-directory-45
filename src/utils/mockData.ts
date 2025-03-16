
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
    updatedAt: "2023-11-05T15:45:00Z"
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
    updatedAt: "2023-10-10T12:30:00Z"
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
    updatedAt: "2023-09-22T14:15:00Z"
  },
  {
    id: "p004",
    title: "Island View Hotel for Sale",
    propertyType: "hotel",
    price: 7500000,
    bedrooms: 32,
    bathrooms: 35,
    sqft: 28000,
    description: "Established hotel with 32 rooms, restaurant, pool, and stunning ocean views. Strong tourist clientele and excellent reputation. Turnkey operation with trained staff.",
    features: [
      "32 Guest Rooms",
      "Restaurant & Bar",
      "Swimming Pool",
      "Conference Room",
      "Beach Access",
      "Established Business",
      "Staff Accommodations",
      "Backup Generator"
    ],
    street: "101 Beach Road",
    village: "Susupe",
    island: "Saipan",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop"
    ],
    featured: false,
    createdAt: "2023-01-10T11:30:00Z",
    updatedAt: "2023-08-15T16:45:00Z"
  },
  {
    id: "p005",
    title: "Development Land with Ocean Views",
    propertyType: "land",
    price: 950000,
    sqft: 87120, // 2 acres
    description: "Prime development land with spectacular ocean views. Ideal for residential subdivision or resort development. All utilities available at the property line.",
    features: [
      "Ocean Views",
      "2 Acres",
      "Utilities Available",
      "Road Access",
      "Cleared Land",
      "Development Potential",
      "Near Attractions",
      "Zoned for Mixed-Use"
    ],
    street: "Marine Drive",
    village: "Marpi",
    island: "Saipan",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485996774424-5ce44db3837c?w=800&auto=format&fit=crop"
    ],
    featured: true,
    createdAt: "2023-03-15T13:45:00Z",
    updatedAt: "2023-07-20T09:30:00Z"
  },
  {
    id: "p006",
    title: "Qualifying Certificate Eligible Property",
    propertyType: "economic-incentive",
    price: 3200000,
    sqft: 130680, // 3 acres
    description: "Strategic investment opportunity eligible for CNMI Qualifying Certificate program with tax benefits. Ideal for major development projects with government incentives.",
    features: [
      "Qualifying Certificate Eligible",
      "Tax Incentives",
      "3 Acres",
      "Utilities Ready",
      "Development Ready",
      "Master Plan Approved",
      "Environmental Study Complete",
      "Government Support"
    ],
    street: "202 Investment Way",
    village: "Lower Base",
    island: "Saipan",
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=800&auto=format&fit=crop"
    ],
    featured: false,
    createdAt: "2022-12-01T08:00:00Z",
    updatedAt: "2023-06-05T11:15:00Z"
  }
];

// Mock Vehicles
export const mockVehicles: VehicleListing[] = [
  {
    id: 'v-001',
    title: '2020 Toyota RAV4 XLE Premium AWD',
    price: 28995,
    condition: 'used',
    year: 2020,
    make: 'Toyota',
    model: 'RAV4',
    bodyStyle: 'SUV',
    transmission: 'Automatic',
    mileage: 35420,
    exteriorColor: 'Silver Sky Metallic',
    interiorColor: 'Black',
    fuelType: 'Gasoline',
    engine: '2.5L I4',
    features: [
      'Backup Camera',
      'Bluetooth',
      'Sunroof',
      'AWD',
      'Apple CarPlay',
      'Android Auto',
      'Keyless Entry',
      'Lane Departure Warning'
    ],
    description: 'This 2020 Toyota RAV4 XLE Premium features a clean Carfax, AWD, and is loaded with features including a sunroof, power liftgate, and Toyota Safety Sense.',
    sellerType: 'dealer',
    sellerName: 'Toyota of Saipan',
    sellerLocation: 'Garapan, Saipan',
    sellerContact: '(670) 234-5678',
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563720223185-11ff8a2c45c8?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=800&auto=format&fit=crop'
    ],
    createdAt: '2023-10-12T10:30:00Z'
  },
  {
    id: 'v-002',
    title: '2021 Honda Civic EX Sedan',
    price: 23450,
    condition: 'used',
    year: 2021,
    make: 'Honda',
    model: 'Civic',
    bodyStyle: 'Sedan',
    transmission: 'CVT',
    mileage: 18250,
    exteriorColor: 'Modern Steel Metallic',
    interiorColor: 'Gray',
    fuelType: 'Gasoline',
    engine: '1.5L Turbo I4',
    features: [
      'Backup Camera',
      'Bluetooth',
      'Honda Sensing',
      'Apple CarPlay',
      'Android Auto',
      'Heated Seats',
      'Keyless Entry'
    ],
    description: 'Low mileage 2021 Honda Civic EX with advanced safety features, excellent fuel economy, and a smooth ride. Perfect for island driving with great reliability.',
    sellerType: 'dealer',
    sellerName: 'Joeten Motors',
    sellerLocation: 'Susupe, Saipan',
    sellerContact: '(670) 234-4321',
    images: [
      'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop'
    ],
    createdAt: '2023-11-05T14:15:00Z'
  },
  {
    id: 'v-003',
    title: '2022 Ford Bronco Sport Big Bend',
    price: 33995,
    condition: 'used',
    year: 2022,
    make: 'Ford',
    model: 'Bronco Sport',
    bodyStyle: 'SUV',
    transmission: 'Automatic',
    mileage: 12560,
    exteriorColor: 'Area 51 Blue',
    interiorColor: 'Ebony Black',
    fuelType: 'Gasoline',
    engine: '1.5L EcoBoost',
    features: [
      '4WD',
      'Backup Camera',
      'Bluetooth',
      'Ford Co-Pilot360',
      'Apple CarPlay',
      'Android Auto',
      'Terrain Management System'
    ],
    description: 'Barely used 2022 Ford Bronco Sport Big Bend. Perfect for exploring the islands with its 4WD capability and rugged styling. Loaded with tech features and still under warranty.',
    sellerType: 'private',
    sellerName: 'Michael Chen',
    sellerLocation: 'San Jose, Tinian',
    sellerContact: '(670) 788-1234',
    images: [
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593055357429-62b6bbdad91f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546027032-5f49113406d5?w=800&auto=format&fit=crop'
    ],
    createdAt: '2023-12-02T09:45:00Z'
  },
  {
    id: 'v-004',
    title: '2023 Kia Telluride SX Prestige',
    price: 47990,
    condition: 'new',
    year: 2023,
    make: 'Kia',
    model: 'Telluride',
    bodyStyle: 'SUV',
    transmission: 'Automatic',
    exteriorColor: 'Glacial White Pearl',
    interiorColor: 'Terracotta',
    fuelType: 'Gasoline',
    engine: '3.8L V6',
    features: [
      'AWD',
      'Navigation',
      'Premium Audio',
      'Panoramic Sunroof',
      'Heads-Up Display',
      'Heated/Ventilated Seats',
      '360-Degree Camera'
    ],
    description: 'Brand new 2023 Kia Telluride SX Prestige with all the luxury features. This 7-passenger SUV offers premium comfort with Nappa leather, dual sunroofs, and the latest technology.',
    sellerType: 'dealer',
    sellerName: 'Triple J Motors',
    sellerLocation: 'Garapan, Saipan',
    sellerContact: '(670) 234-7135',
    images: [
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621963899144-11f0ecd1833b?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800&auto=format&fit=crop'
    ],
    createdAt: '2024-01-15T11:20:00Z'
  },
  {
    id: 'v-005',
    title: '2019 Jeep Wrangler Unlimited Rubicon',
    price: 41500,
    condition: 'used',
    year: 2019,
    make: 'Jeep',
    model: 'Wrangler',
    bodyStyle: 'SUV',
    transmission: 'Automatic',
    mileage: 28750,
    exteriorColor: 'Firecracker Red',
    interiorColor: 'Black',
    fuelType: 'Gasoline',
    engine: '3.6L V6',
    features: [
      '4WD',
      'Removable Top',
      'Off-Road Package',
      'LED Lighting',
      'Navigation',
      'Premium Audio',
      'Tow Package'
    ],
    description: 'Adventure-ready 2019 Jeep Wrangler Unlimited Rubicon. Equipped with factory lift, premium wheels, and upgraded bumpers. Perfect for island exploration with 4WD capability.',
    sellerType: 'private',
    sellerName: 'Sarah Johnson',
    sellerLocation: 'Songsong, Rota',
    sellerContact: '(670) 788-5678',
    images: [
      'https://images.unsplash.com/photo-1608494402683-c8cc8e1ed0ec?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626072778346-0ab6604d191c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1625593383756-d020e4204b7e?w=800&auto=format&fit=crop'
    ],
    createdAt: '2023-09-25T15:30:00Z'
  },
  {
    id: 'v-006',
    title: '2021 Subaru Forester Premium',
    price: 29750,
    condition: 'used',
    year: 2021,
    make: 'Subaru',
    model: 'Forester',
    bodyStyle: 'SUV',
    transmission: 'CVT',
    mileage: 15980,
    exteriorColor: 'Horizon Blue Pearl',
    interiorColor: 'Gray',
    fuelType: 'Gasoline',
    engine: '2.5L H4',
    features: [
      'AWD',
      'Panoramic Moonroof',
      'EyeSight Driver Assist',
      'Heated Seats',
      'Apple CarPlay',
      'Android Auto',
      'X-Mode'
    ],
    description: 'Well-maintained 2021 Subaru Forester Premium with Symmetrical All-Wheel Drive. Excellent for all weather conditions with advanced safety features and spacious interior.',
    sellerType: 'dealer',
    sellerName: 'Island Auto Gallery',
    sellerLocation: 'Chalan Kanoa, Saipan',
    sellerContact: '(670) 235-7890',
    images: [
      'https://images.unsplash.com/photo-1629897048514-3dd66175e0fe?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631184973894-12080f5ef4da?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1628859017536-e8e3c4db8754?w=800&auto=format&fit=crop'
    ],
    createdAt: '2023-10-30T12:45:00Z'
  },
  {
    id: 'v-007',
    title: '2022 Tesla Model Y Long Range',
    price: 56490,
    condition: 'new',
    year: 2022,
    make: 'Tesla',
    model: 'Model Y',
    bodyStyle: 'SUV',
    transmission: 'Automatic',
    exteriorColor: 'Pearl White',
    interiorColor: 'Black',
    fuelType: 'Electric',
    engine: 'Dual Motor Electric',
    features: [
      'AWD',
      'Autopilot',
      'Premium Interior',
      'Glass Roof',
      'Navigation',
      '15" Touchscreen',
      'Supercharging Capability'
    ],
    description: 'New 2022 Tesla Model Y Long Range with dual motor AWD. Features include premium interior, enhanced autopilot, and an incredible 330-mile range on a single charge.',
    sellerType: 'dealer',
    sellerName: 'EV Motors Saipan',
    sellerLocation: 'San Antonio, Saipan',
    sellerContact: '(670) 233-9876',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1619021109758-cc22446b726c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615834772906-d676102dd3e8?w=800&auto=format&fit=crop'
    ],
    createdAt: '2024-02-01T10:15:00Z'
  },
  {
    id: 'v-008',
    title: '2020 Toyota Tacoma TRD Off-Road',
    price: 36995,
    condition: 'used',
    year: 2020,
    make: 'Toyota',
    model: 'Tacoma',
    bodyStyle: 'Truck',
    transmission: 'Automatic',
    mileage: 31250,
    exteriorColor: 'Army Green',
    interiorColor: 'Black',
    fuelType: 'Gasoline',
    engine: '3.5L V6',
    features: [
      '4WD',
      'Off-Road Package',
      'Bed Liner',
      'Tow Package',
      'Navigation',
      'Blind Spot Monitor',
      'Wireless Charging'
    ],
    description: 'Rugged 2020 Toyota Tacoma TRD Off-Road with upgraded suspension, all-terrain tires, and skid plates. Perfect island truck with 4WD capability and excellent reliability.',
    sellerType: 'private',
    sellerName: 'David Torres',
    sellerLocation: 'San Roque, Saipan',
    sellerContact: '(670) 788-4321',
    images: [
      'https://images.unsplash.com/photo-1612911912304-c3c83c33f895?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626072225909-ff7e325bead0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626072725148-ba70cc34b286?w=800&auto=format&fit=crop'
    ],
    createdAt: '2023-11-15T13:30:00Z'
  }
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: "blog-001",
    title: "10 Best Beaches in the Northern Mariana Islands",
    slug: "10-best-beaches-northern-mariana-islands",
    excerpt: "Discover the pristine shores and hidden gems among the Northern Mariana Islands' most beautiful beaches.",
    content: "The Northern Mariana Islands boast some of the most stunning beaches in the Pacific. From the powdery white sands of Micro Beach to the historic shores of Chalan Kanoa Beach, there's a perfect spot for every type of beach lover...",
    author: {
      name: "Maria Santos",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    category: "travel",
    tags: ["beaches", "travel", "swimming", "snorkeling"],
    image: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&auto=format&fit=crop",
    featured: true,
    publishedAt: "2023-04-15T08:00:00Z"
  },
  {
    id: "blog-002",
    title: "A Guide to Tropical Storm Preparedness",
    slug: "tropical-storm-preparedness-guide",
    excerpt: "Essential tips and resources for preparing your home and family for the tropical storm season.",
    content: "Living in the Marianas means being prepared for tropical storms and typhoons. This comprehensive guide covers everything from securing your property to creating an emergency kit and evacuation plan...",
    author: {
      name: "John Rivera",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    category: "safety",
    tags: ["typhoon", "preparedness", "safety", "emergency"],
    image: "https://images.unsplash.com/photo-1612356300593-99d81f8817a4?w=800&auto=format&fit=crop",
    featured: false,
    publishedAt: "2023-05-22T10:30:00Z"
  },
  {
    id: "blog-003",
    title: "Island Real Estate Market Trends for 2023",
    slug: "island-real-estate-market-trends-2023",
    excerpt: "Analysis of the current real estate market in the Northern Mariana Islands and predictions for the future.",
    content: "The real estate market in the CNMI has shown remarkable resilience and growth in recent years. This article examines current trends, popular neighborhoods, investment opportunities, and expert predictions for the remainder of 2023...",
    author: {
      name: "David Camacho",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    category: "real-estate",
    tags: ["real estate", "investment", "market trends", "property"],
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop",
    featured: true,
    publishedAt: "2023-06-05T09:15:00Z"
  },
  {
    id: "blog-004",
    title: "Traditional Chamorro Recipes: A Culinary Journey",
    slug: "traditional-chamorro-recipes",
    excerpt: "Explore the rich flavors and techniques of traditional Chamorro cuisine with these authentic recipes.",
    content: "Chamorro cuisine is a delicious blend of indigenous, Spanish, Filipino, and American influences. Learn how to prepare classic dishes like kelaguen, red rice, and chicken estufao with these traditional family recipes...",
    author: {
      name: "Ana Borja",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    category: "culture",
    tags: ["food", "cooking", "chamorro", "recipes"],
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop",
    featured: false,
    publishedAt: "2023-07-12T11:45:00Z"
  },
  {
    id: "blog-005",
    title: "Transportation Guide: Getting Around the Islands",
    slug: "transportation-guide-northern-mariana-islands",
    excerpt: "Tips and information on the best ways to navigate transportation on Saipan, Tinian, and Rota.",
    content: "Getting around the Northern Mariana Islands can be challenging without proper planning. This guide covers rental car options, public transportation, island hopping by ferry and small aircraft, and insider tips for saving time and money...",
    author: {
      name: "Mark Tenorio",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    category: "travel",
    tags: ["transportation", "travel tips", "car rental", "island hopping"],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop",
    featured: false,
    publishedAt: "2023-08-03T13:20:00Z"
  },
  {
    id: "blog-006",
    title: "Best Hiking Trails in the Marianas",
    slug: "best-hiking-trails-marianas",
    excerpt: "Discover the most scenic and rewarding hiking paths across Saipan, Tinian, and Rota.",
    content: "From the challenging climb to Mt. Tapochau to the historic Forbidden Island trail, the Northern Mariana Islands offer numerous hiking opportunities for outdoor enthusiasts. This article details the best trails, difficulty levels, and what to expect along the way...",
    author: {
      name: "James Cruz",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    category: "outdoors",
    tags: ["hiking", "outdoors", "nature", "trails"],
    image: "https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800&auto=format&fit=crop",
    featured: true,
    publishedAt: "2023-09-18T07:50:00Z"
  }
];
