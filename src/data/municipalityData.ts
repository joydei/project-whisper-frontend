export interface MunicipalityData {
  name: string;
  slug: string;
  region: string;
  description: string;
  coverImage?: string;
  logo?: string;
  established: string;
  population: string;
  area: string;
  services: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  socialMedia?: {
    twitter?: string;
    facebook?: string;
  };
  operatingHours: string;
}

export const municipalityData: Record<string, MunicipalityData> = {
  'accra-metropolitan-assembly': {
    name: 'Accra Metropolitan Assembly',
    slug: 'accra-metropolitan-assembly',
    region: 'Greater Accra Region',
    description: 'The Accra Metropolitan Assembly is the political and administrative authority of the city of Accra, the capital and largest city of Ghana. We are committed to providing excellent public services and infrastructure development to improve the quality of life for all residents.',
    established: '1988',
    population: '2.5 million+',
    area: '139.674 km²',
    services: [
      'Road & Infrastructure Development',
      'Waste Management & Sanitation',
      'Building Permits & Planning',
      'Business Registration',
      'Public Health Services',
      'Education Support',
      'Street Lighting Maintenance',
      'Drainage & Flood Control'
    ],
    contact: {
      phone: '+233 302 123 456',
      email: 'info@ama.gov.gh',
      website: 'www.ama.gov.gh',
      address: 'P.O. Box GP 385, Accra'
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM'
  },
  'tema-metropolitan-assembly': {
    name: 'Tema Metropolitan Assembly',
    slug: 'tema-metropolitan-assembly',
    region: 'Greater Accra Region',
    description: 'The Tema Metropolitan Assembly serves as the administrative hub for Tema and its surrounding communities. As Ghana\'s major industrial city and port, we focus on sustainable urban development while maintaining our industrial heritage.',
    established: '1990',
    population: '400,000+',
    area: '87.8 km²',
    services: [
      'Industrial Zone Management',
      'Port Area Development',
      'Waste Collection Services',
      'Road Maintenance',
      'Building & Construction Permits',
      'Environmental Protection',
      'Community Development',
      'Public Safety'
    ],
    contact: {
      phone: '+233 303 456 789',
      email: 'info@tema.gov.gh',
      website: 'www.tema.gov.gh',
      address: 'Community 1, Tema'
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM'
  },
  'kumasi-metropolitan-assembly': {
    name: 'Kumasi Metropolitan Assembly',
    slug: 'kumasi-metropolitan-assembly',
    region: 'Ashanti Region',
    description: 'The Kumasi Metropolitan Assembly governs the Garden City of West Africa. As the cultural heart of the Ashanti Kingdom, we blend traditional values with modern urban development to serve our vibrant community.',
    established: '1989',
    population: '3.3 million+',
    area: '214.3 km²',
    services: [
      'Urban Planning & Development',
      'Market Management',
      'Sanitation Services',
      'Cultural Heritage Preservation',
      'Roads & Transportation',
      'Public Health',
      'Education Programs',
      'Revenue Collection'
    ],
    contact: {
      phone: '+233 322 789 012',
      email: 'info@kma.gov.gh',
      website: 'www.kma.gov.gh',
      address: 'Adum, Kumasi'
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM'
  }
};
