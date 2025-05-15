
export interface GovernmentService {
  id: string;
  title: string;
  description: string;
  image: string;
  address: string;
  hours: string;
  phone: string;
  website: string;
  category: string;
  featured: boolean;
}

export interface ServiceCategory {
  name: string;
  icon: JSX.Element;
}

export interface FilterGroup {
  name: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

export interface FilterOption {
  label: string;
  value: string;
}
