import { useParams, Link } from 'react-router-dom';
import { MapPin, Building, Clock, DollarSign, Calendar, Briefcase, ArrowLeft, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { mockJobs } from '@/utils/mockData';

const JobDetails = () => {
  const { id } = useParams();
  const job = mockJobs.find(job => job.id === Number(id));

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-20 md:pt-[0.2rem] pb-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
              <p className="text-gray-600 mb-6">The job listing you're looking for doesn't exist or has been removed.</p>
              <Link to="/jobs">
                <Button>Back to Jobs</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20 md:pt-[0.2rem] pb-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/jobs" className="inline-flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft size={16} className="mr-2" />
              Back to Jobs
            </Link>
          </div>

          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{job.category}</Badge>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-gray-500">
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
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Share2 size={16} />
                </Button>
                <Button variant="outline" size="icon">
                  <Heart size={16} />
                </Button>
                <Button>Apply Now</Button>
              </div>
            </div>
          </div>

          {/* Job Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="text-gray-600 mb-4">{job.description}</p>
                
                <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Company Information</h2>
                <p className="text-gray-600 mb-4">{job.companyDescription}</p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Building size={16} className="mr-2" />
                    {job.company}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    {job.location}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    Posted: {job.postedDate}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase size={16} className="mr-2" />
                    Type: {job.type}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign size={16} className="mr-2" />
                    Salary: {job.salary}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-semibold mb-2">How to Apply</h3>
                  <p className="text-gray-600 mb-2">Email: {job.contactInfo.email}</p>
                  <p className="text-gray-600 mb-2">Phone: {job.contactInfo.phone}</p>
                  <p className="text-gray-600">Website: {job.contactInfo.website}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default JobDetails; 