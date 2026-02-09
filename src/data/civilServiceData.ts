export interface CivilServiceData {
  name: string;
  slug: string;
  type: 'Emergency Services' | 'Civil Company' | 'Utility Provider';
  icon: string;
  tagline: string;
  description: string;
  emergencyNumber?: string;
  coverColor: string;
  established: string;
  jurisdiction: string;
  employees: string;
  services: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
    headquarters: string;
  };
  operatingHours: string;
  responseMetrics?: {
    avgResponseTime: string;
    casesHandled: string;
    satisfactionRate: string;
  };
}

export const civilServiceData: Record<string, CivilServiceData> = {
  'ghana-police-service': {
    name: 'Ghana Police Service',
    slug: 'ghana-police-service',
    type: 'Emergency Services',
    icon: 'police',
    tagline: 'Serving with Integrity',
    description: 'The Ghana Police Service is the main law enforcement agency of Ghana. We are committed to protecting life and property, preventing and detecting crime, and maintaining public order and safety throughout the nation.',
    emergencyNumber: '191',
    coverColor: '#1a365d',
    established: '1894',
    jurisdiction: 'Nationwide',
    employees: '35,000+',
    services: [
      'Crime Prevention & Detection',
      'Traffic Management',
      'Community Policing',
      'Criminal Investigations',
      'Cybercrime Unit',
      'Anti-Robbery Squad',
      'Domestic Violence & Victim Support',
      'Public Order Management'
    ],
    contact: {
      phone: '+233 302 773 906',
      email: 'info@police.gov.gh',
      website: 'police.gov.gh',
      headquarters: 'Police Headquarters, Accra'
    },
    operatingHours: '24 Hours / 7 Days',
    responseMetrics: {
      avgResponseTime: '15 mins',
      casesHandled: '50,000+',
      satisfactionRate: '85%'
    }
  },
  'ghana-fire-service': {
    name: 'Ghana National Fire Service',
    slug: 'ghana-fire-service',
    type: 'Emergency Services',
    icon: 'fire',
    tagline: 'Preventing Fire, Saving Lives',
    description: 'The Ghana National Fire Service is responsible for fire prevention and firefighting throughout Ghana. We also handle rescue operations, fire safety education, and emergency response services to protect our communities.',
    emergencyNumber: '192',
    coverColor: '#c53030',
    established: '1963',
    jurisdiction: 'Nationwide',
    employees: '8,000+',
    services: [
      'Fire Prevention & Suppression',
      'Search & Rescue Operations',
      'Fire Safety Inspections',
      'Emergency Medical Response',
      'Hazmat Response',
      'Public Fire Safety Education',
      'Industrial Fire Protection',
      'Marine Firefighting'
    ],
    contact: {
      phone: '+233 302 773 592',
      email: 'info@gnfs.gov.gh',
      website: 'gnfs.gov.gh',
      headquarters: 'National Fire Service HQ, Accra'
    },
    operatingHours: '24 Hours / 7 Days',
    responseMetrics: {
      avgResponseTime: '12 mins',
      casesHandled: '15,000+',
      satisfactionRate: '90%'
    }
  },
  'ghana-national-ambulance-service': {
    name: 'National Ambulance Service',
    slug: 'ghana-national-ambulance-service',
    type: 'Emergency Services',
    icon: 'ambulance',
    tagline: 'Emergency Care When You Need It',
    description: 'The National Ambulance Service provides pre-hospital emergency medical care and transport services across Ghana. Our trained paramedics and EMTs are ready 24/7 to respond to medical emergencies.',
    emergencyNumber: '193',
    coverColor: '#2f855a',
    established: '2004',
    jurisdiction: 'Nationwide',
    employees: '3,500+',
    services: [
      'Emergency Medical Response',
      'Patient Transport',
      'Paramedic Services',
      'First Aid Training',
      'Event Medical Coverage',
      'Inter-facility Transfers',
      'Trauma Care',
      'Community Health Programs'
    ],
    contact: {
      phone: '+233 302 776 611',
      email: 'info@ambulance.gov.gh',
      website: 'ambulance.gov.gh',
      headquarters: 'National Ambulance Service, Accra'
    },
    operatingHours: '24 Hours / 7 Days',
    responseMetrics: {
      avgResponseTime: '18 mins',
      casesHandled: '200,000+',
      satisfactionRate: '88%'
    }
  },
  'ghana-water-company': {
    name: 'Ghana Water Company Ltd',
    slug: 'ghana-water-company',
    type: 'Utility Provider',
    icon: 'water',
    tagline: 'Clean Water for All',
    description: 'Ghana Water Company Limited is responsible for the production and distribution of potable water in urban communities throughout Ghana. We are committed to providing safe, reliable water services to millions of Ghanaians.',
    coverColor: '#2b6cb0',
    established: '1999',
    jurisdiction: 'Urban Areas Nationwide',
    employees: '5,000+',
    services: [
      'Water Production & Treatment',
      'Water Distribution',
      'New Connection Services',
      'Meter Installation & Reading',
      'Pipe Repairs & Maintenance',
      'Water Quality Testing',
      'Customer Service Centers',
      'Corporate Billing'
    ],
    contact: {
      phone: '+233 302 666 781',
      email: 'info@gwcl.com.gh',
      website: 'gwcl.com.gh',
      headquarters: 'GWCL Head Office, Accra'
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    responseMetrics: {
      avgResponseTime: '24 hrs',
      casesHandled: '100,000+',
      satisfactionRate: '78%'
    }
  },
  'electricity-company-of-ghana': {
    name: 'Electricity Company of Ghana',
    slug: 'electricity-company-of-ghana',
    type: 'Utility Provider',
    icon: 'electricity',
    tagline: 'Powering Ghana Forward',
    description: 'The Electricity Company of Ghana (ECG) is the primary electricity distribution company in the southern part of Ghana. We are dedicated to providing reliable and affordable electricity to homes and businesses.',
    coverColor: '#d69e2e',
    established: '1967',
    jurisdiction: 'Southern Ghana',
    employees: '8,500+',
    services: [
      'Electricity Distribution',
      'New Connections',
      'Meter Installation',
      'Prepaid Services',
      'Power Outage Reports',
      'Bill Payments',
      'Energy Efficiency Programs',
      'Commercial & Industrial Services'
    ],
    contact: {
      phone: '+233 302 676 711',
      email: 'customerservice@ecg.com.gh',
      website: 'ecgonline.info',
      headquarters: 'ECG Head Office, Accra'
    },
    operatingHours: '24 Hours Fault Line / Office: 8:00 AM - 5:00 PM',
    responseMetrics: {
      avgResponseTime: '4 hrs',
      casesHandled: '500,000+',
      satisfactionRate: '72%'
    }
  },
  // Local Accra Services
  'ghana-police-service-accra': {
    name: 'Ghana Police Service - Accra Division',
    slug: 'ghana-police-service-accra',
    type: 'Emergency Services',
    icon: 'police',
    tagline: 'Protecting Our Capital',
    description: 'The Accra Division of the Ghana Police Service serves the capital city and surrounding areas. We are committed to maintaining law and order, protecting life and property, and working closely with our community to ensure safety and security for all residents.',
    emergencyNumber: '191',
    coverColor: '#1a365d',
    established: '1894',
    jurisdiction: 'Greater Accra Region',
    employees: '5,000+',
    services: [
      'Emergency Response & Patrol',
      'Crime Investigation',
      'Traffic Management',
      'Community Policing',
      'Victim Support Services',
      'Crime Prevention Education',
      'Anti-Robbery Operations',
      '24/7 Emergency Hotline'
    ],
    contact: {
      phone: '+233 302 773 906',
      email: 'accra@police.gov.gh',
      website: 'police.gov.gh',
      headquarters: 'Accra Central Police Station, Ring Road'
    },
    operatingHours: '24 Hours / 7 Days',
    responseMetrics: {
      avgResponseTime: '12 mins',
      casesHandled: '25,000+',
      satisfactionRate: '87%'
    }
  },
  'ghana-fire-service-accra': {
    name: 'Ghana Fire Service - Accra Station',
    slug: 'ghana-fire-service-accra',
    type: 'Emergency Services',
    icon: 'fire',
    tagline: 'First Responders for Accra',
    description: 'The Accra Fire Station serves the Greater Accra Metropolitan Area with rapid fire response, rescue operations, and fire safety education. Our dedicated team is on standby 24/7 to protect lives and property.',
    emergencyNumber: '192',
    coverColor: '#c53030',
    established: '1963',
    jurisdiction: 'Greater Accra Region',
    employees: '800+',
    services: [
      'Fire Suppression & Control',
      'Emergency Rescue Operations',
      'Fire Safety Inspections',
      'Hazardous Materials Response',
      'Fire Safety Training',
      'Public Education Programs',
      'Industrial Fire Prevention',
      'Event Safety Coverage'
    ],
    contact: {
      phone: '+233 302 773 592',
      email: 'accra@gnfs.gov.gh',
      website: 'gnfs.gov.gh',
      headquarters: 'Central Fire Station, Ring Road, Accra'
    },
    operatingHours: '24 Hours / 7 Days',
    responseMetrics: {
      avgResponseTime: '10 mins',
      casesHandled: '5,000+',
      satisfactionRate: '92%'
    }
  },
  'electricity-company-of-ghana-accra': {
    name: 'Electricity Company of Ghana - Accra',
    slug: 'electricity-company-of-ghana-accra',
    type: 'Utility Provider',
    icon: 'electricity',
    tagline: 'Powering the Capital',
    description: 'ECG Accra District is responsible for electricity distribution in the Greater Accra Region. We serve over 2 million customers with reliable power supply and responsive customer service.',
    coverColor: '#d69e2e',
    established: '1967',
    jurisdiction: 'Greater Accra Region',
    employees: '2,000+',
    services: [
      'Power Distribution',
      'New Service Connections',
      'Prepaid & Postpaid Metering',
      'Fault Reporting & Repairs',
      'Bill Payment Services',
      'Load Management',
      'Energy Audits',
      'Customer Service Centers'
    ],
    contact: {
      phone: '+233 302 676 727',
      email: 'accra@ecg.com.gh',
      website: 'ecgonline.info',
      headquarters: 'ECG Accra District Office, Spintex Road'
    },
    operatingHours: '24 Hours Fault Line / Office: 8:00 AM - 5:00 PM',
    responseMetrics: {
      avgResponseTime: '3 hrs',
      casesHandled: '150,000+',
      satisfactionRate: '75%'
    }
  },
  // Tema Services
  'ghana-police-service-tema': {
    name: 'Ghana Police Service - Tema Division',
    slug: 'ghana-police-service-tema',
    type: 'Emergency Services',
    icon: 'police',
    tagline: 'Securing Ghana\'s Industrial Hub',
    description: 'The Tema Division of the Ghana Police Service serves Tema Metropolitan Area and surrounding communities. We provide comprehensive law enforcement services to protect residents and secure the industrial and port areas.',
    emergencyNumber: '191',
    coverColor: '#1a365d',
    established: '1962',
    jurisdiction: 'Tema Metropolitan Area',
    employees: '1,200+',
    services: [
      'Port Security Operations',
      'Industrial Area Patrol',
      'Crime Investigation',
      'Traffic Management',
      'Community Policing',
      'Maritime Crime Prevention',
      'Emergency Response',
      'Cargo Theft Prevention'
    ],
    contact: {
      phone: '+233 303 202 416',
      email: 'tema@police.gov.gh',
      website: 'police.gov.gh',
      headquarters: 'Tema Police Headquarters, Community 1'
    },
    operatingHours: '24 Hours / 7 Days',
    responseMetrics: {
      avgResponseTime: '10 mins',
      casesHandled: '8,000+',
      satisfactionRate: '86%'
    }
  },
  'ghana-fire-service-tema': {
    name: 'Ghana Fire Service - Tema Station',
    slug: 'ghana-fire-service-tema',
    type: 'Emergency Services',
    icon: 'fire',
    tagline: 'Industrial & Marine Firefighting Specialists',
    description: 'Tema Fire Station is specially equipped to handle industrial fires, port emergencies, and residential fires. Our team is trained in hazardous materials response and marine firefighting operations.',
    emergencyNumber: '192',
    coverColor: '#c53030',
    established: '1962',
    jurisdiction: 'Tema Metropolitan Area',
    employees: '250+',
    services: [
      'Industrial Fire Response',
      'Marine Firefighting',
      'Hazmat Operations',
      'Port Emergency Response',
      'Fire Safety Inspections',
      'Rescue Operations',
      'Fire Prevention Training',
      'Chemical Fire Control'
    ],
    contact: {
      phone: '+233 303 202 888',
      email: 'tema@gnfs.gov.gh',
      website: 'gnfs.gov.gh',
      headquarters: 'Tema Fire Station, Community 1'
    },
    operatingHours: '24 Hours / 7 Days',
    responseMetrics: {
      avgResponseTime: '8 mins',
      casesHandled: '2,500+',
      satisfactionRate: '91%'
    }
  },
  'electricity-company-of-ghana-tema': {
    name: 'Electricity Company of Ghana - Tema',
    slug: 'electricity-company-of-ghana-tema',
    type: 'Utility Provider',
    icon: 'electricity',
    tagline: 'Powering Industry and Community',
    description: 'ECG Tema District serves the industrial and residential areas of Tema. We provide specialized power supply solutions for industrial clients while ensuring reliable service to residential customers.',
    coverColor: '#d69e2e',
    established: '1967',
    jurisdiction: 'Tema Metropolitan Area',
    employees: '500+',
    services: [
      'Industrial Power Supply',
      'Residential Power Distribution',
      'Port Power Infrastructure',
      'Heavy Duty Connections',
      'Load Management',
      'Emergency Fault Response',
      'Meter Services',
      'Energy Consultation'
    ],
    contact: {
      phone: '+233 303 206 900',
      email: 'tema@ecg.com.gh',
      website: 'ecgonline.info',
      headquarters: 'ECG Tema Office, Community 1'
    },
    operatingHours: '24 Hours Fault Line / Office: 8:00 AM - 5:00 PM',
    responseMetrics: {
      avgResponseTime: '2 hrs',
      casesHandled: '45,000+',
      satisfactionRate: '77%'
    }
  },
  // Kumasi Services
  'ghana-police-service-kumasi': {
    name: 'Ghana Police Service - Kumasi Division',
    slug: 'ghana-police-service-kumasi',
    type: 'Emergency Services',
    icon: 'police',
    tagline: 'Securing the Garden City',
    description: 'The Kumasi Division of the Ghana Police Service serves the Ashanti Region\'s capital and surrounding areas. We are committed to maintaining peace and security in Ghana\'s second-largest city.',
    emergencyNumber: '191',
    coverColor: '#1a365d',
    established: '1902',
    jurisdiction: 'Kumasi Metropolitan Area',
    employees: '3,500+',
    services: [
      'Metro Patrol Operations',
      'Market Security',
      'Crime Investigation',
      'Traffic Management',
      'Community Policing',
      'Criminal Intelligence',
      'Emergency Response',
      'Tourism Safety'
    ],
    contact: {
      phone: '+233 322 022 222',
      email: 'kumasi@police.gov.gh',
      website: 'police.gov.gh',
      headquarters: 'Kumasi Central Police Station, Adum'
    },
    operatingHours: '24 Hours / 7 Days',
    responseMetrics: {
      avgResponseTime: '14 mins',
      casesHandled: '18,000+',
      satisfactionRate: '84%'
    }
  },
  'ghana-fire-service-kumasi': {
    name: 'Ghana Fire Service - Kumasi Station',
    slug: 'ghana-fire-service-kumasi',
    type: 'Emergency Services',
    icon: 'fire',
    tagline: 'Protecting the Ashanti Kingdom',
    description: 'Kumasi Fire Station serves the Garden City with rapid fire response and rescue services. We specialize in market fires, residential emergencies, and cultural heritage protection.',
    emergencyNumber: '192',
    coverColor: '#c53030',
    established: '1952',
    jurisdiction: 'Kumasi Metropolitan Area',
    employees: '600+',
    services: [
      'Fire Suppression',
      'Market Fire Response',
      'Rescue Operations',
      'Fire Safety Education',
      'Heritage Site Protection',
      'Hazmat Response',
      'Building Inspections',
      'Community Fire Drills'
    ],
    contact: {
      phone: '+233 322 024 192',
      email: 'kumasi@gnfs.gov.gh',
      website: 'gnfs.gov.gh',
      headquarters: 'Kumasi Central Fire Station, Adum'
    },
    operatingHours: '24 Hours / 7 Days',
    responseMetrics: {
      avgResponseTime: '11 mins',
      casesHandled: '4,000+',
      satisfactionRate: '89%'
    }
  },
  'electricity-company-of-ghana-kumasi': {
    name: 'Electricity Company of Ghana - Kumasi',
    slug: 'electricity-company-of-ghana-kumasi',
    type: 'Utility Provider',
    icon: 'electricity',
    tagline: 'Energizing the Ashanti Region',
    description: 'ECG Kumasi District provides electricity distribution services to Kumasi and surrounding communities. We serve residential, commercial, and industrial customers with reliable power supply.',
    coverColor: '#d69e2e',
    established: '1967',
    jurisdiction: 'Kumasi Metropolitan Area',
    employees: '800+',
    services: [
      'Power Distribution',
      'New Connections',
      'Meter Installation',
      'Fault Repairs',
      'Bill Payment Centers',
      'Load Shedding Management',
      'Commercial Services',
      'Prepaid Meter Services'
    ],
    contact: {
      phone: '+233 322 027 111',
      email: 'kumasi@ecg.com.gh',
      website: 'ecgonline.info',
      headquarters: 'ECG Kumasi Office, Adum'
    },
    operatingHours: '24 Hours Fault Line / Office: 8:00 AM - 5:00 PM',
    responseMetrics: {
      avgResponseTime: '4 hrs',
      casesHandled: '80,000+',
      satisfactionRate: '73%'
    }
  },
  'ghana-police-service-accra-division': {
    name: 'Ghana Police Service - Accra Division',
    slug: 'ghana-police-service-accra-division',
    type: 'Emergency Services',
    icon: 'police',
    tagline: 'Serving Accra with Integrity',
    description: 'The Accra Division of the Ghana Police Service is responsible for maintaining law and order in the Greater Accra Metropolitan Area. We are committed to community policing, crime prevention, and ensuring the safety of all residents and visitors in Accra.',
    emergencyNumber: '191',
    coverColor: '#1a365d',
    established: '1894',
    jurisdiction: 'Greater Accra Metropolitan Area',
    employees: '5,000+',
    services: [
      'Crime Prevention & Detection',
      'Traffic Management',
      'Community Policing',
      'Criminal Investigations',
      'Cybercrime Unit',
      'Anti-Robbery Squad',
      'Domestic Violence & Victim Support',
      'Public Order Management'
    ],
    contact: {
      phone: '+233 302 773 900',
      email: 'accra@police.gov.gh',
      website: 'police.gov.gh',
      headquarters: 'Accra Regional Police Command, Ring Road'
    },
    operatingHours: '24 Hours / 7 Days',
    responseMetrics: {
      avgResponseTime: '12 mins',
      casesHandled: '25,000+',
      satisfactionRate: '82%'
    }
  },
  'ghana-fire-service-accra-station': {
    name: 'Ghana Fire Service - Accra Station',
    slug: 'ghana-fire-service-accra-station',
    type: 'Emergency Services',
    icon: 'fire',
    tagline: 'Protecting Accra from Fire',
    description: 'The Accra Station of the Ghana National Fire Service provides fire prevention, firefighting, and rescue services to the Greater Accra area. Our trained firefighters respond to emergencies 24/7 to protect lives and property in the capital city.',
    emergencyNumber: '192',
    coverColor: '#c53030',
    established: '1963',
    jurisdiction: 'Greater Accra Metropolitan Area',
    employees: '1,200+',
    services: [
      'Fire Prevention & Suppression',
      'Search & Rescue Operations',
      'Fire Safety Inspections',
      'Emergency Medical Response',
      'Hazmat Response',
      'Public Fire Safety Education',
      'Industrial Fire Protection',
      'High-Rise Building Response'
    ],
    contact: {
      phone: '+233 302 772 446',
      email: 'accra@gnfs.gov.gh',
      website: 'gnfs.gov.gh',
      headquarters: 'Accra Central Fire Station, Ministries'
    },
    operatingHours: '24 Hours / 7 Days',
    responseMetrics: {
      avgResponseTime: '10 mins',
      casesHandled: '8,000+',
      satisfactionRate: '91%'
    }
  }
};
