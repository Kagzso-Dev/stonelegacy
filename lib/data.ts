export const graniteTypes = [
  {
    id: 'absolute-black',
    name: 'Absolute Black Granite',
    description: 'Highest contrast, premium quality. Ideal for laser engraving and deep CNC work.',
    features: ['Highest Contrast', 'Premium Quality', 'Laser Engraving Ideal'],
    color: '#0a0a0a',
  },
  {
    id: 'grey',
    name: 'Grey Granite',
    description: 'Classic appearance with superior durability and outstanding weather resistance.',
    features: ['Classic Look', 'Durable', 'Weather Resistant'],
    color: '#6B7280',
  },
  {
    id: 'serpentine',
    name: 'Serpentine Granite',
    description: 'Elegant natural texture with a premium finish for distinguished applications.',
    features: ['Elegant Texture', 'Long-lasting', 'Premium Finish'],
    color: '#065F46',
  },
  {
    id: 'red',
    name: 'Red Granite',
    description: 'Rich natural color with a bold decorative style for standout signage.',
    features: ['Rich Color', 'Decorative Style', 'Natural Beauty'],
    color: '#7F1D1D',
  },
];

export const engravingMethods = [
  {
    id: 'cnc',
    name: 'CNC Engraving',
    description: 'Deep precision cuts with premium finish. Perfect for logos and fine lettering.',
    features: ['Deep precision cuts', 'Premium finish', 'Logos & lettering'],
    icon: 'Settings2',
  },
  {
    id: 'sandblasting',
    name: 'Sandblasting',
    description: 'Traditional deep text carving. Paint-filled letters available for contrast.',
    features: ['Traditional engraving', 'Deep text carving', 'Paint-filled letters'],
    icon: 'Wind',
  },
  {
    id: 'laser',
    name: 'Laser Etching',
    description: 'High-detail engraving optimised for black granite. Supports photographs and logos.',
    features: ['High-detail engraving', 'Best for black granite', 'Photograph support'],
    icon: 'Zap',
  },
  {
    id: 'hand',
    name: 'Hand Carving',
    description: 'Artistic sculptural relief with decorative borders for truly unique pieces.',
    features: ['Sculptural relief', 'Decorative borders', 'Unique custom designs'],
    icon: 'PenTool',
  },
];

export const sizeOptions = [
  { size: '12 × 6 inches', usage: 'House Name Board', popular: false },
  { size: '18 × 9 inches', usage: 'Family Sign', popular: true },
  { size: '24 × 12 inches', usage: 'Entrance Sign', popular: false },
  { size: '36 × 18 inches', usage: 'School Marker', popular: false },
  { size: 'Custom Size', usage: 'Any Requirement', popular: false },
];

export const qualityLevels = [
  {
    name: 'Standard',
    price: 'From ₹1,500',
    description: 'Clean basic engraving with standard finish. Ideal for everyday applications.',
    features: ['Standard engraving', 'Natural stone finish', '3-5 day delivery', 'Quality checked'],
    highlight: false,
  },
  {
    name: 'Premium',
    price: 'From ₹3,500',
    description: 'Enhanced finish with high-grade polishing and refined detailing.',
    features: ['Enhanced detailing', 'High-grade polishing', '2-3 day delivery', 'Priority support'],
    highlight: true,
  },
  {
    name: 'Luxury',
    price: 'From ₹7,000',
    description: 'Deep CNC engraving with paint fill, premium polishing, and exclusive presentation.',
    features: ['Deep CNC engraving', 'Paint fill included', 'Same-day dispatch option', 'Dedicated craftsman'],
    highlight: false,
  },
];

export const services = [
  {
    id: 'house-name-boards',
    title: 'House Name Boards',
    description: 'Elegant granite name boards for homes and villas. Personalized with your family name, house number, and decorative elements.',
    icon: 'Home',
  },
  {
    id: 'school-crest',
    title: 'School Crest Signage',
    description: 'Weather-resistant institutional signs featuring school logo, motto, and founding year — built to endure decades.',
    icon: 'Award',
  },
  {
    id: 'donor-walkways',
    title: 'Donor & Alumni Walkways',
    description: 'Custom engraved stones honouring supporters, alumni, and benefactors with their names preserved in granite.',
    icon: 'Users',
  },
  {
    id: 'class-markers',
    title: 'Class & Milestone Markers',
    description: 'Historical timelines and graduating class plaques that celebrate achievements for generations.',
    icon: 'BookOpen',
  },
  {
    id: 'memorial-gardens',
    title: 'Campus Memorial Gardens',
    description: 'Memorial plaques dedicated to educators, founders, and community members who shaped the institution.',
    icon: 'Flower2',
  },
];

export const galleryCategories = [
  'All',
  'House Name Boards',
  'School Signage',
  'Memorial Plaques',
  'Donor Walkways',
  'Granite Samples',
];

