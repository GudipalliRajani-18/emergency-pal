
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EmergencyButton } from "@/components/EmergencyButton";
import { FeatureCard } from "@/components/FeatureCard";
import { LocationSharing } from "@/components/LocationSharing";
import { HeartPulse, Navigation, BookOpen, Hospital, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8 flex flex-col">
      <header className="mb-8 text-center">
        <motion.h1 
          className="text-3xl font-semibold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Emergency Resp
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Quick access to emergency help and resources
        </motion.p>
      </header>

      <motion.section 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex justify-center mb-6">
          <EmergencyButton size="large" />
        </div>
        <LocationSharing />
      </motion.section>

      <motion.section 
        className="grid grid-cols-2 gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link to="/first-aid">
          <FeatureCard 
            icon={BookOpen} 
            title="First Aid Guide" 
            iconClassName="bg-blue-50 text-blue-500"
          />
        </Link>
        <Link to="/medical-id">
          <FeatureCard 
            icon={HeartPulse} 
            title="Medical ID" 
            iconClassName="bg-purple-50 text-purple-500"
          />
        </Link>
        <Link to="/nearby">
          <FeatureCard 
            icon={Hospital} 
            title="Nearby Hospitals" 
            iconClassName="bg-green-50 text-green-500"
          />
        </Link>
        <Link to="/alerts">
          <FeatureCard 
            icon={AlertCircle} 
            title="Emergency Alerts" 
            iconClassName="bg-amber-50 text-amber-500"
          />
        </Link>
      </motion.section>

      <motion.footer 
        className="mt-auto pt-4 text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        In case of emergency, dial your local emergency number directly
      </motion.footer>
    </div>
  );
};

export default Index;
