import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "Hotels & Accommodations",
  "Food & Dining",
  "Local Products",
  "Transportation",
  "Adventure Activities",
  "Shopping",
  "Government Services",
  "Events & Festivals",
  "Properties",
  "Vehicles",
  "Business Services"
];

const subcategories = {
  "Hotels & Accommodations": ["Hotels", "Resorts", "Vacation Rentals", "Hostels"],
  "Food & Dining": ["Restaurants", "Cafes", "Food Trucks", "Bars & Nightlife"],
  "Local Products": ["Handicrafts", "Local Food", "Art & Souvenirs"],
  "Transportation": ["Car Rentals", "Taxis", "Public Transport", "Tour Buses"],
  "Adventure Activities": ["Water Sports", "Hiking", "Cultural Tours", "Fishing"],
  "Shopping": ["Malls", "Local Markets", "Boutiques", "Supermarkets"],
  "Government Services": ["Public Services", "Permits", "Information Centers"],
  "Events & Festivals": ["Cultural Events", "Sports", "Music", "Food Festivals"],
  "Properties": ["For Sale", "For Rent", "Commercial", "Vacation Homes"],
  "Vehicles": ["Cars", "Motorcycles", "Boats", "Commercial Vehicles"],
  "Business Services": ["Professional Services", "Retail", "Manufacturing", "Tourism"]
};

const Advertise = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [desktopAd, setDesktopAd] = useState<File | null>(null);
  const [tabletAd, setTabletAd] = useState<File | null>(null);
  const [mobileAd, setMobileAd] = useState<File | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategories([]);
  };

  const handleSubcategoryToggle = (subcategory: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategory)
        ? prev.filter(s => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleFileUpload = (
    file: File,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (file.type.startsWith('image/')) {
      setter(file);
    } else {
      alert('Please upload an image file');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      category: selectedCategory,
      subcategories: selectedSubcategories,
      startDate,
      endDate,
      desktopAd,
      tabletAd,
      mobileAd
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Advertise with Us</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Selection */}
            {selectedCategory && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Subcategories
                </label>
                <div className="flex flex-wrap gap-2">
                  {subcategories[selectedCategory as keyof typeof subcategories]?.map((subcategory) => (
                    <button
                      key={subcategory}
                      type="button"
                      onClick={() => handleSubcategoryToggle(subcategory)}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm",
                        selectedSubcategories.includes(subcategory)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Date Range Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Ad Upload Sections */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desktop Ad (1920x1080)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], setDesktopAd)}
                        />
                      </label>
                    </div>
                    {desktopAd && (
                      <p className="text-xs text-gray-500">{desktopAd.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tablet Ad (1024x768)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], setTabletAd)}
                        />
                      </label>
                    </div>
                    {tabletAd && (
                      <p className="text-xs text-gray-500">{tabletAd.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Ad (375x667)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], setMobileAd)}
                        />
                      </label>
                    </div>
                    {mobileAd && (
                      <p className="text-xs text-gray-500">{mobileAd.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              Submit Advertisement
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
