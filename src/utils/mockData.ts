// Type definitions
export type PropertyListing = {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  street: string;
  village: string;
  island: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  features: string[];
  images: string[];
  createdAt: string;
}

export type VehicleListing = {
  id: string;
  title: string;
  description: string;
  make: string;
  model: string;
  year: number;
  bodyStyle: string;
  transmission: string;
  condition: string;
  price: number;
  mileage?: number;
  type: string;
  images: string[];
  features: string[];
  fuelType: string;
  engine: string;
  exteriorColor: string;
  interiorColor: string;
  sellerName: string;
  sellerLocation: string;
  sellerContact: string;
  sellerType: string;
  createdAt: string;
}

export type BusinessListing = {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  address: {
    street: string;
    village: string;
    island: string;
  };
  contact: {
    phone: string;
    email?: string;
    website?: string;
  };
  rating: number;
  reviews: number;
  images: string[];
  createdAt: string;
}

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  }
}

export type FoodListing = {
  id: string;
  name: string;
  description: string;
  category: "grocery" | "cafe" | "restaurant";
  subcategory: string;
  priceRange: string;
  rating: number;
  imageUrl: string;
  location: {
    address: string;
    village: string;
  };
  openingHours: {
    open: string;
    close: string;
    days: string;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  cuisineTypes?: string[];
  diningStyle?: string;
  featuredDish?: string;
  createdAt: string;
  dietaryPreferences?: string[];
}

// Convert the existing mock properties to match the PropertyListing type
export const mockProperties: PropertyListing[] = [
  {
    id: "property1",
    title: "Luxury Beachfront Villa",
    description: "Stunning villa with private beach access and panoramic ocean views.",
    propertyType: "residential",
    street: "123 Ocean Drive",
    village: "Garapan",
    island: "Saipan",
    price: 2500000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4500,
    features: ["Private Beach", "Infinity Pool", "Gourmet Kitchen", "Home Theater"],
    images: [
      "https://images.unsplash.com/photo-1568605114967-8e6518baaaef?q=80&w=2070",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070",
      "https://images.unsplash.com/photo-1570129477492-45c003dc7ddb?q=80&w=2070"
    ],
    createdAt: "2023-01-15T14:30:00Z"
  },
  {
    id: "property2",
    title: "Cozy Condo with City View",
    description: "Modern condo in the heart of the city, offering breathtaking views and convenient access to amenities.",
    propertyType: "condo",
    street: "456 Downtown Avenue",
    village: "Susupe",
    island: "Saipan",
    price: 750000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    features: ["Rooftop Terrace", "Fitness Center", "Concierge Service"],
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070",
      "https://images.unsplash.com/photo-1568605114967-8e6518baaaef?q=80&w=2070",
      "https://images.unsplash.com/photo-1570129477492-45c003dc7ddb?q=80&w=2070"
    ],
    createdAt: "2023-02-28T09:00:00Z"
  },
  {
    id: "property3",
    title: "Spacious Family Home",
    description: "Charming family home with a large backyard, perfect for entertaining and creating lasting memories.",
    propertyType: "house",
    street: "789 Suburban Lane",
    village: "San Jose",
    island: "Saipan",
    price: 1200000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    features: ["Large Backyard", "Outdoor Kitchen", "Fireplace", "Garage"],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003dc7ddb?q=80&w=2070",
      "https://images.unsplash.com/photo-1568605114967-8e6518baaaef?q=80&w=2070",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070"
    ],
    createdAt: "2023-03-10T16:45:00Z"
  },
  {
    id: "property4",
    title: "Secluded Island Retreat",
    description: "Escape to your own private paradise with this secluded island retreat, offering tranquility and natural beauty.",
    propertyType: "cabin",
    street: "987 Remote Road",
    village: "Marpi",
    island: "Saipan",
    price: 900000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    features: ["Private Beach", "Hiking Trails", "Ocean View", "Deck"],
    images: [
      "https://images.unsplash.com/photo-1549294413-26f195200c1c?q=80&w=2070",
      "https://images.unsplash.com/photo-1568605114967-8e6518baaaef?q=80&w=2070",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070"
    ],
    createdAt: "2023-04-01T11:20:00Z"
  },
  {
    id: "property5",
    title: "Modern Townhouse",
    description: "Stylish townhouse with high-end finishes and a convenient location near shopping and dining.",
    propertyType: "townhouse",
    street: "654 Urban Street",
    village: "Chalan Kanoa",
    island: "Saipan",
    price: 800000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1900,
    features: ["Modern Kitchen", "Balcony", "Garage", "Walkable"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070",
      "https://images.unsplash.com/photo-1568605114967-8e6518baaaef?q=80&w=2070",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070"
    ],
    createdAt: "2023-05-05T13:55:00Z"
  },
  {
    id: "property6",
    title: "Beachfront Bungalow",
    description: "Quaint bungalow located right on the beach, offering stunning sunsets and a relaxed island lifestyle.",
    propertyType: "bungalow",
    street: "321 Beachfront Avenue",
    village: "Oleai",
    island: "Saipan",
    price: 650000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1000,
    features: ["Beach Access", "Outdoor Shower", "Hammock", "Grill"],
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073",
      "https://images.unsplash.com/photo-1568605114967-8e6518baaaef?q=80&w=2070",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070"
    ],
    createdAt: "2023-06-12T10:30:00Z"
  },
  {
    id: "property7",
    title: "Hilltop Estate with Infinity Pool",
    description: "Luxurious estate perched on a hilltop, boasting an infinity pool, panoramic views, and ultimate privacy.",
    propertyType: "estate",
    street: "159 Vista Drive",
    village: "Capitol Hill",
    island: "Saipan",
    price: 3500000,
    bedrooms: 6,
    bathrooms: 5,
    sqft: 6000,
    features: ["Infinity Pool", "Gourmet Kitchen", "Home Theater", "Wine Cellar"],
    images: [
      "https://images.unsplash.com/photo-1582268611958-eb06e7b3a665?q=80&w=2070",
      "https://images.unsplash.com/photo-1568605114967-8e6518baaaef?q=80&w=2070",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070"
    ],
    createdAt: "2023-07-20T15:10:00Z"
  },
  {
    id: "property8",
    title: "Renovated Historic Home",
    description: "Beautifully renovated historic home with modern amenities, while preserving its original charm and character.",
    propertyType: "house",
    street: "753 Heritage Road",
    village: "Susupe",
    island: "Saipan",
    price: 1100000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    features: ["Original Hardwood Floors", "Modern Kitchen", "Fireplace", "Garden"],
    images: [
      "https://images.unsplash.com/photo-1556911220-37790f14f081?q=80&w=2070",
      "https://images.unsplash.com/photo-1568605114967-8e6518baaaef?q=80&w=2070",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070"
    ],
    createdAt: "2023-08-01T08:45:00Z"
  },
  {
    id: "property9",
    title: "Waterfront Penthouse",
    description: "Exclusive penthouse with stunning waterfront views, private balcony, and access to luxury amenities.",
    propertyType: "penthouse",
    street: "951 Marina Circle",
    village: "Garapan",
    island: "Saipan",
    price: 2900000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3200,
    features: ["Private Balcony", "Waterfront View", "Concierge Service", "Fitness Center"],
    images: [
      "https://images.unsplash.com/photo-1502672260264-ee0ca7c42d16?q=80&w=2070",
      "https://images.unsplash.com/photo-1568605114967-8e6518baaaef?q=80&w=2070",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070"
    ],
    createdAt: "2023-09-18T12:00:00Z"
  },
  {
    id: "property10",
    title: "Cozy Studio Apartment",
    description: "Affordable studio apartment perfect for singles or couples, with a convenient location and essential amenities.",
    propertyType: "apartment",
    street: "369 Economy Street",
    village: "Chalan Kanoa",
    island: "Saipan",
    price: 400000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    features: ["Essential Amenities", "Convenient Location", "Affordable"],
    images: [
      "https://images.unsplash.com/photo-1494200426193-40c93cc90951?q=80&w=2069",
      "https://images.unsplash.com/photo-1568605114967-8e6518baaaef?q=80&w=2070",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070"
    ],
    createdAt: "2023-10-01T14:20:00Z"
  }
];

// Convert the existing mock vehicles to match the VehicleListing type
export const mockVehicles: VehicleListing[] = [
  {
    id: "vehicle1",
    title: "2021 Toyota Tacoma - Low Mileage, Great Condition",
    description: "Well-maintained Tacoma with low mileage and all the features you need for island driving.",
    make: "Toyota",
    model: "Tacoma",
    year: 2021,
    bodyStyle: "Truck",
    transmission: "Automatic",
    condition: "used",
    mileage: 35000,
    price: 28000,
    images: [
      "https://images.unsplash.com/photo-1629132444985-9f0e94179721?q=80&w=2070",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070"
    ],
    features: ["4WD", "Backup Camera", "Bluetooth", "Cruise Control", "Navigation"],
    fuelType: "Gasoline",
    engine: "3.5L V6",
    exteriorColor: "Silver",
    interiorColor: "Black",
    sellerName: "Island Motors",
    sellerLocation: "Garapan, Saipan",
    sellerContact: "(670) 234-5678",
    sellerType: "dealer",
    createdAt: "2023-01-20T11:30:00Z"
  },
  {
    id: "vehicle2",
    title: "2022 Honda Civic - Excellent Fuel Efficiency",
    description: "Like new Civic with low mileage and great fuel economy, perfect for daily commutes.",
    make: "Honda",
    model: "Civic",
    year: 2022,
    bodyStyle: "Sedan",
    transmission: "CVT",
    condition: "used",
    mileage: 15000,
    price: 22000,
    images: [
      "https://images.unsplash.com/photo-1552519507-695e7a44becb?q=80&w=2070",
      "https://images.unsplash.com/photo-1629132444985-9f0e94179721?q=80&w=2070"
    ],
    features: ["Backup Camera", "Bluetooth", "Apple CarPlay", "Android Auto"],
    fuelType: "Gasoline",
    engine: "2.0L I4",
    exteriorColor: "Blue",
    interiorColor: "Gray",
    sellerName: "Pacific Auto",
    sellerLocation: "Susupe, Saipan",
    sellerContact: "(670) 235-6789",
    sellerType: "dealer",
    createdAt: "2023-02-15T09:45:00Z"
  },
  {
    id: "vehicle3",
    title: "2019 Jeep Wrangler - Off-Road Ready",
    description: "Ready for adventure, this Wrangler is equipped with 4x4 and off-road tires.",
    make: "Jeep",
    model: "Wrangler",
    year: 2019,
    bodyStyle: "SUV",
    transmission: "Automatic",
    condition: "used",
    mileage: 60000,
    price: 25000,
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070",
      "https://images.unsplash.com/photo-1552519507-695e7a44becb?q=80&w=2070"
    ],
    features: ["4WD", "Off-Road Tires", "Bluetooth", "Tow Package"],
    fuelType: "Gasoline",
    engine: "3.6L V6",
    exteriorColor: "Red",
    interiorColor: "Black",
    sellerName: "Mariana Adventures",
    sellerLocation: "San Jose, Saipan",
    sellerContact: "(670) 287-9012",
    sellerType: "dealer",
    createdAt: "2023-03-01T14:20:00Z"
  },
  {
    id: "vehicle4",
    title: "2020 Nissan Titan - Powerful and Reliable",
    description: "This Titan is ready to work, with a powerful engine and plenty of towing capacity.",
    make: "Nissan",
    model: "Titan",
    year: 2020,
    bodyStyle: "Truck",
    transmission: "Automatic",
    condition: "used",
    mileage: 42000,
    price: 27000,
    images: [
      "https://images.unsplash.com/photo-1617596703591-59f670697296?q=80&w=2070",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070"
    ],
    features: ["4WD", "Tow Package", "Bluetooth", "Bed Liner"],
    fuelType: "Gasoline",
    engine: "5.6L V8",
    exteriorColor: "White",
    interiorColor: "Gray",
    sellerName: "Truck Town",
    sellerLocation: "Marpi, Saipan",
    sellerContact: "(670) 322-1234",
    sellerType: "dealer",
    createdAt: "2023-04-10T10:00:00Z"
  },
  {
    id: "vehicle5",
    title: "2023 Ford Mustang - Sporty and Fun",
    description: "Experience the thrill of driving this sporty Mustang, with a powerful engine and sleek design.",
    make: "Ford",
    model: "Mustang",
    year: 2023,
    bodyStyle: "Coupe",
    transmission: "Automatic",
    condition: "used",
    mileage: 5000,
    price: 35000,
    images: [
      "https://images.unsplash.com/photo-1629276539448-a8949c56d0a4?q=80&w=2070",
      "https://images.unsplash.com/photo-1617596703591-59f670697296?q=80&w=2070"
    ],
    features: ["Leather Seats", "Bluetooth", "Premium Sound System", "Backup Camera"],
    fuelType: "Gasoline",
    engine: "2.3L I4 Turbo",
    exteriorColor: "Yellow",
    interiorColor: "Black",
    sellerName: "Speed Street Motors",
    sellerLocation: "Chalan Kanoa, Saipan",
    sellerContact: "(670) 233-4567",
    sellerType: "dealer",
    createdAt: "2023-05-15T16:35:00Z"
  },
  {
    id: "vehicle6",
    title: "2022 BMW X5 - Luxury and Performance",
    description: "Enjoy the ultimate driving experience with this luxurious and high-performing BMW X5.",
    make: "BMW",
    model: "X5",
    year: 2022,
    bodyStyle: "SUV",
    transmission: "Automatic",
    condition: "used",
    mileage: 22000,
    price: 45000,
    images: [
      "https://images.unsplash.com/photo-1616421712838-c10b84062304?q=80&w=2070",
      "https://images.unsplash.com/photo-1629276539448-a8949c56d0a4?q=80&w=2070"
    ],
    features: ["Leather Seats", "Navigation", "Sunroof", "Backup Camera", "Bluetooth"],
    fuelType: "Gasoline",
    engine: "3.0L I6 Turbo",
    exteriorColor: "Black",
    interiorColor: "Beige",
    sellerName: "Luxury Lane Autos",
    sellerLocation: "Oleai, Saipan",
    sellerContact: "(670) 234-7890",
    sellerType: "dealer",
    createdAt: "2023-06-01T13:10:00Z"
  },
  {
    id: "vehicle7",
    title: "2021 Mercedes-Benz C-Class - Elegant and Refined",
    description: "Experience luxury and sophistication with this elegant Mercedes-Benz C-Class.",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2021,
    bodyStyle: "Sedan",
    transmission: "Automatic",
    condition: "used",
    mileage: 28000,
    price: 40000,
    images: [
      "https://images.unsplash.com/photo-1580273563764-76bb2ee5cb9d?q=80&w=2070",
      "https://images.unsplash.com/photo-1616421712838-c10b84062304?q=80&w=2070"
    ],
    features: ["Leather Seats", "Navigation", "Sunroof", "Backup Camera", "Bluetooth"],
    fuelType: "Gasoline",
    engine: "2.0L I4 Turbo",
    exteriorColor: "Silver",
    interiorColor: "Black",
    sellerName: "Prestige Plaza Motors",
    sellerLocation: "Capitol Hill, Saipan",
    sellerContact: "(670) 235-8901",
    sellerType: "dealer",
    createdAt: "2023-07-05T11:50:00Z"
  },
  {
    id: "vehicle8",
    title: "2018 Chevrolet Silverado - Reliable Work Truck",
    description: "Get the job done with this reliable and capable Chevrolet Silverado work truck.",
    make: "Chevrolet",
    model: "Silverado",
    year: 2018,
    bodyStyle: "Truck",
    transmission: "Automatic",
    condition: "used",
    mileage: 70000,
    price: 20000,
    images: [
      "https://images.unsplash.com/photo-1551721434-875953579b67?q=80&w=2070",
      "https://images.unsplash.com/photo-1580273563764-76bb2ee5cb9d?q=80&w=2070"
    ],
    features: ["Tow Package", "Bluetooth", "Bed Liner", "Cruise Control"],
    fuelType: "Gasoline",
    engine: "5.3L V8",
    exteriorColor: "Red",
    interiorColor: "Gray",
    sellerName: "Workhorse Way Trucks",
    sellerLocation: "Susupe, Saipan",
    sellerContact: "(670) 287-3456",
    sellerType: "dealer",
    createdAt: "2023-08-20T08:30:00Z"
  },
  {
    id: "vehicle9",
    title: "2023 Tesla Model 3 - Electric and Efficient",
    description: "Experience the future of driving with this electric and efficient Tesla Model 3.",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    bodyStyle: "Sedan",
    transmission: "Automatic",
    condition: "used",
    mileage: 8000,
    price: 48000,
    images: [
      "https://images.unsplash.com/photo-1617583894989-caea5716888e?q=80&w=2070",
      "https://images.unsplash.com/photo-1551721434-875953579b67?q=80&w=2070"
    ],
    features: ["Navigation", "Autopilot", "Premium Sound System", "Backup Camera"],
    fuelType: "Electric",
    engine: "Electric Motor",
    exteriorColor: "White",
    interiorColor: "White",
    sellerName: "Electric Avenue Motors",
    sellerLocation: "Garapan, Saipan",
    sellerContact: "(670) 234-5678",
    sellerType: "dealer",
    createdAt: "2023-09-01T15:05:00Z"
  },
  {
    id: "vehicle10",
    title: "2020 Hyundai Elantra - Affordable and Reliable",
    description: "Get great value with this affordable and reliable Hyundai Elantra sedan.",
    make: "Hyundai",
    model: "Elantra",
    year: 2020,
    bodyStyle: "Sedan",
    transmission: "Automatic",
    condition: "used",
    mileage: 30000,
    price: 18000,
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228d8148?q=80&w=2070",
      "https://images.unsplash.com/photo-1617583894989-caea5716888e?q=80&w=2070"
    ],
    features: ["Bluetooth", "Backup Camera", "Cruise Control", "Apple CarPlay"],
    fuelType: "Gasoline",
    engine: "2.0L I4",
    exteriorColor: "Silver",
    interiorColor: "Black",
    sellerName: "Value Street Autos",
    sellerLocation: "Chalan Kanoa, Saipan",
    sellerContact: "(670) 235-6789",
    sellerType: "dealer",
    createdAt: "2023-10-10T12:40:00Z"
  }
];

// Update the mock food listings to include required fields for FoodListing type
export const mockFoodListings: FoodListing[] = [
  {
    id: "food1",
    name: "Garapan Market",
    description: "A local grocery store offering fresh produce, meats, and imported goods from across Asia and the Pacific.",
    category: "grocery",
    subcategory: "Local Grocery Stores",
    priceRange: "$$",
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000",
    location: {
      address: "456 Beach Road",
      village: "Garapan"
    },
    openingHours: {
      open: "7:00 AM",
      close: "9:00 PM",
      days: "Monday - Sunday"
    },
    contact: {
      phone: "(670) 234-5678",
      email: "contact@garapanmarket.com",
      website: "https://www.garapanmarket.com"
    },
    createdAt: "2023-05-15T08:30:00Z",
    dietaryPreferences: ["Organic & Health-Conscious"]
  },
  {
    id: "food2",
    name: "Island Fresh Supermarket",
    description: "A large supermarket with a wide selection of local and imported groceries, fresh produce, and household items.",
    category: "grocery",
    subcategory: "Supermarket",
    priceRange: "$$",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1000",
    location: {
      address: "123 Middle Road",
      village: "Chalan Kanoa"
    },
    openingHours: {
      open: "6:00 AM",
      close: "10:00 PM",
      days: "Monday - Sunday"
    },
    contact: {
      phone: "(670) 235-6789",
      email: "info@islandfresh.com",
      website: "https://www.islandfresh.com"
    },
    createdAt: "2023-03-10T10:15:00Z",
    dietaryPreferences: ["Organic & Health-Consc
