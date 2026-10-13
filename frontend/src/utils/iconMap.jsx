import React from 'react';
import {
  Home,
  Zap,
  Wind,
  Camera,
  Video,
  Scissors,
  PaintBucket,
  Type,
  Headphones,
  Sparkles,
  Star,
  Award,
  CheckCircle,
  TrendingUp,
  UploadCloud,
  MessageSquare,
  Building2,
  Key,
  MapPin,
  Film,
  Play,
  Layers,
  Palette,
  Briefcase,
  Shield,
  Clock,
  Globe,
  Sliders,
  DollarSign,
  HelpCircle,
  Phone
} from 'lucide-react';

export const ICON_MAP = {
  Home,
  Zap,
  Wind,
  Camera,
  Video,
  Scissors,
  PaintBucket,
  Type,
  Headphones,
  Sparkles,
  Star,
  Award,
  CheckCircle,
  TrendingUp,
  UploadCloud,
  MessageSquare,
  Building2,
  Key,
  MapPin,
  Film,
  Play,
  Layers,
  Palette,
  Briefcase,
  Shield,
  Clock,
  Globe,
  Sliders,
  DollarSign,
  HelpCircle,
  Phone
};

export const AVAILABLE_ICON_NAMES = Object.keys(ICON_MAP);

export const DynamicIcon = ({ name, className = 'w-5 h-5', fallback: Fallback = Sparkles }) => {
  if (!name) return <Fallback className={className} />;
  // If name is already a component
  if (typeof name === 'function' || typeof name === 'object') {
    const Component = name;
    return <Component className={className} />;
  }
  const IconComponent = ICON_MAP[name] || Fallback;
  return <IconComponent className={className} />;
};

export default DynamicIcon;
