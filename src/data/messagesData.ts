export interface ChatMessage {
  id: number;
  senderId: string;
  text: string;
  time: string;
  read: boolean;
  status: 'sent' | 'delivered' | 'read';
  attachment?: {
    type: 'image' | 'video' | 'file';
    url: string;
    name: string;
    size: number;
  };
}

export interface Conversation {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
    online: boolean;
  };
  messages: ChatMessage[];
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

export const conversations: Conversation[] = [
  {
    id: 1,
    user: {
      name: 'Kwame Mensah',
      username: 'kwame_mensah',
      avatar: 'KM',
      online: true,
    },
    lastMessage: 'Have you seen the streetlight report update?',
    lastMessageTime: '2 mins ago',
    unread: 2,
    messages: [
      { id: 1, senderId: 'kwame_mensah', text: 'Hey! Did you see my post about the street lighting crisis on Oxford Street?', time: '10:15 AM', read: true, status: 'read' },
      { id: 2, senderId: 'me', text: 'Yes I did! That was a very detailed report. The situation really needs attention.', time: '10:18 AM', read: true, status: 'read' },
      { id: 3, senderId: 'kwame_mensah', text: 'Thank you! I spent a lot of time documenting everything. The safety concerns are real.', time: '10:20 AM', read: true, status: 'read' },
      { id: 4, senderId: 'me', text: 'I live near that area too. I can confirm the lights have been out for weeks.', time: '10:22 AM', read: true, status: 'read' },
      { id: 5, senderId: 'kwame_mensah', text: 'Would you be willing to add your observations to the thread? More voices help.', time: '10:25 AM', read: true, status: 'read' },
      { id: 6, senderId: 'me', text: "Absolutely! I'll comment on it right away.", time: '10:28 AM', read: true, status: 'read' },
      { id: 7, senderId: 'kwame_mensah', text: 'Great! Also, the assembly responded to another report recently. Progress!', time: '11:30 AM', read: false, status: 'delivered' },
      { id: 8, senderId: 'kwame_mensah', text: 'Have you seen the streetlight report update?', time: '11:45 AM', read: false, status: 'delivered' },
    ],
  },
  {
    id: 2,
    user: {
      name: 'Ama Asamoah',
      username: 'ama_asamoah',
      avatar: 'AA',
      online: true,
    },
    lastMessage: 'The water pipe on Ring Road is finally fixed!',
    lastMessageTime: '15 mins ago',
    unread: 1,
    messages: [
      { id: 1, senderId: 'ama_asamoah', text: 'Hi! I saw your comment on my water pipe burst post. Thank you for the support!', time: '9:00 AM', read: true, status: 'read' },
      { id: 2, senderId: 'me', text: "No problem! That was a serious issue. Did emergency services respond quickly?", time: '9:05 AM', read: true, status: 'read' },
      { id: 3, senderId: 'ama_asamoah', text: 'They came within an hour after the post went viral. Community pressure works!', time: '9:10 AM', read: true, status: 'read' },
      { id: 4, senderId: 'me', text: "That's what Aircho is all about. Glad it helped!", time: '9:15 AM', read: true, status: 'read' },
      { id: 5, senderId: 'ama_asamoah', text: 'The water pipe on Ring Road is finally fixed!', time: '11:30 AM', read: false, status: 'delivered' },
    ],
  },
  {
    id: 3,
    user: {
      name: 'Kofi Owusu',
      username: 'kofi_owusu',
      avatar: 'KO',
      online: false,
    },
    lastMessage: 'Let me know if you want to organize a cleanup event.',
    lastMessageTime: '1 hour ago',
    unread: 0,
    messages: [
      { id: 1, senderId: 'me', text: 'Hey Kofi, I saw your post about the illegal dumping near Kaneshie. Very important issue.', time: 'Yesterday', read: true, status: 'read' },
      { id: 2, senderId: 'kofi_owusu', text: "Thanks! It's been going on for months. I've reported it multiple times.", time: 'Yesterday', read: true, status: 'read' },
      { id: 3, senderId: 'me', text: 'Have the authorities responded at all?', time: 'Yesterday', read: true, status: 'read' },
      { id: 4, senderId: 'kofi_owusu', text: "They acknowledged it but no action yet. I'm thinking of organizing a community cleanup.", time: 'Yesterday', read: true, status: 'read' },
      { id: 5, senderId: 'me', text: "That's a great idea! Count me in.", time: 'Yesterday', read: true, status: 'read' },
      { id: 6, senderId: 'kofi_owusu', text: 'Let me know if you want to organize a cleanup event.', time: '1 hour ago', read: true, status: 'read' },
    ],
  },
  {
    id: 4,
    user: {
      name: 'Abena Serwaa',
      username: 'abena_serwaa',
      avatar: 'AS',
      online: false,
    },
    lastMessage: 'The community meeting is this Saturday at 10 AM.',
    lastMessageTime: '3 hours ago',
    unread: 2,
    messages: [
      { id: 1, senderId: 'abena_serwaa', text: "Hello! I'm organizing a community meeting to discuss the recent infrastructure issues.", time: '8:00 AM', read: true, status: 'read' },
      { id: 2, senderId: 'me', text: 'That sounds very productive. Where will it be held?', time: '8:15 AM', read: true, status: 'read' },
      { id: 3, senderId: 'abena_serwaa', text: 'At the community center in Osu. We need as many residents as possible.', time: '8:20 AM', read: true, status: 'read' },
      { id: 4, senderId: 'me', text: "I'll try to make it. What topics will be covered?", time: '8:30 AM', read: true, status: 'read' },
      { id: 5, senderId: 'abena_serwaa', text: 'Road repairs, streetlighting, waste management, and water supply. The big four!', time: '8:35 AM', read: true, status: 'read' },
      { id: 6, senderId: 'abena_serwaa', text: 'Also, a representative from the assembly will be present.', time: '8:40 AM', read: false, status: 'delivered' },
      { id: 7, senderId: 'abena_serwaa', text: 'The community meeting is this Saturday at 10 AM.', time: '3 hours ago', read: false, status: 'delivered' },
    ],
  },
  {
    id: 5,
    user: {
      name: 'Yaw Boateng',
      username: 'yaw_boateng',
      avatar: 'YB',
      online: true,
    },
    lastMessage: 'Check out the new park renovation plans!',
    lastMessageTime: '5 hours ago',
    unread: 0,
    messages: [
      { id: 1, senderId: 'yaw_boateng', text: 'Hey! Did you know the municipality published new renovation plans for the central park?', time: 'Yesterday', read: true, status: 'read' },
      { id: 2, senderId: 'me', text: 'No I missed that! Where can I find the plans?', time: 'Yesterday', read: true, status: 'read' },
      { id: 3, senderId: 'yaw_boateng', text: "They posted it on the official page. I'll send you the link.", time: 'Yesterday', read: true, status: 'read' },
      { id: 4, senderId: 'me', text: 'Thanks! That area definitely needs renovation.', time: 'Yesterday', read: true, status: 'read' },
      { id: 5, senderId: 'yaw_boateng', text: 'Check out the new park renovation plans!', time: '5 hours ago', read: true, status: 'read' },
    ],
  },
  {
    id: 6,
    user: {
      name: 'Efua Danquah',
      username: 'efua_danquah',
      avatar: 'ED',
      online: false,
    },
    lastMessage: 'Thank you for supporting the petition!',
    lastMessageTime: 'Yesterday',
    unread: 0,
    messages: [
      { id: 1, senderId: 'efua_danquah', text: 'Hi! Thank you so much for signing the petition for better school facilities.', time: 'Yesterday', read: true, status: 'read' },
      { id: 2, senderId: 'me', text: 'Of course! Education infrastructure is crucial. How many signatures so far?', time: 'Yesterday', read: true, status: 'read' },
      { id: 3, senderId: 'efua_danquah', text: "We've reached 500! We need 1000 to submit it officially.", time: 'Yesterday', read: true, status: 'read' },
      { id: 4, senderId: 'me', text: "I'll share it with my network too. Let's get this done!", time: 'Yesterday', read: true, status: 'read' },
      { id: 5, senderId: 'efua_danquah', text: 'Thank you for supporting the petition!', time: 'Yesterday', read: true, status: 'read' },
    ],
  },
  {
    id: 7,
    user: {
      name: 'Nana Akua',
      username: 'nana_akua',
      avatar: 'NA',
      online: true,
    },
    lastMessage: 'The flood warning is really concerning.',
    lastMessageTime: '2 days ago',
    unread: 0,
    messages: [
      { id: 1, senderId: 'nana_akua', text: 'Did you see the flood warning for the Odaw river area?', time: '2 days ago', read: true, status: 'read' },
      { id: 2, senderId: 'me', text: 'Yes, very worrying. Are people in your area preparing?', time: '2 days ago', read: true, status: 'read' },
      { id: 3, senderId: 'nana_akua', text: 'Some are, but many seem to ignore the warnings. We need to spread awareness.', time: '2 days ago', read: true, status: 'read' },
      { id: 4, senderId: 'nana_akua', text: 'The flood warning is really concerning.', time: '2 days ago', read: true, status: 'read' },
    ],
  },
];
