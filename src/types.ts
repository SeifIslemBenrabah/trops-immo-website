export interface Apartment {
  id: string; // e.g. f3, f4, f5, duplex
  type: "F3" | "F4" | "F5" | "F6" | "Duplex";
  name: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  /** Real room-by-room breakdown from the architect's plans, e.g. "Salon 21,99 m²" */
  features: string[];
  /** Real furnished floor-plan render from the architect's plans (image URL, not SVG path data) */
  floorPlanImage: string;
  images: string[];
  priceRange: string;
}

export interface ProgressMilestone {
  date: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  location: string;
  status: "Pre-Launch" | "Under Construction" | "Completed";
  coverImage: string;
  gallery: string[];
  architectureText: string;
  amenitiesText: string;
  /** Construction progress — omit entirely when no verified data exists rather than guessing */
  progress?: number; // 0 to 100
  progressTimeline?: ProgressMilestone[];
  apartments: Apartment[];
  amenitiesList: string[];
}
