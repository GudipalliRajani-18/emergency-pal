
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PhoneCall } from "lucide-react";

interface EmergencyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  phoneNumber?: string;
  label?: string;
  size?: "default" | "large";
  variant?: "primary" | "secondary";
}

export function EmergencyButton({
  phoneNumber = "911",
  label = "Emergency Call",
  size = "default",
  variant = "primary",
  className,
  ...props
}: EmergencyButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleCall = () => {
    setIsPressed(true);
    // In a real app, this would trigger the phone call
    window.location.href = `tel:${phoneNumber}`;
    
    // Reset the pressed state after animation completes
    setTimeout(() => {
      setIsPressed(false);
    }, 300);
  };

  return (
    <button
      onClick={handleCall}
      className={cn(
        "relative group flex items-center justify-center gap-2 rounded-full transition-all duration-300 outline-none",
        size === "default" ? "h-14 px-6" : "h-20 px-8",
        variant === "primary" 
          ? "bg-emergency text-emergency-foreground hover:bg-emergency/90 active:bg-emergency/80" 
          : "bg-secondary text-foreground hover:bg-secondary/90 active:bg-secondary/80",
        isPressed ? "scale-95" : "",
        className
      )}
      {...props}
    >
      <div className={cn(
        "absolute inset-0 rounded-full animate-pulse-subtle",
        variant === "primary" ? "bg-emergency/30" : "bg-secondary/50",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      )} />
      
      <PhoneCall className={cn(
        "transition-transform",
        size === "default" ? "w-5 h-5" : "w-7 h-7"
      )} />
      
      <span className={cn(
        "font-medium",
        size === "default" ? "text-base" : "text-lg"
      )}>
        {label}
      </span>
    </button>
  );
}
