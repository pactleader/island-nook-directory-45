
// Property Listings Data
export type PropertyListing = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  propertyType: 'residential' | 'commercial' | 'hotel' | 'land' | 'economic-incentive';
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  images: string[];
  island: string;
  village: string;
  street: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
  createdAt: string;
  updatedAt: string;
};

// Vehicle Listings Data
export type VehicleListing = {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'used';
  year: number;
  make: string;
  model: string;
  mileage?: number;
  bodyStyle: string;
  fuelType: string;
  transmission: string;
  images: string[];
  color: string;
  features: string[];
  sellerType: 'dealer' | 'private';
  sellerName: string;
  sellerContact: string;
  createdAt: string;
  updatedAt: string;
};

// Business Listings Data
export type BusinessCategory = 
  'yard-services' | 
  'restaurants' | 
  'professional-services' | 
  'mechanics' | 
  'home-contractors' | 
  'grocery-stores' | 
  'other';

export type BusinessListing = {
  id: string;
  name: string;
  description: string;
  category: BusinessCategory;
  subcategory: string;
  address: {
    street: string;
    village: string;
    island: string;
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
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviews: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
};

// Blog Post Data
export type BlogPost = {
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
  featuredImage: string;
  publishedAt: string;
  updatedAt: string;
};

// Islands and Villages in Northern Mariana Islands
export const islands = [
  'Saipan',
  'Tinian',
  'Rota',
  'Pagan',
  'Anatahan',
  'Alamagan',
  'Guguan',
  'Agrihan',
  'Asuncion',
  'Maug Islands',
  'Farallon de Pajaros'
];

export const villages = {
  'Saipan': [
    'Achugao', 'As Lito', 'As Matuis', 'As Perdido', 'As Teo', 'Capitol Hill', 
    'Chalan Kanoa', 'Chalan Laulau', 'Chalan Piao', 'Chinatown', 'Dan Dan', 
    'Dandan', 'Fina Sisu', 'Garapan', 'Gualo Rai', 'Kagman', 'Kannat Tabla', 
    'Koblerville', 'Marpi', 'Navy Hill', 'Oleai', 'Papago', 'Puerto Rico', 
    'San Antonio', 'San Jose', 'San Roque', 'San Vicente', 'Susupe', 'Tanapag'
  ],
  'Tinian': ['San Jose', 'Marpo Valley', 'Carolinas Heights', 'Marpo Heights'],
  'Rota': ['Songsong', 'Sinapalo'],
  'Pagan': ['Shomushon'],
  'Anatahan': [],
  'Alamagan': [],
  'Guguan': [],
  'Agrihan': [],
  'Asuncion': [],
  'Maug Islands': [],
  'Farallon de Pajaros': []
};

// Business Subcategories
export const businessSubcategories = {
  'yard-services': [
    'Lawn Mowing', 'Landscaping', 'Garden Design', 'Tree Trimming', 
    'Irrigation Systems', 'Weed Control', 'Pest Control', 'Fertilization',
    'Lawn Aeration', 'Mulching', 'Yard Cleanup', 'Hedge Trimming',
    'Sod Installation', 'Artificial Turf', 'Garden Maintenance', 'Flower Bed Installation',
    'Outdoor Lighting', 'Water Features', 'Retaining Walls', 'Outdoor Pest Control'
  ],
  'restaurants': [
    'Fine Dining', 'Casual Dining', 'Fast Food', 'Buffet', 
    'Seafood', 'Steakhouse', 'Italian', 'Asian Fusion',
    'Chinese', 'Japanese', 'Thai', 'Mexican',
    'Indian', 'Vegetarian/Vegan', 'Breakfast & Brunch', 'Coffee Shop',
    'Bakery', 'Dessert', 'Food Truck', 'Bar & Grill'
  ],
  'professional-services': [
    'Accounting', 'Legal Services', 'Financial Planning', 'Insurance', 
    'Real Estate Agents', 'Marketing & Advertising', 'Web Development', 'IT Services',
    'Consulting', 'Translation Services', 'Tax Preparation', 'Business Coaching',
    'Human Resources', 'Notary Public', 'Architecture', 'Graphic Design',
    'Photography', 'Videography', 'Event Planning', 'Public Relations'
  ],
  'mechanics': [
    'Auto Repair', 'Automotive Detailing', 'Oil Change', 'Brake Service', 
    'Transmission Repair', 'Tire Shop', 'Auto Body Shop', 'Auto Glass Repair',
    'Auto Electrical Service', 'Engine Repair', 'Muffler & Exhaust', 'Air Conditioning',
    'Wheel Alignment', 'Suspension Repair', 'Radiator Service', 'Diesel Engine Repair',
    'Auto Diagnostic', 'Mobile Mechanic', 'Motorcycle Repair', 'Boat Repair'
  ],
  'home-contractors': [
    'General Contractor', 'Roofing', 'Plumbing', 'Electrical', 
    'HVAC', 'Painting', 'Flooring', 'Carpentry',
    'Kitchen Remodeling', 'Bathroom Remodeling', 'Masonry', 'Drywall',
    'Insulation', 'Windows & Doors', 'Cabinetry', 'Deck & Patio',
    'Fencing', 'Garage Door', 'Swimming Pool', 'Solar Installation'
  ],
  'grocery-stores': [
    'Supermarket', 'Natural Food Store', 'Asian Market', 'Convenience Store', 
    'Wholesale Club', 'Farmers Market', 'Butcher Shop', 'Seafood Market',
    'Bakery', 'Deli', 'International Foods', 'Liquor Store',
    'Organic Store', 'Health Food Store', 'Specialty Food', 'Discount Grocery',
    'Ethnic Market', 'Bulk Food Store', 'Island Produce', 'Local Store'
  ],
  'other': [
    'Beauty Salon', 'Spa', 'Gym & Fitness', 'Childcare', 
    'Pet Services', 'Dry Cleaning', 'Laundromat', 'Tailor',
    'Shoe Repair', 'Phone Repair', 'Computer Repair', 'Appliance Repair',
    'Locksmith', 'Moving Services', 'Storage Facility', 'Printing Services',
    'Florist', 'Gift Shop', 'Jewelry Repair', 'Pawn Shop'
  ]
};

// Car Makes and Models
export const carMakes = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia', 'Mazda',
  'Subaru', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Lexus', 'Audi', 'Jeep',
  'Mitsubishi', 'Acura', 'Infiniti', 'GMC', 'Dodge'
];

export const carBodyStyles = [
  'Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon',
  'Van', 'Minivan', 'Crossover'
];

// Mock Data Generation
// This would normally come from an API or database
// For now, we'll use placeholder data

export const mockProperties: PropertyListing[] = [
  {
    id: "prop-001",
    title: "Beachfront Villa in Garapan",
    description: "Stunning beachfront property with panoramic ocean views. This luxurious villa features 4 bedrooms, 3 bathrooms, and a private pool. Located in the heart of Garapan with easy access to shopping, dining, and entertainment.",
    price: 950000,
    currency: "USD",
    propertyType: "residential",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    ],
    island: "Saipan",
    village: "Garapan",
    street: "Beach Road",
    coordinates: {
      lat: 15.207801,
      lng: 145.718260
    },
    features: [
      "Beachfront", "Private Pool", "Garden", "Garage", "Air Conditioning"
    ],
    createdAt: "2023-10-15T08:00:00Z",
    updatedAt: "2023-10-15T08:00:00Z"
  },
  {
    id: "prop-002",
    title: "Commercial Space in San Jose",
    description: "Prime commercial space available in the business district of San Jose, Tinian. Perfect for retail or office use with high foot traffic and visibility.",
    price: 450000,
    currency: "USD",
    propertyType: "commercial",
    sqft: 1500,
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363"
    ],
    island: "Tinian",
    village: "San Jose",
    street: "Broadway",
    coordinates: {
      lat: 15.0,
      lng: 145.63
    },
    features: [
      "Store Front", "Storage Room", "Parking", "Air Conditioning", "Security System"
    ],
    createdAt: "2023-11-02T10:30:00Z",
    updatedAt: "2023-11-02T10:30:00Z"
  },
  {
    id: "prop-003",
    title: "Hotel Property in Chalan Kanoa",
    description: "Established hotel property with 30 rooms, restaurant, and pool. Great investment opportunity in a popular tourist area.",
    price: 2500000,
    currency: "USD",
    propertyType: "hotel",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363"
    ],
    island: "Saipan",
    village: "Chalan Kanoa",
    street: "Beach Road",
    coordinates: {
      lat: 15.15,
      lng: 145.7
    },
    features: [
      "30 Rooms", "Restaurant", "Swimming Pool", "Conference Room", "Parking Lot"
    ],
    createdAt: "2023-09-20T14:15:00Z",
    updatedAt: "2023-09-20T14:15:00Z"
  },
  {
    id: "prop-004",
    title: "Economic Incentive Zone Property",
    description: "Development opportunity in the Economic Incentive Zone. Eligible for tax benefits and development incentives.",
    price: 750000,
    currency: "USD",
    propertyType: "economic-incentive",
    sqft: 12000,
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    ],
    island: "Saipan",
    village: "San Vicente",
    street: "Middle Road",
    coordinates: {
      lat: 15.18,
      lng: 145.75
    },
    features: [
      "Tax Incentives", "Large Lot", "Development Ready", "Utilities Available"
    ],
    createdAt: "2023-12-05T09:45:00Z",
    updatedAt: "2023-12-05T09:45:00Z"
  },
  {
    id: "prop-005",
    title: "Residential Home in Koblerville",
    description: "Comfortable family home with 3 bedrooms, 2 bathrooms in a quiet neighborhood. Features a large yard and covered patio.",
    price: 320000,
    currency: "USD",
    propertyType: "residential",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    ],
    island: "Saipan",
    village: "Koblerville",
    street: "Koblerville Road",
    coordinates: {
      lat: 15.14,
      lng: 145.72
    },
    features: [
      "Large Yard", "Covered Patio", "Garage", "Air Conditioning", "Garden"
    ],
    createdAt: "2023-11-15T11:20:00Z",
    updatedAt: "2023-11-15T11:20:00Z"
  }
];

export const mockVehicles: VehicleListing[] = [
  {
    id: "veh-001",
    title: "2022 Toyota RAV4 XLE",
    description: "Well-maintained 2022 Toyota RAV4 XLE with low mileage. Features include backup camera, lane assist, and Bluetooth connectivity.",
    price: 28500,
    condition: "used",
    year: 2022,
    make: "Toyota",
    model: "RAV4",
    mileage: 15000,
    bodyStyle: "SUV",
    fuelType: "Gasoline",
    transmission: "Automatic",
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    ],
    color: "Silver",
    features: [
      "Backup Camera", "Lane Assist", "Bluetooth", "Keyless Entry", "Cruise Control"
    ],
    sellerType: "private",
    sellerName: "John Smith",
    sellerContact: "john.smith@example.com",
    createdAt: "2023-12-10T15:30:00Z",
    updatedAt: "2023-12-10T15:30:00Z"
  },
  {
    id: "veh-002",
    title: "2023 Honda Civic EX - New",
    description: "Brand new 2023 Honda Civic EX with manufacturer warranty. Includes Honda Sensing safety features and Apple CarPlay/Android Auto integration.",
    price: 25999,
    condition: "new",
    year: 2023,
    make: "Honda",
    model: "Civic",
    bodyStyle: "Sedan",
    fuelType: "Gasoline",
    transmission: "CVT",
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    ],
    color: "Blue",
    features: [
      "Honda Sensing", "Apple CarPlay", "Android Auto", "Sunroof", "Heated Seats"
    ],
    sellerType: "dealer",
    sellerName: "Island Motors",
    sellerContact: "sales@islandmotors.com",
    createdAt: "2023-12-05T09:15:00Z",
    updatedAt: "2023-12-05T09:15:00Z"
  },
  {
    id: "veh-003",
    title: "2019 Ford F-150 XLT",
    description: "Reliable 2019 Ford F-150 XLT with towing package. Perfect for work and island adventures.",
    price: 32000,
    condition: "used",
    year: 2019,
    make: "Ford",
    model: "F-150",
    mileage: 45000,
    bodyStyle: "Truck",
    fuelType: "Gasoline",
    transmission: "Automatic",
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    ],
    color: "Red",
    features: [
      "Towing Package", "Bed Liner", "Backup Camera", "Bluetooth", "Power Windows"
    ],
    sellerType: "private",
    sellerName: "Mike Johnson",
    sellerContact: "mike.j@example.com",
    createdAt: "2023-11-20T13:45:00Z",
    updatedAt: "2023-11-20T13:45:00Z"
  },
  {
    id: "veh-004",
    title: "2022 Hyundai Tucson Limited",
    description: "Luxury 2022 Hyundai Tucson Limited with panoramic sunroof, leather seats, and advanced safety features.",
    price: 29500,
    condition: "used",
    year: 2022,
    make: "Hyundai",
    model: "Tucson",
    mileage: 18500,
    bodyStyle: "SUV",
    fuelType: "Gasoline",
    transmission: "Automatic",
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    ],
    color: "White",
    features: [
      "Panoramic Sunroof", "Leather Seats", "Navigation", "Blind Spot Detection", "Heated/Cooled Seats"
    ],
    sellerType: "dealer",
    sellerName: "Pacific Auto",
    sellerContact: "info@pacificauto.com",
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2023-12-01T10:00:00Z"
  },
  {
    id: "veh-005",
    title: "2023 Mazda CX-5 - New",
    description: "Brand new 2023 Mazda CX-5 with premium features including Bose sound system and advanced driver assistance technologies.",
    price: 31500,
    condition: "new",
    year: 2023,
    make: "Mazda",
    model: "CX-5",
    bodyStyle: "SUV",
    fuelType: "Gasoline",
    transmission: "Automatic",
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    ],
    color: "Gray",
    features: [
      "Bose Sound System", "Driver Assistance", "Leather Interior", "Power Liftgate", "Heated Steering Wheel"
    ],
    sellerType: "dealer",
    sellerName: "Island Motors",
    sellerContact: "sales@islandmotors.com",
    createdAt: "2023-12-08T14:20:00Z",
    updatedAt: "2023-12-08T14:20:00Z"
  }
];

export const mockBusinesses: BusinessListing[] = [
  {
    id: "bus-001",
    name: "Ocean View Restaurant",
    description: "Fine dining restaurant specializing in fresh seafood and local cuisine with panoramic ocean views.",
    category: "restaurants",
    subcategory: "Fine Dining",
    address: {
      street: "Beach Road",
      village: "Garapan",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-1234",
      email: "info@oceanviewrestaurant.com",
      website: "www.oceanviewrestaurant.com"
    },
    hours: {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "11:00 AM - 11:00 PM",
      sunday: "12:00 PM - 9:00 PM"
    },
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    ],
    coordinates: {
      lat: 15.207,
      lng: 145.718
    },
    rating: 4.7,
    reviews: 128,
    features: [
      "Ocean View", "Outdoor Seating", "Full Bar", "Private Dining", "Reservations Recommended"
    ],
    createdAt: "2023-06-15T14:30:00Z",
    updatedAt: "2023-12-01T09:15:00Z"
  },
  {
    id: "bus-002",
    name: "Island Auto Repair",
    description: "Comprehensive auto repair and maintenance services with certified mechanics and modern diagnostic equipment.",
    category: "mechanics",
    subcategory: "Auto Repair",
    address: {
      street: "Middle Road",
      village: "Chalan Kanoa",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-2345",
      email: "service@islandautorepair.com",
      website: "www.islandautorepair.com"
    },
    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "9:00 AM - 3:00 PM",
      sunday: "Closed"
    },
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
    ],
    coordinates: {
      lat: 15.15,
      lng: 145.7
    },
    rating: 4.5,
    reviews: 87,
    features: [
      "Certified Mechanics", "Diagnostic Services", "Air Conditioning Repair", "Brake Service", "Oil Change"
    ],
    createdAt: "2023-08-10T10:45:00Z",
    updatedAt: "2023-11-20T16:30:00Z"
  },
  {
    id: "bus-003",
    name: "Pacific Lawn Care",
    description: "Professional yard maintenance and landscaping services for residential and commercial properties.",
    category: "yard-services",
    subcategory: "Lawn Mowing",
    address: {
      street: "As Lito Road",
      village: "As Lito",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-3456",
      email: "contact@pacificlawncare.com"
    },
    hours: {
      monday: "7:00 AM - 5:00 PM",
      tuesday: "7:00 AM - 5:00 PM",
      wednesday: "7:00 AM - 5:00 PM",
      thursday: "7:00 AM - 5:00 PM",
      friday: "7:00 AM - 5:00 PM",
      saturday: "8:00 AM - 12:00 PM",
      sunday: "Closed"
    },
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    ],
    coordinates: {
      lat: 15.18,
      lng: 145.73
    },
    rating: 4.3,
    reviews: 56,
    features: [
      "Lawn Mowing", "Landscaping", "Tree Trimming", "Garden Maintenance", "Irrigation Systems"
    ],
    createdAt: "2023-09-05T09:00:00Z",
    updatedAt: "2023-12-12T11:20:00Z"
  },
  {
    id: "bus-004",
    name: "Island Legal Services",
    description: "Full-service law firm specializing in real estate, business, and immigration law for the Northern Mariana Islands.",
    category: "professional-services",
    subcategory: "Legal Services",
    address: {
      street: "Plumeria Ave",
      village: "Capitol Hill",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-4567",
      email: "info@islandlegalservices.com",
      website: "www.islandlegalservices.com"
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
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
    ],
    coordinates: {
      lat: 15.21,
      lng: 145.73
    },
    rating: 4.8,
    reviews: 42,
    features: [
      "Real Estate Law", "Business Law", "Immigration Law", "Contract Review", "Legal Consultation"
    ],
    createdAt: "2023-07-20T13:15:00Z",
    updatedAt: "2023-11-30T15:45:00Z"
  },
  {
    id: "bus-005",
    name: "Marianas Market",
    description: "Local grocery store offering fresh produce, island specialties, and everyday essentials.",
    category: "grocery-stores",
    subcategory: "Supermarket",
    address: {
      street: "Beach Road",
      village: "Susupe",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-5678",
      email: "info@marianasmarket.com",
      website: "www.marianasmarket.com"
    },
    hours: {
      monday: "6:00 AM - 10:00 PM",
      tuesday: "6:00 AM - 10:00 PM",
      wednesday: "6:00 AM - 10:00 PM",
      thursday: "6:00 AM - 10:00 PM",
      friday: "6:00 AM - 10:00 PM",
      saturday: "6:00 AM - 10:00 PM",
      sunday: "7:00 AM - 9:00 PM"
    },
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    ],
    coordinates: {
      lat: 15.16,
      lng: 145.71
    },
    rating: 4.2,
    reviews: 115,
    features: [
      "Fresh Produce", "Local Products", "Deli Counter", "Bakery", "International Foods"
    ],
    createdAt: "2023-05-12T08:30:00Z",
    updatedAt: "2023-12-10T12:00:00Z"
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: "blog-001",
    title: "Top 5 Beaches in the Northern Mariana Islands",
    slug: "top-5-beaches-northern-mariana-islands",
    excerpt: "Discover the most stunning beaches across the Northern Mariana Islands, from the popular spots to hidden gems.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
    author: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    },
    category: "Travel",
    tags: ["Beaches", "Tourism", "Saipan", "Tinian", "Rota"],
    featuredImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    publishedAt: "2023-11-15T09:00:00Z",
    updatedAt: "2023-11-15T09:00:00Z"
  },
  {
    id: "blog-002",
    title: "Real Estate Investment Opportunities in Northern Mariana Islands",
    slug: "real-estate-investment-opportunities",
    excerpt: "An overview of the current real estate market and investment opportunities in the Northern Mariana Islands.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
    author: {
      name: "John Chen",
      avatar: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    },
    category: "Real Estate",
    tags: ["Investment", "Property", "Market Analysis", "Economic Incentives"],
    featuredImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    publishedAt: "2023-10-25T14:30:00Z",
    updatedAt: "2023-10-25T14:30:00Z"
  },
  {
    id: "blog-003",
    title: "Guide to Starting a Business in the Northern Mariana Islands",
    slug: "starting-business-guide",
    excerpt: "A comprehensive guide to business regulations, licensing, and opportunities for entrepreneurs in the CNMI.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
    author: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    },
    category: "Business",
    tags: ["Entrepreneurship", "Business License", "Regulations", "CNMI"],
    featuredImage: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
    publishedAt: "2023-12-01T11:15:00Z",
    updatedAt: "2023-12-01T11:15:00Z"
  },
  {
    id: "blog-004",
    title: "Best Vehicles for Island Living",
    slug: "best-vehicles-island-living",
    excerpt: "What to look for when purchasing a vehicle for the unique driving conditions of the Northern Mariana Islands.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
    author: {
      name: "James Lee",
      avatar: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    },
    category: "Automotive",
    tags: ["SUVs", "Off-road", "Fuel Efficiency", "Vehicle Maintenance"],
    featuredImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    publishedAt: "2023-11-05T16:45:00Z",
    updatedAt: "2023-11-05T16:45:00Z"
  },
  {
    id: "blog-005",
    title: "Local Business Spotlight: Ocean View Restaurant",
    slug: "business-spotlight-ocean-view-restaurant",
    excerpt: "An interview with the owners of Ocean View Restaurant, one of Saipan's premier dining establishments.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    },
    category: "Local Business",
    tags: ["Restaurant", "Dining", "Interview", "Saipan", "Entrepreneurship"],
    featuredImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    publishedAt: "2023-12-10T13:00:00Z",
    updatedAt: "2023-12-10T13:00:00Z"
  }
];
