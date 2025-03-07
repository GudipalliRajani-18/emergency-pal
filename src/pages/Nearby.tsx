
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, Navigation, Phone, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Facility {
  id: string;
  name: string;
  type: "hospital" | "pharmacy" | "clinic";
  distance: string;
  address: string;
  phone: string;
  rating: number;
  hours: string;
  emergency: boolean;
}

const MOCK_FACILITIES: Facility[] = [
  {
    id: "hosp1",
    name: "General Hospital",
    type: "hospital",
    distance: "1.2 miles",
    address: "123 Main Street, Cityville",
    phone: "555-123-4567",
    rating: 4.5,
    hours: "24 hours",
    emergency: true
  },
  {
    id: "hosp2",
    name: "Community Medical Center",
    type: "hospital",
    distance: "2.5 miles",
    address: "456 Health Avenue, Cityville",
    phone: "555-987-6543",
    rating: 4.2,
    hours: "24 hours",
    emergency: true
  },
  {
    id: "hosp3",
    name: "Riverside Hospital",
    type: "hospital",
    distance: "3.8 miles",
    address: "789 River Road, Cityville",
    phone: "555-234-5678",
    rating: 4.7,
    hours: "24 hours",
    emergency: true
  },
  {
    id: "pharm1",
    name: "24/7 Pharmacy",
    type: "pharmacy",
    distance: "0.8 miles",
    address: "234 Drug Street, Cityville",
    phone: "555-345-6789",
    rating: 4.3,
    hours: "24 hours",
    emergency: false
  },
  {
    id: "pharm2",
    name: "Quick Meds",
    type: "pharmacy",
    distance: "1.5 miles",
    address: "567 Health Lane, Cityville",
    phone: "555-456-7890",
    rating: 4.0,
    hours: "8:00 AM - 10:00 PM",
    emergency: false
  },
  {
    id: "pharm3",
    name: "Community Pharmacy",
    type: "pharmacy",
    distance: "2.1 miles",
    address: "890 Main Street, Cityville",
    phone: "555-567-8901",
    rating: 4.1,
    hours: "8:00 AM - 9:00 PM",
    emergency: false
  },
  {
    id: "clinic1",
    name: "Urgent Care Clinic",
    type: "clinic",
    distance: "1.0 miles",
    address: "345 Care Lane, Cityville",
    phone: "555-678-9012",
    rating: 4.4,
    hours: "7:00 AM - 11:00 PM",
    emergency: true
  },
  {
    id: "clinic2",
    name: "Express Medical Clinic",
    type: "clinic",
    distance: "2.3 miles",
    address: "678 Express Way, Cityville",
    phone: "555-789-0123",
    rating: 4.2,
    hours: "8:00 AM - 8:00 PM",
    emergency: false
  },
];

const Nearby = () => {
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<string>("hospitals");
  
  const findFacilities = () => {
    setLocationStatus('loading');
    
    // In a real app, this would use the user's location to find nearby facilities
    setTimeout(() => {
      setLocationStatus('success');
    }, 1500);
  };
  
  const filteredFacilities = MOCK_FACILITIES.filter(facility => {
    if (activeTab === "all") return true;
    if (activeTab === "hospitals") return facility.type === "hospital";
    if (activeTab === "pharmacies") return facility.type === "pharmacy";
    if (activeTab === "clinics") return facility.type === "clinic";
    return false;
  });

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8 flex flex-col">
      <header className="mb-6 flex items-center gap-2">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Nearby Medical Facilities</h1>
      </header>

      {locationStatus === 'idle' && (
        <div className="flex flex-col items-center justify-center py-10">
          <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-lg font-medium mb-2">Find nearby hospitals, clinics and pharmacies</h2>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Share your location to discover medical facilities near you
          </p>
          <Button 
            size="lg" 
            className="rounded-full gap-2"
            onClick={findFacilities}
          >
            <Navigation className="h-4 w-4" />
            Find Nearby Facilities
          </Button>
        </div>
      )}

      {locationStatus === 'loading' && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Locating nearby facilities...</p>
        </div>
      )}

      {locationStatus === 'success' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <Tabs defaultValue="hospitals" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
              <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
              <TabsTrigger value="clinics">Clinics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="m-0">
              <FacilityList facilities={filteredFacilities} />
            </TabsContent>
            
            <TabsContent value="hospitals" className="m-0">
              <FacilityList facilities={filteredFacilities} />
            </TabsContent>
            
            <TabsContent value="pharmacies" className="m-0">
              <FacilityList facilities={filteredFacilities} />
            </TabsContent>
            
            <TabsContent value="clinics" className="m-0">
              <FacilityList facilities={filteredFacilities} />
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </div>
  );
};

const FacilityList = ({ facilities }: { facilities: Facility[] }) => {
  return (
    <ScrollArea className="h-[70vh] pr-4">
      <div className="space-y-4">
        {facilities.length > 0 ? (
          facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-sm border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{facility.name}</h3>
                    {facility.emergency && (
                      <span className="bg-emergency-muted text-emergency px-2 py-0.5 rounded-full text-xs font-medium">
                        Emergency
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{facility.distance} • {facility.address}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">{facility.rating}</span>
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-primary">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{facility.phone}</span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{facility.hours}</span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="rounded-full gap-1.5 flex-1" variant="outline">
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </Button>
                <Button size="sm" className="rounded-full gap-1.5 flex-1">
                  <Navigation className="h-3.5 w-3.5" />
                  Directions
                </Button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No facilities found in this category
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Nearby;
