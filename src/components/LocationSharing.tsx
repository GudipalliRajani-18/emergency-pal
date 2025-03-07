
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigation, Loader2, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationSharingProps {
  className?: string;
}

export function LocationSharing({ className }: LocationSharingProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [position, setPosition] = useState<{lat: number, lng: number} | null>(null);

  const shareLocation = () => {
    setStatus('loading');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, this would send the location to emergency contacts
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setStatus('success');
        },
        (error) => {
          console.error("Error getting location:", error);
          setStatus('error');
        }
      );
    } else {
      setStatus('error');
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <Button 
        variant="outline" 
        size="lg"
        className="gap-2 w-full max-w-md h-12 rounded-full" 
        onClick={shareLocation}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sharing location...</span>
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Location shared</span>
          </>
        ) : status === 'error' ? (
          <>
            <XCircle className="w-4 h-4 text-red-500" />
            <span>Failed to share location</span>
          </>
        ) : (
          <>
            <Navigation className="w-4 h-4" />
            <span>Share my location</span>
          </>
        )}
      </Button>
      
      {status === 'success' && position && (
        <div className="text-xs text-muted-foreground animate-fade-in">
          Location: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
        </div>
      )}
    </div>
  );
}
