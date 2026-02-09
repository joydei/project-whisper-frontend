export interface MinistryData {
  name: string;
  slug: string;
  abbreviation: string;
  minister?: string;
  tagline: string;
  description: string;
  coverColor: string;
  icon: string;
  established: string;
  jurisdiction: 'National';
  employees: string;
  departments: string[];
  services: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
    headquarters: string;
  };
  operatingHours: string;
  keyInitiatives?: string[];
}

export const ministryData: Record<string, MinistryData> = {
  'ministry-of-finance': {
    name: 'Ministry of Finance',
    slug: 'ministry-of-finance',
    abbreviation: 'MoF',
    minister: 'Hon. Ken Ofori-Atta',
    tagline: 'Fiscal Responsibility for National Development',
    description: 'The Ministry of Finance is the government ministry responsible for economic planning, financial policy formulation, and the management of public finances in Ghana. We ensure fiscal discipline, revenue mobilization, and prudent expenditure management.',
    coverColor: '#1a5f2a',
    icon: 'finance',
    established: '1957',
    jurisdiction: 'National',
    employees: '2,500+',
    departments: [
      'Budget Division',
      'Economic Research & Forecasting',
      'Debt Management',
      'Public Investment',
      'Revenue Policy',
      'Financial Sector Division'
    ],
    services: [
      'National Budget Preparation',
      'Economic Policy Formulation',
      'Public Debt Management',
      'Revenue Mobilization',
      'Fiscal Policy Implementation',
      'Financial Sector Regulation',
      'International Financial Relations',
      'Public Investment Management'
    ],
    contact: {
      phone: '+233 302 747 197',
      email: 'info@mofep.gov.gh',
      website: 'mofep.gov.gh',
      headquarters: 'Ministry of Finance Building, Accra'
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    keyInitiatives: [
      'Ghana Beyond Aid',
      'E-Levy Implementation',
      'IMF Programme Compliance',
      'Debt Restructuring'
    ]
  },
  'ministry-of-health': {
    name: 'Ministry of Health',
    slug: 'ministry-of-health',
    abbreviation: 'MoH',
    minister: 'Hon. Kwaku Agyeman-Manu',
    tagline: 'Health for All Ghanaians',
    description: 'The Ministry of Health is responsible for the overall health sector policy formulation, monitoring, evaluation, and coordination of health services delivery in Ghana. We strive to ensure accessible, quality healthcare for all citizens.',
    coverColor: '#0d7377',
    icon: 'health',
    established: '1957',
    jurisdiction: 'National',
    employees: '120,000+',
    departments: [
      'Ghana Health Service',
      'Food and Drugs Authority',
      'National Health Insurance Authority',
      'Teaching Hospitals',
      'Pharmacy Council',
      'Medical and Dental Council'
    ],
    services: [
      'Healthcare Policy Development',
      'Disease Prevention & Control',
      'Health Insurance Coordination',
      'Medical Facilities Regulation',
      'Drug & Food Safety',
      'Health Worker Training',
      'Public Health Education',
      'Emergency Health Response'
    ],
    contact: {
      phone: '+233 302 684 709',
      email: 'info@moh.gov.gh',
      website: 'moh.gov.gh',
      headquarters: 'Ministry of Health, Accra'
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    keyInitiatives: [
      'Agenda 111 Hospital Project',
      'Universal Health Coverage',
      'COVID-19 Response',
      'Mental Health Reform'
    ]
  },
  'ministry-of-education': {
    name: 'Ministry of Education',
    slug: 'ministry-of-education',
    abbreviation: 'MoE',
    minister: 'Hon. Dr. Yaw Osei Adutwum',
    tagline: 'Quality Education for All',
    description: 'The Ministry of Education is responsible for education policy, planning, and implementation across all levels of education in Ghana. We are committed to providing quality, accessible education to develop human capital for national development.',
    coverColor: '#2d3748',
    icon: 'education',
    established: '1957',
    jurisdiction: 'National',
    employees: '350,000+',
    departments: [
      'Ghana Education Service',
      'National Council for Curriculum & Assessment',
      'National Teaching Council',
      'National Inspectorate Board',
      'Pre-Tertiary Education',
      'Tertiary Education'
    ],
    services: [
      'Curriculum Development',
      'Teacher Training & Certification',
      'School Infrastructure Development',
      'Educational Standards & Assessment',
      'Scholarship Administration',
      'Technical & Vocational Education',
      'Special Education Services',
      'Educational Research'
    ],
    contact: {
      phone: '+233 302 683 668',
      email: 'info@moe.gov.gh',
      website: 'moe.gov.gh',
      headquarters: 'Ministry of Education, Accra'
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    keyInitiatives: [
      'Free SHS Programme',
      'One Teacher One Laptop',
      'STEM Education Enhancement',
      'School Feeding Programme'
    ]
  },
  'ministry-of-roads-and-highways': {
    name: 'Ministry of Roads and Highways',
    slug: 'ministry-of-roads-and-highways',
    abbreviation: 'MRH',
    minister: 'Hon. Kwasi Amoako-Attah',
    tagline: 'Building Roads, Connecting Ghana',
    description: 'The Ministry of Roads and Highways is responsible for policy formulation, planning, and development of road infrastructure in Ghana. We work to improve road networks, ensure road safety, and enhance connectivity across the nation.',
    coverColor: '#744210',
    icon: 'roads',
    established: '2009',
    jurisdiction: 'National',
    employees: '15,000+',
    departments: [
      'Ghana Highway Authority',
      'Department of Urban Roads',
      'Department of Feeder Roads',
      'Road Safety Authority',
      'Road Fund Secretariat'
    ],
    services: [
      'Highway Construction & Maintenance',
      'Urban Road Development',
      'Feeder Road Improvement',
      'Road Safety Education',
      'Bridge Construction',
      'Toll Road Management',
      'Road Infrastructure Planning',
      'Traffic Management Systems'
    ],
    contact: {
      phone: '+233 302 666 465',
      email: 'info@mrh.gov.gh',
      website: 'mrh.gov.gh',
      headquarters: 'Ministry of Roads & Highways, Accra'
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    keyInitiatives: [
      'Year of Roads Programme',
      'Accra-Tema Motorway Expansion',
      'Eastern Corridor Road Project',
      'Asphalt Overlay Programme'
    ]
  },
  'ministry-of-energy': {
    name: 'Ministry of Energy',
    slug: 'ministry-of-energy',
    abbreviation: 'MoEn',
    minister: 'Hon. Matthew Opoku Prempeh',
    tagline: 'Powering Ghana\'s Future',
    description: 'The Ministry of Energy is responsible for the formulation and implementation of policies relating to the energy sector, including electricity, petroleum, and renewable energy. We ensure reliable and affordable energy supply for national development.',
    coverColor: '#d69e2e',
    icon: 'energy',
    established: '2006',
    jurisdiction: 'National',
    employees: '8,000+',
    departments: [
      'Electricity Company of Ghana',
      'Ghana Grid Company',
      'Energy Commission',
      'Petroleum Commission',
      'National Petroleum Authority',
      'Volta River Authority'
    ],
    services: [
      'Electricity Generation & Distribution',
      'Petroleum Resource Management',
      'Renewable Energy Development',
      'Rural Electrification',
      'Energy Efficiency Programmes',
      'LPG Promotion',
      'Oil & Gas Regulation',
      'Power Sector Investment'
    ],
    contact: {
      phone: '+233 302 667 151',
      email: 'info@energymin.gov.gh',
      website: 'energymin.gov.gh',
      headquarters: 'Ministry of Energy, Accra'
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    keyInitiatives: [
      'Dumsor-free Ghana',
      'Solar Energy Expansion',
      'LPG for Cooking Campaign',
      'Oil & Gas Local Content'
    ]
  },
  'ministry-of-communications': {
    name: 'Ministry of Communications & Digitalisation',
    slug: 'ministry-of-communications',
    abbreviation: 'MoCD',
    minister: 'Hon. Ursula Owusu-Ekuful',
    tagline: 'Digital Ghana Agenda',
    description: 'The Ministry of Communications and Digitalisation oversees the development of Ghana\'s ICT and digital infrastructure. We drive digital transformation, cybersecurity, and technology innovation for socioeconomic development.',
    coverColor: '#5a67d8',
    icon: 'communications',
    established: '2017',
    jurisdiction: 'National',
    employees: '3,000+',
    departments: [
      'National Communications Authority',
      'Ghana Investment Fund for Electronic Communications',
      'Data Protection Commission',
      'Cybersecurity Authority',
      'National Information Technology Agency'
    ],
    services: [
      'Telecommunications Regulation',
      'Digital Infrastructure Development',
      'Cybersecurity Management',
      'Data Protection Oversight',
      'E-Government Services',
      'Digital Literacy Programmes',
      'Tech Innovation Support',
      'Rural Connectivity'
    ],
    contact: {
      phone: '+233 302 666 465',
      email: 'info@moc.gov.gh',
      website: 'moc.gov.gh',
      headquarters: 'Ministry of Communications, Accra'
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    keyInitiatives: [
      'Ghana.gov Digital Platform',
      'Ghana Card Integration',
      'Mobile Money Interoperability',
      'WiFi in Public Spaces'
    ]
  },
  'ministry-of-employment': {
    name: 'Ministry of Employment & Labour Relations',
    slug: 'ministry-of-employment',
    abbreviation: 'MoELR',
    minister: 'Hon. Ignatius Baffour Awuah',
    tagline: 'Decent Work for All',
    description: 'The Ministry of Employment and Labour Relations is responsible for policies on employment, industrial relations, occupational safety, and workforce development. We promote decent work and harmonious labour relations in Ghana.',
    coverColor: '#e53e3e',
    icon: 'employment',
    established: '2009',
    jurisdiction: 'National',
    employees: '5,000+',
    departments: [
      'Labour Department',
      'National Labour Commission',
      'Fair Wages and Salaries Commission',
      'Youth Employment Agency',
      'Ghana Standards Authority'
    ],
    services: [
      'Labour Dispute Resolution',
      'Workplace Safety Inspections',
      'Employment Policy Development',
      'Youth Employment Programmes',
      'Wage & Salary Administration',
      'Skills Training & Development',
      'Labour Market Information',
      'Industrial Relations Support'
    ],
    contact: {
      phone: '+233 302 665 421',
      email: 'info@melr.gov.gh',
      website: 'melr.gov.gh',
      headquarters: 'Ministry of Employment, Accra'
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    keyInitiatives: [
      'Nation Builders Corps (NABCO)',
      'Youth Employment Agency',
      'Artisan Development Programme',
      'Labour Migration Support'
    ]
  },
  'ministry-of-trade-and-industry': {
    name: 'Ministry of Trade & Industry',
    slug: 'ministry-of-trade-and-industry',
    abbreviation: 'MoTI',
    minister: 'Hon. Alan Kyerematen',
    tagline: 'Trade & Industrial Transformation',
    description: 'The Ministry of Trade and Industry is responsible for promoting trade, industrial development, and private sector growth. We facilitate business development, market access, and industrial transformation.',
    coverColor: '#38a169',
    icon: 'trade',
    established: '1957',
    jurisdiction: 'National',
    employees: '4,000+',
    departments: [
      'Ghana Free Zones Authority',
      'Ghana Export Promotion Authority',
      'National Board for Small Scale Industries',
      'Ghana Standards Authority',
      'Registrar General\'s Department'
    ],
    services: [
      'Business Registration Support',
      'Export Promotion',
      'Industrial Park Development',
      'Trade Policy Formulation',
      'SME Development',
      'Investment Facilitation',
      'Standards & Quality Assurance',
      'Market Access Support'
    ],
    contact: {
      phone: '+233 302 663 327',
      email: 'info@moti.gov.gh',
      website: 'moti.gov.gh',
      headquarters: 'Ministry of Trade & Industry, Accra'
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    keyInitiatives: [
      'One District One Factory (1D1F)',
      'AfCFTA Implementation',
      'Made in Ghana Campaign',
      'Industrial Transformation Agenda'
    ]
  }
};

// Ministry icons mapping
export const ministryIcons: Record<string, string> = {
  'finance': 'coins',
  'health': 'heartbeat',
  'education': 'books',
  'roads': 'road',
  'energy': 'bolt',
  'communications': 'wifi',
  'employment': 'briefcase',
  'trade': 'chart-line'
};
