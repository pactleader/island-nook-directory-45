
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
  sponsored?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Property Listings
export interface PropertyListing {
  id: string;
  title: string;
  price: number;
  propertyType: string;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  street: string;
  village: string;
  island: string;
  zipCode: string;
  features: string[];
  images: string[];
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
  description: string;
  features: string[];
  sellerType: 'dealer' | 'private';
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// Blog Post
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  featuredImage: string;
  images?: string[];
  publishedAt: string;
  updatedAt: string;
}

// Mock Business Data
export const mockBusinesses: BusinessListing[] = [
  {
    id: "1",
    name: "Saipan Dive Shop",
    category: "tour-guides",
    subcategory: "diving",
    description: "Explore the underwater wonders of Saipan with our expert dive guides. We offer tours for all skill levels.",
    address: {
      street: "Beach Road",
      village: "Garapan",
      island: "Saipan",
      zipCode: "96950"
    },
    contact: {
      phone: "+16702341234",
      email: "info@saipandiveshop.com",
      website: "https://www.saipandiveshop.com"
    },
    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "Closed"
    },
    images: [
      "https://images.unsplash.com/photo-1560523742-7f607c89c35a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1541424443437-e5997936ca2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1502085627461-6562994093c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    rating: 4.8,
    reviews: 125,
    featured: true,
    sponsored: true,
    createdAt: "2023-01-15T08:00:00Z",
    updatedAt: "2023-07-01T10:30:00Z",
  },
  {
    id: "2",
    name: "CNMI Medical Center",
    category: "healthcare",
    subcategory: "general-practice",
    description: "Providing comprehensive medical services to the people of CNMI. Our experienced team of doctors and nurses are here to care for you.",
    address: {
      street: "Hospital Road",
      village: "As Terlague",
      island: "Saipan",
      zipCode: "96950"
    },
    contact: {
      phone: "+16702344111",
      email: "info@cnmimedical.com",
      website: "https://www.cnmimedical.com"
    },
    hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 1:00 PM",
      sunday: "Closed"
    },
    images: [
      "https://plus.unsplash.com/premium_photo-1663050484141-39325a13993a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1532938314630-e96f17bb43e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1505751172876-9aba5839239d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    rating: 4.5,
    reviews: 89,
    featured: true,
    createdAt: "2022-11-20T14:20:00Z",
    updatedAt: "2023-06-15T09:45:00Z",
  },
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
    sponsored: true,
    createdAt: "2023-06-12T08:30:00Z",
    updatedAt: "2023-11-05T15:45:00Z"
  }
];

// Mock Property Data
export const mockProperties: PropertyListing[] = [
  {
    id: "prop1",
    title: "Luxury Ocean View Villa",
    price: 850000,
    propertyType: "residential",
    description: "Stunning 4-bedroom villa with panoramic ocean views. Features include a private pool, modern kitchen, and spacious living areas perfect for entertaining.",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    street: "123 Cliff Line Road",
    village: "Capitol Hill",
    island: "Saipan",
    zipCode: "96950",
    features: [
      "Ocean view",
      "Private pool",
      "Modern kitchen",
      "Garden",
      "Garage",
      "Backup generator"
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617104424032-5bf261a6d15b?w=800&auto=format&fit=crop"
    ],
    createdAt: "2023-03-10T08:00:00Z",
    updatedAt: "2023-06-15T14:30:00Z"
  },
  {
    id: "prop2",
    title: "Commercial Building in Garapan",
    price: 1250000,
    propertyType: "commercial",
    description: "Prime commercial property in the heart of Garapan's business district. Multiple units, excellent foot traffic, and recently renovated.",
    sqft: 5500,
    street: "456 Tourist Avenue",
    village: "Garapan",
    island: "Saipan",
    zipCode: "96950",
    features: [
      "Multiple units",
      "High foot traffic",
      "Recently renovated",
      "Parking lot",
      "Security system",
      "Backup power"
    ],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop"
    ],
    createdAt: "2023-02-05T10:15:00Z",
    updatedAt: "2023-07-20T16:45:00Z"
  }
];

// Mock Vehicle Data
export const mockVehicles: VehicleListing[] = [
  {
    id: "veh1",
    title: "2023 Toyota RAV4 XLE Premium",
    price: 36500,
    condition: "new",
    year: 2023,
    make: "Toyota",
    model: "RAV4",
    bodyStyle: "SUV",
    transmission: "Automatic",
    description: "Brand new 2023 Toyota RAV4 XLE Premium with only delivery miles. Features include all-wheel drive, sunroof, and Toyota Safety Sense package.",
    features: [
      "All-wheel drive",
      "Sunroof",
      "Toyota Safety Sense",
      "Bluetooth",
      "Backup camera",
      "Apple CarPlay/Android Auto"
    ],
    sellerType: "dealer",
    sellerName: "Atkins Kroll Toyota",
    sellerPhone: "(670) 234-5678",
    sellerEmail: "sales@akguam.com",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617469767053-8ae97d3f4d5e?w=800&auto=format&fit=crop"
    ],
    createdAt: "2023-05-10T08:30:00Z",
    updatedAt: "2023-09-15T14:20:00Z"
  },
  {
    id: "veh2",
    title: "2020 Honda Civic EX-L",
    price: 21900,
    condition: "used",
    year: 2020,
    make: "Honda",
    model: "Civic",
    bodyStyle: "Sedan",
    transmission: "Automatic",
    mileage: 28500,
    description: "Well-maintained 2020 Honda Civic EX-L with low mileage. One owner, clean title. Features leather seats, sunroof, and Honda Sensing safety package.",
    features: [
      "Leather seats",
      "Sunroof",
      "Honda Sensing",
      "Bluetooth",
      "Backup camera",
      "Heated seats"
    ],
    sellerType: "dealer",
    sellerName: "Joeten Motors",
    sellerPhone: "(670) 235-5678",
    sellerEmail: "sales@joetenmotors.com",
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1597007610539-717196102796?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620674169694-1f69c4d1e0eb?w=800&auto=format&fit=crop"
    ],
    createdAt: "2023-06-05T10:15:00Z",
    updatedAt: "2023-08-20T16:45:00Z"
  }
];

// Mock Blog Post Data
export const mockBlogPosts: BlogPost[] = [
  {
    id: "blog1",
    title: "Top 10 Hidden Beaches in Saipan You Must Visit",
    slug: "top-10-hidden-beaches-saipan",
    excerpt: "Discover the secret beaches of Saipan that most tourists never see. From secluded coves to pristine shores, these hidden gems offer tranquility away from the crowds.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "Travel",
    tags: ["beaches", "saipan", "travel", "hidden gems"],
    author: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop",
      bio: "Travel writer and photographer specializing in Micronesia"
    },
    featuredImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484821582734-6692f7b94be5?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484821582734-6692f7b94be5?w=800&auto=format&fit=crop"
    ],
    publishedAt: "2023-05-15T09:00:00Z",
    updatedAt: "2023-05-16T10:30:00Z"
  },
  {
    id: "blog2",
    title: "Guide to Real Estate Investment in the CNMI",
    slug: "real-estate-investment-cnmi-guide",
    excerpt: "Everything you need to know about investing in property in the Commonwealth of the Northern Mariana Islands. Learn about regulations, opportunities, and potential returns.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "Real Estate",
    tags: ["real estate", "investment", "CNMI", "property"],
    author: {
      name: "John Reyes",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop",
      bio: "Real estate consultant with 15 years experience in the CNMI market"
    },
    featuredImage: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&auto=format&fit=crop"
    ],
    publishedAt: "2023-06-10T14:00:00Z",
    updatedAt: "2023-06-12T08:45:00Z"
  }
];

// Business Categories and Subcategories
export const businessCategories = {
  'yard-services': {
    label: 'Yard Services',
    subcategories: [
      { label: 'Lawn Mowing', value: 'lawn-mowing' },
      { label: 'Landscaping', value: 'landscaping' },
      { label: 'Tree Trimming', value: 'tree-trimming' },
      { label: 'Garden Design', value: 'garden-design' }
    ]
  },
  'restaurants': {
    label: 'Restaurants',
    subcategories: [
      { label: 'Local Cuisine', value: 'local-cuisine' },
      { label: 'Japanese', value: 'japanese' },
      { label: 'Chinese', value: 'chinese' },
      { label: 'Korean', value: 'korean' }
    ]
  },
  'professional-services': {
    label: 'Professional Services',
    subcategories: [
      { label: 'Accounting', value: 'accounting' },
      { label: 'Legal', value: 'legal' },
      { label: 'Insurance', value: 'insurance' },
      { label: 'Real Estate', value: 'real-estate' }
    ]
  },
  'mechanics-and-cars': {
    label: 'Mechanics & Cars',
    subcategories: [
      { label: 'Auto Repair', value: 'auto-repair' },
      { label: 'Oil Change', value: 'oil-change' },
      { label: 'Tire Services', value: 'tire-services' },
      { label: 'Body Shops', value: 'body-shops' }
    ]
  },
  'home-contractors': {
    label: 'Home Contractors',
    subcategories: [
      { label: 'General Contractors', value: 'general-contractors' },
      { label: 'Plumbers', value: 'plumbers' },
      { label: 'Electricians', value: 'electricians' },
      { label: 'HVAC', value: 'hvac' }
    ]
  },
  'shopping-and-stores': {
    label: 'Shopping & Stores',
    subcategories: [
      { label: 'Supermarkets', value: 'supermarkets' },
      { label: 'Convenience Stores', value: 'convenience-stores' },
      { label: 'Farmers Markets', value: 'farmers-markets' },
      { label: 'Organic Foods', value: 'organic-foods' }
    ]
  },
  'healthcare': {
    label: 'Healthcare',
    subcategories: [
      { label: 'Doctors', value: 'doctors' },
      { label: 'Dentists', value: 'dentists' },
      { label: 'Hospitals', value: 'hospitals' },
      { label: 'Clinics', value: 'clinics' },
      { label: 'Pharmacies', value: 'pharmacies' },
      { label: 'Physical Therapy', value: 'physical-therapy' },
      { label: 'Mental Health', value: 'mental-health' },
      { label: 'Chiropractors', value: 'chiropractors' }
    ]
  },
  'religious': {
    label: 'Religious',
    subcategories: [
      { label: 'Catholic Churches', value: 'catholic-churches' },
      { label: 'Protestant Churches', value: 'protestant-churches' },
      { label: 'Baptist Churches', value: 'baptist-churches' },
      { label: 'Methodist Churches', value: 'methodist-churches' },
      { label: 'Buddhist Temples', value: 'buddhist-temples' },
      { label: 'Mosques', value: 'mosques' }
    ]
  },
  'tour-guides': {
    label: 'Tour Guides',
    subcategories: [
      { label: 'Island Tours', value: 'island-tours' },
      { label: 'Cultural Tours', value: 'cultural-tours' },
      { label: 'Historical Tours', value: 'historical-tours' },
      { label: 'Nature Tours', value: 'nature-tours' },
      { label: 'Diving', value: 'diving' },
      { label: 'Snorkeling', value: 'snorkeling' }
    ]
  },
  'other': {
    label: 'Other Services',
    subcategories: [
      { label: 'Education', value: 'education' },
      { label: 'Fitness', value: 'fitness' },
      { label: 'Beauty & Spas', value: 'beauty-spas' },
      { label: 'Pet Services', value: 'pet-services' }
    ]
  }
};
