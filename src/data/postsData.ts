// Import images
import cokeAd from '../assets/pictures/share-a-coke-2025-lifestyle-ooh-48-sheet-outdoor-glass.jpg';
import defaultImage from '../assets/pictures/698ee20702caa7d07b71223dfc355e43.avif';
import cokeAvatar from '../assets/pictures/images.png';

export interface Post {
  id: number;
  type: 'user' | 'municipality' | 'civil' | 'ad';
  author: {
    name: string;
    username?: string;
    avatar?: string;
    verified?: boolean;
    role?: string;
    icon?: 'police' | 'fire' | 'ambulance' | 'utility' | 'government' | 'water' | 'sanitation';
  };
  content: string;
  image?: string;
  category?: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
  reposts: number;
  location?: string;
  status?: 'resolved' | 'in-progress' | 'pending' | 'urgent';
  tipEnabled?: boolean;
  commentsData?: Comment[];
  adData?: {
    company: string;
    cta: string;
  };
}

export interface Comment {
  id: number;
  author: string;
  username?: string;
  avatar?: string;
  content: string;
  time: string;
  anonymous: boolean;
  likes: number;
  replies: Reply[];
}

export interface Reply {
  id: number;
  author: string;
  username?: string;
  avatar?: string;
  content: string;
  time: string;
  anonymous: boolean;
  likes: number;
}

export const municipalityPosts: Post[] = [
  {
    id: 1,
    type: 'municipality',
    author: {
      name: 'Accra Metropolitan Assembly',
      verified: true,
      role: 'Municipality',
      icon: 'government'
    },
    content: 'Road Repairs Completed on Main Street. The municipality has successfully completed road repairs on Main Street. Traffic flow has been restored to normal. We thank residents for their patience during the construction period. The project involved repaving 2.5km of road surface and installing new drainage systems.',
    image: defaultImage,
    category: 'Infrastructure',
    time: '2 hours ago',
    likes: 245,
    comments: 34,
    shares: 12,
    reposts: 8,
    status: 'resolved',
    commentsData: [
      { 
        id: 1, 
        author: 'John Doe',
        username: 'john_doe', 
        avatar: 'JD', 
        content: 'Great work! The road is much smoother now.', 
        time: '1 hour ago', 
        anonymous: false,
        likes: 12,
        replies: [
          { id: 1, author: 'Sarah K', username: 'sarah_k', avatar: 'SK', content: 'I agree! Much better now.', time: '45 mins ago', anonymous: false, likes: 3 },
          { id: 2, author: 'Mike T', username: 'mike_t', avatar: 'MT', content: 'Yes, noticed a big improvement!', time: '40 mins ago', anonymous: false, likes: 2 }
        ]
      },
      { 
        id: 2, 
        author: 'Anonymous',
        username: undefined, 
        content: 'Finally! It was long overdue.', 
        time: '30 mins ago', 
        anonymous: true,
        likes: 5,
        replies: []
      },
      {
        id: 3,
        author: 'Ama Mensah',
        username: 'ama_mensah',
        avatar: 'AM',
        content: 'Thank you Accra Metro! This has made my commute so much easier.',
        time: '25 mins ago',
        anonymous: false,
        likes: 8,
        replies: [
          { id: 1, author: 'Kofi A', username: 'kofi_a', avatar: 'KA', content: '@ama_mensah Same here! Great job!', time: '20 mins ago', anonymous: false, likes: 4 }
        ]
      },
      {
        id: 4,
        author: 'Kwesi Boateng',
        username: 'kwesi_boateng',
        avatar: 'KB',
        content: 'The drainage system is working perfectly. No more flooding during rain!',
        time: '20 mins ago',
        anonymous: false,
        likes: 15,
        replies: [
          { id: 1, author: 'Grace M', username: 'grace_m', avatar: 'GM', content: '@kwesi_boateng This is excellent news!', time: '15 mins ago', anonymous: false, likes: 5 },
          { id: 2, author: 'Peter N', username: 'peter_n', avatar: 'PN', content: '@kwesi_boateng Finally we can walk without getting soaked', time: '12 mins ago', anonymous: false, likes: 7 },
          { id: 3, author: 'Anonymous', username: undefined, content: 'About time!', time: '10 mins ago', anonymous: true, likes: 2 }
        ]
      },
      {
        id: 5,
        author: 'Yaw Asante',
        username: 'yaw_asante',
        avatar: 'YA',
        content: 'Brilliant work by the construction team. Very professional.',
        time: '15 mins ago',
        anonymous: false,
        likes: 6,
        replies: []
      },
      {
        id: 6,
        author: 'Efua Owusu',
        username: 'efua_owusu',
        avatar: 'EO',
        content: 'Can you please do the same for Ring Road? It really needs attention.',
        time: '10 mins ago',
        anonymous: false,
        likes: 20,
        replies: [
          { id: 1, author: 'Samuel K', username: 'samuel_k', avatar: 'SK', content: '@efua_owusu Yes! Ring Road is in terrible condition', time: '8 mins ago', anonymous: false, likes: 8 },
          { id: 2, author: 'Mary A', username: 'mary_a', avatar: 'MA', content: '@efua_owusu I second this. Ring Road needs urgent repairs', time: '5 mins ago', anonymous: false, likes: 6 }
        ]
      },
      {
        id: 7,
        author: 'Anonymous',
        username: undefined,
        content: 'Great initiative. Hope this continues for other areas too.',
        time: '8 mins ago',
        anonymous: true,
        likes: 4,
        replies: []
      },
      {
        id: 8,
        author: 'Joseph Mensah',
        username: 'joseph_mensah',
        avatar: 'JM',
        content: 'This is what we need more of - proactive infrastructure maintenance!',
        time: '5 mins ago',
        anonymous: false,
        likes: 11,
        replies: [
          { id: 1, author: 'Linda B', username: 'linda_b', avatar: 'LB', content: '@joseph_mensah Absolutely! More of this please', time: '3 mins ago', anonymous: false, likes: 5 }
        ]
      }
    ]
  },
  {
    id: 2,
    type: 'civil',
    author: {
      name: 'Ghana Police Service - Accra Division',
      verified: true,
      role: 'Emergency Services',
      icon: 'police'
    },
    content: 'Community Safety Alert: We have increased patrols in the Oxford Street area following recent reports. Our officers are working round the clock to ensure your safety. If you see anything suspicious, please call 191 or use our emergency reporting feature. Together, we can keep our community safe.',
    category: 'Safety',
    time: '3 hours ago',
    likes: 567,
    comments: 89,
    shares: 123,
    reposts: 45,
    tipEnabled: true,
    commentsData: [
      { 
        id: 1, 
        author: 'Sarah Johnson',
        username: 'sarah_johnson', 
        avatar: 'SJ', 
        content: 'Thank you for keeping us safe!', 
        time: '2 hours ago', 
        anonymous: false,
        likes: 23,
        replies: []
      }
    ]
  },
  {
    id: 3,
    type: 'user',
    author: {
      name: 'Kwame Mensah',
      username: 'kwame_mensah',
      avatar: 'KM'
    },
    content: 'DETAILED REPORT: Street Lighting Crisis on Oxford Street and Surrounding Areas.\n\nI am writing to bring urgent attention to the deteriorating street lighting situation in our community, particularly along Oxford Street and the adjacent residential areas. This has been an ongoing issue for over three weeks now, and the situation continues to worsen with each passing day.\n\nThe Problem:\nMultiple street lights along Oxford Street have been completely non-functional since January 15th. What started as a few isolated lights has now expanded to affect nearly the entire stretch from the junction at Independence Avenue all the way to Ring Road. The affected area spans approximately 2.5 kilometers of main road and includes several side streets.\n\nSafety Concerns:\nThe lack of adequate lighting has created numerous safety hazards for our community. Residents, especially women and elderly persons, feel unsafe walking in these areas after dark. There have been reported incidents of petty theft and attempted robberies in the darker sections. Children returning from evening lessons have to navigate through poorly lit pathways, and many parents are now limiting their children\'s evening activities due to safety concerns.\n\nBusiness Impact:\nLocal businesses, particularly small shops and restaurants that operate in the evening, have reported significant drops in customer traffic. Shop owners have had to invest in expensive generators and additional security lighting at their own cost, which is putting financial strain on small business owners who are already struggling.\n\nTraffic Safety:\nThe absence of street lighting has also created dangerous conditions for motorists and pedestrians. Several near-miss accidents have been reported at pedestrian crossings that are now barely visible at night. Motorists have difficulty seeing potholes and road hazards, leading to increased vehicle damage and safety risks.\n\nPrevious Complaints:\nThis is not the first time we have raised this issue. Multiple residents have reported this problem through various channels:\n- Formal complaints were filed with the municipal office on January 20th\n- A delegation of community members visited the assembly offices on January 27th\n- Social media posts have been made and shared widely\n- Local radio stations have covered the story\n\nDespite all these efforts, we have received no concrete response or timeline for repairs.\n\nCommunity Impact:\nThe prolonged darkness has affected the general quality of life in our neighborhood. Evening community activities, including youth sports programs and adult education classes, have been disrupted. The sense of community that once thrived in our well-lit public spaces has diminished significantly.\n\nWhat We Need:\nWe urgently request the following actions:\n1. Immediate inspection of all street lights in the Oxford Street area\n2. A clear timeline for repairs and restoration of lighting\n3. Regular maintenance schedule to prevent future occurrences\n4. Installation of additional lights in areas that have historically been poorly lit\n5. An emergency contact system for reporting lighting issues\n\nWe understand that maintenance and repairs require time and resources, but three weeks without proper street lighting in a major urban area is unacceptable. We hope that the relevant authorities will treat this matter with the urgency it deserves.\n\nThe safety and well-being of our community depend on prompt action. We look forward to a swift resolution to this critical infrastructure issue.\n\n@AccraMetro @GhanaPolice #StreetLighting #CommunitySafety #OxfordStreet',
    location: 'Oxford Street, Accra',
    time: '4 hours ago',
    likes: 189,
    comments: 45,
    shares: 67,
    reposts: 34,
    status: 'pending',
    commentsData: []
  },
  {
    id: 31,
    type: 'user',
    author: {
      name: 'Ama Asamoah',
      username: 'ama_asamoah',
      avatar: 'AA'
    },
    content: 'URGENT: Major water pipe burst on Ring Road causing flooding! The road is completely blocked and water is rushing into nearby homes. This needs immediate attention from Ghana Water Company and emergency services!',
    location: 'Ring Road, Accra',
    time: '30 minutes ago',
    likes: 342,
    comments: 78,
    shares: 156,
    reposts: 234,
    status: 'urgent',
    tipEnabled: true,
    commentsData: [
      { 
        id: 1, 
        author: 'Anonymous',
        username: undefined, 
        content: 'I saw the Ghana Water Company truck leaving the area 10 minutes before the burst', 
        time: '20 mins ago', 
        anonymous: true,
        likes: 45,
        replies: [
          { id: 1, author: 'Kofi A', username: 'kofi_a', avatar: 'KA', content: 'Can you provide more details to the authorities?', time: '15 mins ago', anonymous: false, likes: 12 }
        ]
      },
      { 
        id: 2, 
        author: 'Kwesi Boateng',
        username: 'kwesi_boateng', 
        avatar: 'KB', 
        content: 'The pipe has been leaking for days! Someone needs to act NOW!', 
        time: '15 mins ago', 
        anonymous: false,
        likes: 28,
        replies: []
      }
    ]
  },
  {
    id: 4,
    type: 'civil',
    author: {
      name: 'Ghana Water Company Ltd',
      verified: true,
      role: 'Civil Company',
      icon: 'water'
    },
    content: 'Scheduled Water Supply Interruption: We will be carrying out essential maintenance works on Friday, February 7th from 10:00 AM to 4:00 PM. Areas affected: Osu, Labone, East Legon, and surrounding communities. Water supply will be fully restored by 6:00 PM. We apologize for any inconvenience caused.',
    image: defaultImage,
    category: 'Utilities',
    time: '5 hours ago',
    likes: 234,
    comments: 67,
    shares: 45,
    reposts: 23,
    commentsData: []
  },
  {
    id: 5,
    type: 'municipality',
    author: {
      name: 'Tema Metropolitan Assembly',
      verified: true,
      role: 'Municipality',
      icon: 'sanitation'
    },
    content: 'New Waste Collection Schedule: Starting next week, waste collection will be done every Tuesday and Friday. Please have your bins ready by 6:00 AM on collection days. New collection trucks have been deployed to improve service efficiency. Let\'s keep our city clean!',
    category: 'Sanitation',
    time: '6 hours ago',
    likes: 128,
    comments: 45,
    shares: 23,
    reposts: 15,
    commentsData: []
  },
  {
    id: 6,
    type: 'civil',
    author: {
      name: 'Ghana Fire Service - Accra Station',
      verified: true,
      role: 'Emergency Services',
      icon: 'fire'
    },
    content: 'Fire Safety Awareness Week: This week, we are conducting free fire safety inspections for homes and businesses in the Accra Metro area. Book your inspection by calling 192. Remember: Check your smoke detectors monthly, have a fire escape plan, and never leave cooking unattended.',
    time: '8 hours ago',
    likes: 345,
    comments: 56,
    shares: 78,
    reposts: 34,
    commentsData: []
  },
  {
    id: 7,
    type: 'user',
    author: {
      name: 'Ama Asante',
      username: 'ama_asante',
      avatar: 'AA'
    },
    content: 'Big shoutout to the sanitation workers in our area! They\'ve been doing an amazing job keeping our streets clean despite the challenges. They deserve more recognition and better working conditions. Thank you for your service! 🙏',
    image: defaultImage,
    location: 'Osu, Accra',
    time: '1 day ago',
    likes: 456,
    comments: 78,
    shares: 34,
    reposts: 19,
    commentsData: []
  },
  {
    id: 8,
    type: 'civil',
    author: {
      name: 'Electricity Company of Ghana - Accra',
      verified: true,
      role: 'Civil Company',
      icon: 'utility'
    },
    content: 'Power Restoration Complete: Power has been fully restored to all areas affected by yesterday\'s outage in the Greater Accra region. We sincerely apologize for the inconvenience caused. Our technical team continues to work on infrastructure upgrades to improve service reliability and prevent future occurrences.',
    category: 'Power',
    time: '1 day ago',
    likes: 567,
    comments: 134,
    shares: 67,
    reposts: 45,
    commentsData: []
  }
];

export const ghanaPosts: Post[] = [
  {
    id: 9,
    type: 'municipality',
    author: {
      name: 'Ministry of Roads and Highways',
      verified: true,
      role: 'Government',
      icon: 'government'
    },
    content: 'National Road Safety Campaign Launched: The government has launched a nationwide campaign to promote road safety awareness. Over 500 billboards will be installed across all regions. The campaign includes free vehicle safety checks, driver education programs, and improved road signage. Drive safely, arrive safely!',
    image: defaultImage,
    category: 'Safety',
    time: '2 hours ago',
    likes: 1234,
    comments: 267,
    shares: 145,
    reposts: 89,
    commentsData: []
  },
  {
    id: 10,
    type: 'ad',
    author: {
      name: 'Coca-Cola Ghana',
      role: 'Sponsor',
      avatar: cokeAvatar
    },
    content: 'Refresh Your Day with Coca-Cola! Now available in new convenient sizes at all major stores nationwide. Taste the feeling of happiness! Limited edition Ghana Independence flavors coming soon. #ShareACoke #TasteTheFeeling',
    image: cokeAd,
    time: '2 hours ago',
    likes: 2341,
    comments: 45,
    shares: 234,
    reposts: 156,
    adData: {
      company: 'Coca-Cola Ghana',
      cta: 'Learn More'
    }
  },
  {
    id: 11,
    type: 'civil',
    author: {
      name: 'Ghana National Ambulance Service',
      verified: true,
      role: 'Emergency Services',
      icon: 'ambulance'
    },
    content: 'Emergency Response Update: We have deployed 50 new state-of-the-art ambulances across all 16 regions. Our average response time has improved to under 15 minutes in urban areas. For emergencies, dial 112 or use our mobile app. Every second counts - we\'re here for you 24/7.',
    category: 'Health',
    time: '4 hours ago',
    likes: 2456,
    comments: 234,
    shares: 345,
    reposts: 178,
    commentsData: []
  },
  {
    id: 12,
    type: 'user',
    author: {
      name: 'Kofi Adjei',
      username: 'kofi_adjei',
      avatar: 'KA'
    },
    content: 'Kudos to the Kumasi Metropolitan Assembly for the quick response to our drainage concerns! The area has been cleaned and repaired within 48 hours of reporting. This is what we need more of across Ghana! Efficient, responsive, and professional service. 👏👏👏',
    location: 'Kumasi, Ashanti Region',
    image: defaultImage,
    time: '6 hours ago',
    likes: 456,
    comments: 78,
    shares: 34,
    reposts: 23,
    commentsData: []
  },
  {
    id: 13,
    type: 'municipality',
    author: {
      name: 'Ministry of Education',
      verified: true,
      role: 'Government',
      icon: 'government'
    },
    content: 'Free Education Program Expansion: The free senior high school program has been expanded to include more schools across all regions. Over 500,000 students are now benefiting from this initiative. New digital learning centers have been established in rural areas to bridge the education gap. Ghana\'s future is bright!',
    category: 'Education',
    time: '8 hours ago',
    likes: 3456,
    comments: 456,
    shares: 234,
    reposts: 189,
    commentsData: []
  },
  {
    id: 14,
    type: 'civil',
    author: {
      name: 'Ghana Police Service Headquarters',
      verified: true,
      role: 'Emergency Services',
      icon: 'police'
    },
    content: 'National Crime Prevention Initiative: We\'ve launched a new community policing program in all regions. Neighborhood watch groups are being trained and equipped. Report suspicious activities via our hotline 191 or our mobile app. Together, we can make Ghana safer for everyone. Your vigilance matters.',
    time: '10 hours ago',
    likes: 1789,
    comments: 234,
    shares: 156,
    reposts: 98,
    tipEnabled: true,
    commentsData: []
  },
  {
    id: 15,
    type: 'user',
    author: {
      name: 'Abena Osei',
      username: 'abena_osei',
      avatar: 'AO'
    },
    content: 'The new water infrastructure project in Tamale is impressive! Clean water is now accessible to over 100,000 residents. This is the kind of development we need across all regions. Thank you to everyone involved in making this happen. Development that matters! 💧',
    location: 'Tamale, Northern Region',
    time: '12 hours ago',
    likes: 678,
    comments: 123,
    shares: 67,
    reposts: 45,
    commentsData: []
  },
  {
    id: 16,
    type: 'civil',
    author: {
      name: 'Ghana National Fire Service',
      verified: true,
      role: 'Emergency Services',
      icon: 'fire'
    },
    content: 'Nationwide Fire Safety Training: We\'re offering free fire safety training sessions in all regional capitals this month. Learn how to use fire extinguishers, create evacuation plans, and prevent home fires. Protect your family, protect your property. Register now via our website. Emergency hotline: 192',
    image: defaultImage,
    category: 'Safety',
    time: '1 day ago',
    likes: 890,
    comments: 145,
    shares: 89,
    reposts: 56,
    commentsData: []
  }
];
