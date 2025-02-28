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
