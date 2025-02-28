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
    id: '3',
    name: 'Mount Carmel Cathedral',
    category: 'religious',
    subcategory: 'churches',
    description: 'A beautiful and historic cathedral located in the heart of Chalan Kanoa. Visitors are welcome to attend services or explore the grounds.',
    address: {
      street: 'Carlos G. Camacho Rd',
      village: 'Chalan Kanoa',
      island: 'Saipan',
      zipCode: '96950'
    },
    contact: {
      phone: '+16702346830',
      email: 'mountcarmel@pticom.com',
      website: ''
    },
    hours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '8:00 AM - 12:00 PM',
      sunday: '7:00 AM - 12:00 PM'
    },
    images: [
      'https://images.unsplash.com/photo-1605492483387-5a089599d913?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      'https://images.unsplash.com/photo-1575580034771-c71e27756936?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1519525364201-f99869b01956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    rating: 4.7,
    reviews: 95,
    featured: true,
    createdAt: '2022-09-01T10:00:00Z',
    updatedAt: '2023-05-22T16:10:00Z',
  },
  {
    id: '4',
    name: 'Hafa Adai Pledge Tours',
    category: 'tour-guides',
    subcategory: 'sightseeing',
    description: 'Discover the beauty and history of Saipan with our personalized sightseeing tours. We cater to small groups and offer unique experiences.',
    address: {
      street: 'Middle Road',
      village: 'Susupe',
      island: 'Saipan',
      zipCode: '96950'
    },
    contact: {
      phone: '+16704839876',
      email: 'info@hafaadaitours.com',
      website: 'https://www.hafaadaitours.com'
    },
    hours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: '9:00 AM - 12:00 PM',
      sunday: 'Closed'
    },
    images: [
      'https://images.unsplash.com/photo-1504492953559-723aa56586ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1560523742-7f607c89c35a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1541424443437-e5997936ca2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    rating: 4.9,
    reviews: 150,
    featured: true,
    sponsored: true,
    createdAt: '2022-08-10T11:30:00Z',
    updatedAt: '2023-07-05T14:00:00Z',
  },
  {
    id: '5',
    name: 'Seventh-Day Adventist Clinic',
    category: 'healthcare',
    subcategory: 'specialist-clinic',
    description: 'Offering specialized medical care with a focus on holistic health. Our clinic provides a range of services to meet your healthcare needs.',
    address: {
      street: 'Chalan Piao',
      village: 'As Perdido',
      island: 'Saipan',
      zipCode: '96950'
    },
    contact: {
      phone: '+16702343333',
      email: 'info@sdaclinic.com',
      website: 'https://www.sdaclinic.com'
    },
    hours: {
      monday: '8:30 AM - 5:30 PM',
      tuesday: '8:30 AM - 5:30 PM',
      wednesday: '8:30 AM - 5:30 PM',
      thursday: '8:30 AM - 5:30 PM',
      friday: '8:30 AM - 12:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    images: [
      'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://plus.unsplash.com/premium_photo-1663050484141-39325a13993a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1532938314630-e96f17bb43e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    rating: 4.6,
    reviews: 78,
    featured: true,
    sponsored: true,
    createdAt: '2022-07-01T09:15:00Z',
    updatedAt: '2023-06-20T11:50:00Z',
  },
  {
    id: '6',
    name: 'Our Lady of Fatima Church',
    category: 'religious',
    subcategory: 'churches',
    description: 'A welcoming Catholic church offering regular services and community events. All are welcome to join us in worship.',
    address: {
      street: 'Navy Hill Road',
      village: 'Navy Hill',
      island: 'Saipan',
      zipCode: '96950'
    },
    contact: {
      phone: '+16703224567',
      email: 'fatimaparish@pticom.com',
      website: ''
    },
    hours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '5:00 PM - 6:00 PM',
      sunday: '7:00 AM - 10:00 AM'
    },
    images: [
      'https://images.unsplash.com/photo-1575580034771-c71e27756936?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1519525364201-f99869b01956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1605492483387-5a089599d913?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
    ],
    rating: 4.4,
    reviews: 62,
    featured: true,
    createdAt: '2022-05-15T16:45:00Z',
    updatedAt: '2023-04-10T08:20:00Z',
  },
  {
    id: '7',
    name: 'Marianas Trekking',
    category: 'tour-guides',
    subcategory: 'hiking',
    description: 'Experience the natural beauty of Saipan with our guided hiking tours. We offer trails for all fitness levels.',
    address: {
      street: 'Capitol Hill',
      village: 'Capitol Hill',
      island: 'Saipan',
      zipCode: '96950'
    },
    contact: {
      phone: '+16703237777',
      email: 'info@marianastrekking.com',
      website: 'https://www.marianastrekking.com'
    },
    hours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '8:00 AM - 12:00 PM',
      sunday: 'Closed'
    },
    images: [
      'https://images.unsplash.com/photo-1602254572336-37a9566e013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1504492953559-723aa56586ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1560523742-7f607c89c35a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    rating: 4.7,
    reviews: 110,
    featured: true,
    sponsored: true,
    createdAt: '2022-04-01T14:30:00Z',
    updatedAt: '2023-03-15T09:00:00Z',
  },
  {
    id: '8',
    name: 'Grace Christian Fellowship',
    category: 'religious',
    subcategory: 'churches',
    description: 'A vibrant Christian community dedicated to spreading the love of God. Join us for worship and fellowship.',
    address: {
      street: 'Middle Road',
      village: 'Susupe',
      island: 'Saipan',
      zipCode: '96950'
    },
    contact: {
      phone: '+16702351111',
      email: 'info@gcfsaipan.com',
      website: 'https://www.gcfsaipan.com'
    },
    hours: {
      monday: 'Closed',
      tuesday: '7:00 PM - 8:30 PM',
      wednesday: 'Closed',
      thursday: '7:00 PM - 8:30 PM',
      friday: 'Closed',
      saturday: '6:00 PM - 7:30 PM',
      sunday: '9:00 AM - 12:00 PM'
    },
    images: [
      'https://images.unsplash.com/photo-1519525364201-f99869b01956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1605492483387-5a089599d913?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      'https://images.unsplash.com/photo-1575580034771-c71e27756936?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    rating: 4.9,
    reviews: 135,
    featured: true,
    createdAt: '2022-02-10T11:00:00Z',
    updatedAt: '2023-01-28T15:40:00Z',
  },
  {
    id: '9',
    name: 'Tasi Tours & Transportation',
    category: 'tour-guides',
    subcategory: 'transportation',
    description: 'Reliable and comfortable transportation services for tourists and locals alike. Explore Saipan with ease.',
    address: {
      street: 'Garapan',
      village: 'Garapan',
      island: 'Saipan',
      zipCode: '96950'
    },
    contact: {
      phone: '+16702338274',
      email: 'info@tasitours.com',
      website: 'https://www.tasitours.com'
    },
    hours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 8:00 PM',
      saturday: '8:00 AM - 8:00 PM',
      sunday: '8:00 AM - 8:00 PM'
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d59aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      'https://images.unsplash.com/photo-1504492953559-723aa56586ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1560523742-7f607c89c35a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    rating: 4.5,
    reviews: 80,
    featured: true,
    createdAt: '2021-12-01T10:45:00Z',
    updatedAt: '2023-01-10T16:00:00Z',
  },
  {
    id: '10',
    name: 'Kagman Seventh-Day Adventist Church',
    category: 'religious',
    subcategory: 'churches',
    description: 'A community-focused church providing spiritual guidance and support. Join us for worship and fellowship.',
    address: {
      street: 'Kagman Road',
      village: 'Kagman',
      island: 'Saipan',
      zipCode: '96950'
    },
    contact: {
      phone: '+16702345555',
      email: 'kagmansdachurch@pticom.com',
      website: ''
    },
    hours: {
      monday: 'Closed',
      tuesday: 'Closed',
      wednesday: '7:00 PM - 8:00 PM',
      thursday: 'Closed',
      friday: '7:00 PM - 8:00 PM',
      saturday: '9:00 AM - 12:00 PM',
      sunday: 'Closed'
    },
    images: [
      'https://images.unsplash.com/photo-1605492483387-5a089599d913?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      'https://images.unsplash.com/photo-1575580034771-c71e27756936?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1519525364201-f99869b01956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    rating: 4.3,
    reviews: 50,
    featured: true,
    sponsored: true,
    createdAt: '2021-10-01T08:00:00Z',
    updatedAt: '2022-11-15T14:20:00Z',
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
    updatedAt: "
