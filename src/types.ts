export type TypologyFilter = 'all' | 'garden' | 'ocean' | 'penthouse' | 'estate';

export interface Residence {
  id: string;
  name: string;
  category: 'garden' | 'ocean' | 'penthouse' | 'estate';
  categoryLabel: string;
  badge: string;
  dimensions: string;
  suites: string;
  bathrooms: string;
  feature: string;
  featureLabel: string;
  price: string;
  image: string;
  imageAlt: string;
  coveredArea: string;
  terraceArea: string;
  level: string;
  orientation: string;
  parking: string;
  storage: string;
  description: string;
  highlights: string[];
  blueprintImg: string;
}

export interface Amenity {
  id: string;
  category: string;
  title: string;
  description: string;
  iconName: string;
  actionLabel: string;
  extendedDescription: string;
  hours: string;
  serviceType: string;
  image: string;
}

export interface LocationPoint {
  id: string;
  badge: string;
  title: string;
  desc: string;
  travelTime: string;
  icon: string;
  coords: { x: number; y: number };
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  typology: string;
  preferredDate: string;
  modality: 'showroom' | 'helicopter' | 'virtual';
  notes: string;
  acceptedConfidentiality: boolean;
}

export interface ResidenceFinancialData {
  id: string;
  name: string;
  categoryLabel: string;
  priceUSD: number;
  deliveryMonths: number;
}

export interface StatItem {
  value: string;
  title: string;
  subtitle: string;
}

