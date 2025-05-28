import { useState } from 'react';
import { MapPin, Building, Briefcase, Clock, DollarSign, Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

// Mock data for job listings
const mockJobs = [
  {
    id: 1,
    title: "Hotel Front Desk Manager",
    company: "Fiesta Resort & Spa",
    location: "Garapan, Saipan",
    type: "Full-time",
    salary: "$35,000 - $45,000",
    description: "Oversee front desk operations, manage staff, and ensure excellent guest service. Experience in hospitality management required.",
    requirements: ["5+ years hotel experience", "Management experience", "Excellent communication skills"],
    postedDate: "2 days ago",
    category: "Hospitality",
    benefits: [
      "Health insurance",
      "Paid time off",
      "Employee discounts",
      "Professional development opportunities"
    ],
    responsibilities: [
      "Manage front desk staff and operations",
      "Handle guest complaints and requests",
      "Ensure high-quality customer service",
      "Coordinate with other departments",
      "Maintain accurate records and reports"
    ],
    companyDescription: "Fiesta Resort & Spa is a premier luxury resort located in Garapan, Saipan. We pride ourselves on providing exceptional service and creating memorable experiences for our guests.",
    contactInfo: {
      email: "careers@fiestaresort.com",
      phone: "+1 (670) 234-5678",
      website: "www.fiestaresort.com"
    }
  },
  {
    id: 2,
    title: "Tour Guide",
    company: "Island Adventures",
    location: "Saipan",
    type: "Part-time",
    salary: "$15 - $20/hour",
    description: "Lead guided tours of historical sites and natural attractions. Share knowledge of local history and culture.",
    requirements: ["Tour guide certification", "Knowledge of local history", "Fluent in English"],
    postedDate: "1 day ago",
    category: "Tourism",
    benefits: [
      "Flexible schedule",
      "Training provided",
      "Commission opportunities",
      "Outdoor work environment"
    ],
    responsibilities: [
      "Lead guided tours of historical sites",
      "Share knowledge of local history and culture",
      "Ensure guest safety and satisfaction",
      "Maintain tour equipment and supplies",
      "Handle tour bookings and logistics"
    ],
    companyDescription: "Island Adventures is a leading tour operator in Saipan, specializing in cultural and historical tours. We're passionate about sharing the rich heritage of the Northern Mariana Islands with visitors.",
    contactInfo: {
      email: "jobs@islandadventures.com",
      phone: "+1 (670) 234-5679",
      website: "www.islandadventures.com"
    }
  },
  {
    id: 3,
    title: "Restaurant Chef",
    company: "Pacific Fusion",
    location: "Garapan, Saipan",
    type: "Full-time",
    salary: "$40,000 - $50,000",
    description: "Create and execute menu items, manage kitchen staff, and maintain food quality standards.",
    requirements: ["Culinary degree", "5+ years experience", "Menu development experience"],
    postedDate: "3 days ago",
    category: "Food & Beverage"
  },
  {
    id: 4,
    title: "Construction Project Manager",
    company: "Island Builders Inc.",
    location: "Saipan",
    type: "Full-time",
    salary: "$60,000 - $80,000",
    description: "Manage construction projects, coordinate with contractors, and ensure project completion on time and budget.",
    requirements: ["Construction management degree", "10+ years experience", "Project management certification"],
    postedDate: "1 week ago",
    category: "Construction"
  },
  {
    id: 5,
    title: "Dive Instructor",
    company: "Marianas Dive Center",
    location: "Saipan",
    type: "Full-time",
    salary: "$30,000 - $40,000",
    description: "Lead diving tours, teach diving courses, and ensure safety of all diving activities.",
    requirements: ["PADI Instructor certification", "First aid certification", "2+ years experience"],
    postedDate: "2 days ago",
    category: "Tourism"
  },
  {
    id: 6,
    title: "IT Support Specialist",
    company: "Pacific Tech Solutions",
    location: "Saipan",
    type: "Full-time",
    salary: "$45,000 - $55,000",
    description: "Provide technical support, maintain network infrastructure, and implement IT solutions.",
    requirements: ["IT degree or certification", "3+ years experience", "Network administration skills"],
    postedDate: "4 days ago",
    category: "Technology"
  },
  {
    id: 7,
    title: "Retail Store Manager",
    company: "Island Fashion",
    location: "Garapan, Saipan",
    type: "Full-time",
    salary: "$35,000 - $45,000",
    description: "Manage daily store operations, lead sales team, and achieve sales targets.",
    requirements: ["Retail management experience", "Sales background", "Team leadership skills"],
    postedDate: "5 days ago",
    category: "Retail"
  },
  {
    id: 8,
    title: "Environmental Specialist",
    company: "CNMI Environmental Services",
    location: "Saipan",
    type: "Full-time",
    salary: "$50,000 - $65,000",
    description: "Monitor environmental impact, develop conservation programs, and ensure compliance with regulations.",
    requirements: ["Environmental science degree", "3+ years experience", "Knowledge of local ecosystems"],
    postedDate: "1 week ago",
    category: "Environmental"
  }
];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Filter jobs based on search query and filters
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesType = selectedType === 'All' || job.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  // Get unique categories and job types for filters
  const categories = ['All', ...new Set(mockJobs.map(job => job.category))];
  const jobTypes = ['All', ...new Set(mockJobs.map(job => job.type))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20 md:pt-[0.2rem] pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Your Next Opportunity</h1>
            <p className="text-gray-600">Discover jobs across Saipan, Tinian, and Rota</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Search jobs, companies, or keywords"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  className="px-3 py-2 border rounded-md bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  className="px-3 py-2 border rounded-md bg-white"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="grid gap-6">
            {filteredJobs.map(job => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{job.category}</Badge>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                      <p className="text-gray-600 mb-2">{job.company}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          {job.postedDate}
                        </div>
                        <div className="flex items-center">
                          <DollarSign size={16} className="mr-1" />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link to={`/jobs/${job.id}`}>
                        <Button>View Details</Button>
                      </Link>
                      <Button variant="outline">Save Job</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>

    </div>
  );
};

export default Jobs; 