export type ServiceTheme =
  | "blue"
  | "purple"
  | "orange"
  | "peach"
  | "rose";

export type ServiceTab = {
  id: string;
  label: string;
  introduction: string;
  features: string[];
  image: {
    src: string;
    alt: string;
  };
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    avatar?: string;
  };
};

export type Service = {
  id: string;
  title: string;
  description: string;
  theme?: ServiceTheme;
  tabs: ServiceTab[];
};