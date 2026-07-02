import * as LucideIcons from "lucide-react";

// Curated list of commonly used icons in the CMS for easy selection
export const AVAILABLE_ICONS = [
  "TrendingUp",
  "Target",
  "Share2",
  "Camera",
  "Video",
  "Package",
  "Code2",
  "Search",
  "MousePointerClick",
  "Megaphone",
  "BarChart3",
  "PenTool",
  "Palette",
  "Users",
  "Mail",
  "Building2",
  "Sparkles",
  "Star",
  "UtensilsCrossed",
  "Stethoscope",
  "Building",
  "GraduationCap",
  "Car",
  "Hotel",
  "Palmtree",
  "Shirt",
  "Gem",
  "HardHat",
  "Dumbbell",
  "ShoppingBag",
  "Briefcase",
  "Landmark",
  "Rocket",
  "Store",
  "User",
  "MapPin",
  "Phone",
  "Layers",
  "Compass",
  "Eye",
  "Activity",
  "Play"
] as const;

export type LucideIconName = keyof typeof LucideIcons | string;

interface IconRendererProps {
  name: LucideIconName;
  className?: string;
  size?: number;
}

export function IconRenderer({ name, className, size }: IconRendererProps) {
  // Resolve icon component dynamically from lucide-react
  const IconComponent = (LucideIcons as any)[name];
  
  if (!IconComponent) {
    // Default fallback icon
    return <LucideIcons.Sparkles className={className} size={size} />;
  }
  
  return <IconComponent className={className} size={size} />;
}
