
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  onClick, 
  className,
  iconClassName
}: FeatureCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "neo-morphism rounded-2xl p-5 transition-all duration-300",
        "hover:shadow-[0px_4px_16px_rgba(0,0,0,0.08),0px_20px_25px_-5px_rgba(0,0,0,0.08)]",
        "active:scale-[0.98] cursor-pointer",
        "flex flex-col items-center justify-center gap-3 text-center",
        className
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-full flex items-center justify-center bg-secondary",
        iconClassName
      )}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-medium text-base">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
