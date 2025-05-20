
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import VehicleCard from '../components/VehicleCard';
import BusinessCard from '../components/BusinessCard';
import BlogPost from '../components/BlogPost';
import { mockProperties, mockVehicles, mockBusinesses, mockBlogPosts } from '../utils/mockData';
import { Map, Car, Building, BookOpen, ChevronRight } from 'lucide-react';

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero 
        title="Discover the Northern Mariana Islands"
        subtitle="Your complete directory for properties, vehicles, and local businesses"
        backgroundImage="https://media.istockphoto.com/id/519978553/photo/rota-white-sand.jpg?s=2048x2048&w=is&k=20&c=rnC8WP-QzlXSBApUzVad7WXiWjL4LgVEJY27y9WPLPg="
        size="large"
      />
      
      {/* Main Content */}
      <main>
        {/* Featured Properties Section */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900">Featured Properties</h2>
                <p className="text-gray-600 mt-2">Discover prime real estate throughout the islands</p>
              </div>
              <Link 
                to="/properties" 
                className="hidden md:flex items-center text-gray-900 hover:text-gray-700 transition-all-300"
              >
                <span className="font-medium">View All</span>
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.slice(0, 3).map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link 
                to="/properties" 
                className="btn-primary inline-flex items-center"
              >
                <Map size={16} className="mr-2" />
                <span>Browse All Properties</span>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Vehicles Section */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900">Featured Vehicles</h2>
                <p className="text-gray-600 mt-2">Find your perfect ride for island living</p>
              </div>
              <Link 
                to="/vehicles" 
                className="hidden md:flex items-center text-gray-900 hover:text-gray-700 transition-all-300"
              >
                <span className="font-medium">View All</span>
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVehicles.slice(0, 3).map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link 
                to="/vehicles" 
                className="btn-primary inline-flex items-center"
              >
                <Car size={16} className="mr-2" />
                <span>Browse All Vehicles</span>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Businesses Section */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900">Local Businesses</h2>
                <p className="text-gray-600 mt-2">Support and discover businesses across the islands</p>
              </div>
              <Link 
                to="/businesses" 
                className="hidden md:flex items-center text-gray-900 hover:text-gray-700 transition-all-300"
              >
                <span className="font-medium">View All</span>
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBusinesses.slice(0, 3).map(business => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link 
                to="/businesses" 
                className="btn-primary inline-flex items-center"
              >
                <Building size={16} className="mr-2" />
                <span>Explore All Businesses</span>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Latest Blog Posts Section */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900">Latest Articles</h2>
                <p className="text-gray-600 mt-2">News, tips, and insights about island living</p>
              </div>
              <Link 
                to="/blog" 
                className="hidden md:flex items-center text-gray-900 hover:text-gray-700 transition-all-300"
              >
                <span className="font-medium">View All</span>
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockBlogPosts.slice(0, 3).map(post => (
                <BlogPost key={post.id} post={post} compact={true} />
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link 
                to="/blog" 
                className="btn-primary inline-flex items-center"
              >
                <BookOpen size={16} className="mr-2" />
                <span>Read All Articles</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
