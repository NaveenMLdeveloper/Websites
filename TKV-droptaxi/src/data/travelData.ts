export interface LocalPackage {
  baseFare: number;
  baseKm: number;
  baseHours: number;
  extraKmRate: number;
  waitingPerHour: number;
}

export interface Vehicle {
  id: string;
  name: string;
  seats: number;
  luggage: string;
  fuel: string;
  ac: boolean;
  type: 'sedan' | 'suv' | 'tempo' | 'bus';
  rate: number;
  onewayRate: number;
  roundRate: number;
  localPackage?: LocalPackage;
  minKm: number;
  badge?: string;
  image: string;
  fallbackImage?: string;
  features: string[];
}

export interface ServiceItem {
  id: string;
  name: string;
  icon: string;
  image: string;
  fallbackImage?: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ReviewItem {
  name: string;
  location: string;
  avatar: string;
  stars: number;
  quote: string;
}

export const POPULAR_CITIES = [
  "Hosur",
  "Bangalore",
  "Bangalore Airport",
  "Chennai",
  "Salem",
  "Coimbatore",
  "Krishnagiri",
  "Tirupati",
  "Pondicherry",
  "Trichy",
  "Madurai",
  "Vellore",
  "Mysore",
  "Ooty"
];

export const POPULAR_DISTANCES: Record<string, number> = {
  "hosur-bangalore": 45,
  "bangalore-hosur": 45,
  "hosur-bangalore airport": 80,
  "bangalore airport-hosur": 80,
  "hosur-chennai": 310,
  "chennai-hosur": 310,
  "hosur-salem": 160,
  "salem-hosur": 160,
  "hosur-coimbatore": 320,
  "coimbatore-hosur": 320,
  "hosur-krishnagiri": 50,
  "krishnagiri-hosur": 50,
  "hosur-tirupati": 240,
  "tirupati-hosur": 240,
  "hosur-pondicherry": 260,
  "pondicherry-hosur": 260,
  "hosur-trichy": 300,
  "trichy-hosur": 300,
  "hosur-madurai": 390,
  "madurai-hosur": 390,
  "hosur-vellore": 175,
  "vellore-hosur": 175,
  "hosur-ooty": 280,
  "ooty-hosur": 280,
  "hosur-mysore": 185,
  "mysore-hosur": 185,
  "bangalore-chennai": 350,
  "chennai-bangalore": 350,
  "bangalore-mysore": 145,
  "mysore-bangalore": 145,
  "bangalore-coimbatore": 360,
  "coimbatore-bangalore": 360,
  "bangalore-salem": 200,
  "salem-bangalore": 200,
  "chennai-salem": 340,
  "salem-chennai": 340,
  "chennai-pondicherry": 155,
  "pondicherry-chennai": 155,
  "chennai-tirupati": 135,
  "tirupati-chennai": 135,
  "chennai-coimbatore": 505,
  "coimbatore-chennai": 505,
  "coimbatore-ooty": 85,
  "ooty-coimbatore": 85
};

export const CONFIG = {
  businessName: "TKV Drop Taxi",
  phone: "+919786284326",
  phoneFormatted: "+91 97862 84326",
  whatsapp: "919786284326",
  email: "info@tkvdroptaxi.com",
  facebookUrl: "https://www.facebook.com/share/p/1BeGsCAgXS/",
  defaultWaMessage: "Hi TKV Drop Taxi, I'd like to book a cab. Please share availability and fare estimation.",
  address: "2nd Cross Narashamma Colony, Krishnagiri ByePass Road, Suzuki Showroom back Side, Hosur - 635109",
  addressShort: "Hosur, Tamil Nadu",
  geo: {
    latitude: 12.7407,
    longitude: 77.8204
  },
  mapEmbedUrl: "https://maps.google.com/maps?q=Hosur%2C%20Tamil%20Nadu&t=&z=12&ie=UTF8&iwloc=&output=embed",
  siteUrl: "https://websites.naveenpalani75.workers.dev",
  logoPath: "/images/logo/main.png",
  socialImage: "/images/logo/main.png",
  // Update this value after the permanent custom domain is purchased.
  domainNote: "Temporary Workers.dev URL in use until the custom domain is purchased."
};

export const VEHICLES: Vehicle[] = [
  {
    id: "dzire",
    name: "Swift Dzire",
    seats: 4,
    luggage: "2 Bags",
    fuel: "Diesel",
    ac: true,
    type: "sedan",
    rate: 15,
    onewayRate: 15,
    roundRate: 14,
    localPackage: {
      baseFare: 2000,
      baseKm: 100,
      baseHours: 8,
      extraKmRate: 14,
      waitingPerHour: 150
    },
    minKm: 250,
    badge: "Best Value Sedan",
    image: "/images/vehicles/Swift Dzire.png",
    fallbackImage: "/images/vehicles/Swift Dzire.png",
    features: ["Swift Dzire Sedan", "Top Fuel Economy", "AC & Music System"]
  },
  {
    id: "etios",
    name: "Toyota Etios",
    seats: 4,
    luggage: "3 Bags",
    fuel: "Diesel",
    ac: true,
    type: "sedan",
    rate: 15,
    onewayRate: 15,
    roundRate: 14,
    localPackage: {
      baseFare: 2000,
      baseKm: 100,
      baseHours: 8,
      extraKmRate: 14,
      waitingPerHour: 150
    },
    minKm: 250,
    image: "/images/vehicles/Toyota Etios-style sedan.png",
    fallbackImage: "/images/vehicles/Toyota Etios-style sedan.png",    
    features: ["Toyota Etios Sedan", "Spacious 592L Boot", "Smooth Highway Ride"]
  },
  {
    id: "ertiga",
    name: "Maruti Ertiga (SUV)",
    seats: 6,
    luggage: "3 Bags",
    fuel: "Diesel",
    ac: true,
    type: "suv",
    rate: 20,
    onewayRate: 20,
    roundRate: 19,
    localPackage: {
      baseFare: 2800,
      baseKm: 100,
      baseHours: 8,
      extraKmRate: 17,
      waitingPerHour: 180
    },
    minKm: 250,
    badge: "Popular SUV",
    image: "/images/vehicles/Maruti Ertiga.png",
    fallbackImage: "/images/vehicles/Maruti Ertiga.png",
    features: ["Ertiga 6+1 Seater", "Flexible Seating", "Comfortable Suspension"]
  },
  {
    id: "crysta",
    name: "Innova Crysta",
    seats: 7,
    luggage: "4 Bags",
    fuel: "Diesel",
    ac: true,
    type: "suv",
    rate: 21,
    onewayRate: 21,
    roundRate: 20,
    localPackage: {
      baseFare: 3500,
      baseKm: 100,
      baseHours: 8,
      extraKmRate: 18,
      waitingPerHour: 190
    },
    minKm: 300,
    badge: "Executive Class",
    image: "/images/vehicles/Innova Crysta.png",
    fallbackImage: "/images/vehicles/Innova Crysta.png",
    features: ["Innova Crysta Luxury", "Captain Leather Seats", "VIP Suspension"]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "airport-pickup",
    name: "Airport Pickup",
    icon: "plane",
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=800&auto=format&fit=crop",
    desc: "On-time pickups from Bangalore & Chennai airports with flight tracking."
  },
  {
    id: "airport-drop",
    name: "Airport Drop",
    icon: "plane",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1520437358207-323b43b50729?q=80&w=800&auto=format&fit=crop",
    desc: "Relaxed, punctual drop-offs for any domestic or international flight."
  },
  {
    id: "corporate",
    name: "Corporate Travel",
    icon: "briefcase",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    desc: "Reliable rides for business meetings, tech parks & corporate teams."
  },
  {
    id: "wedding",
    name: "Wedding Travel",
    icon: "heart",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    desc: "Decorated, on-time premium cars and guest convoys for your big day."
  },
  {
    id: "outstation",
    name: "Outstation Trips",
    icon: "map-package",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=800&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
    desc: "Comfortable long-distance travel across Tamil Nadu, Karnataka & beyond."
  },
  {
    id: "temple",
    name: "Temple Tour",
    icon: "mountain",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800&auto=format&fit=crop",
    desc: "Peaceful pilgrimage trips to Tirupati, Madurai, Rameshwaram & Palani."
  },
  {
    id: "family",
    name: "Family Tour",
    icon: "users",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
    desc: "Spacious, safe MPVs and Travellers for memorable family vacations."
  },
  {
    id: "business",
    name: "Business Travel",
    icon: "building",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop",
    desc: "Professional chauffeur service for VIP clients and executives."
  },
  {
    id: "school",
    name: "School Trips",
    icon: "school",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    desc: "Safe, verified transport with speed limiters for school outings."
  },
  {
    id: "college",
    name: "College Trips",
    icon: "book",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    desc: "Group tempo travellers & buses for college tours and industrial visits."
  },
  {
    id: "packages",
    name: "Tour Packages",
    icon: "mountain",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=800&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    desc: "Curated hill station & coastal travel packages to Ooty, Kodaikanal & Coorg."
  },
  {
    id: "monthly",
    name: "Monthly Rental",
    icon: "repeat",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop",
    desc: "Dedicated vehicle & professional driver contract on a monthly basis."
  }
];

export interface PopularRouteCard {
  id: string;
  category: string;
  badge?: string;
  routes: Array<{
    from: string;
    to: string;
    label: string;
    tag?: string;
  }>;
  actionText: string;
}

export const POPULAR_ROUTE_CARDS: PopularRouteCard[] = [
  {
    id: "airport",
    category: "AIRPORT ROUTES",
    badge: "24×7 Flight Timings",
    routes: [
      { from: "Hosur", to: "Bangalore Airport", label: "Hosur → Bangalore Airport", tag: "Express Route" },
      { from: "Bangalore Airport", to: "Hosur", label: "Bangalore Airport → Hosur", tag: "Direct Drop" },
      { from: "Bangalore Airport", to: "Chennai", label: "Bangalore Airport → Chennai", tag: "Highway Drop" },
      { from: "Chennai", to: "Bangalore Airport", label: "Chennai → Bangalore Airport", tag: "Airport Drop" }
    ],
    actionText: "View All Routes →"
  },
  {
    id: "drop-taxi",
    category: "DROP TAXI ROUTES",
    badge: "Pay Only One-Way",
    routes: [
      { from: "Hosur", to: "Bangalore", label: "Hosur → Bangalore", tag: "Daily Commute" },
      { from: "Bangalore", to: "Hosur", label: "Bangalore → Hosur", tag: "Fast Pickup" },
      { from: "Hosur", to: "Chennai", label: "Hosur → Chennai", tag: "Highway Ride" },
      { from: "Chennai", to: "Hosur", label: "Chennai → Hosur", tag: "Return Drop" }
    ],
    actionText: "View All Routes →"
  },
  {
    id: "long-distance",
    category: "LONG-DISTANCE TRIPS",
    badge: "No Return Toll",
    routes: [
      { from: "Hosur", to: "Anywhere in Tamil Nadu", label: "Hosur → Anywhere in Tamil Nadu", tag: "All Districts" },
      { from: "Bangalore", to: "Anywhere in Tamil Nadu", label: "Bangalore → Anywhere in TN", tag: "Interstate" },
      { from: "Chennai", to: "Anywhere in Tamil Nadu", label: "Chennai → Anywhere in TN", tag: "Statewide" },
      { from: "Tamil Nadu", to: "Anywhere in India", label: "Tamil Nadu → Anywhere India", tag: "Long Haul" }
    ],
    actionText: "View All Routes →"
  },
  {
    id: "all-india",
    category: "ALL-INDIA TRAVEL",
    badge: "Tourist Permit",
    routes: [
      { from: "Hosur", to: "All India", label: "Hosur → All India", tag: "Nationwide" },
      { from: "Tamil Nadu", to: "All India", label: "Tamil Nadu → All India", tag: "All States" },
      { from: "South India", to: "Interstate Outstation", label: "Interstate Outstation", tag: "Custom Tour" },
      { from: "Any City", to: "One-Way & Round Trips", label: "One-Way & Round Trips", tag: "Flexible" }
    ],
    actionText: "View All Routes →"
  }
];

export const FAQS: FAQItem[] = [
  {
    q: "Do you provide All India Tourist Permit vehicles?",
    a: "Yes, every vehicle in our fleet carries a valid All India Tourist Permit, so you can travel across state borders without any paperwork hassle."
  },
  {
    q: "How is the fare calculated?",
    a: "Fare is based on the vehicle's per-km rate, trip type (one way, round trip or rental), driver bata, night charges and applicable toll/parking. Use our Fare Calculator above for an instant estimate."
  },
  {
    q: "Can I book a vehicle for same-day travel?",
    a: "Yes, subject to vehicle availability. We recommend booking at least a few hours in advance, but we do accommodate urgent same-day requests — just message us on WhatsApp."
  },
  {
    q: "Do you operate 24×7?",
    a: "Yes, our booking desk and drivers are available 24×7, including nights, weekends and public holidays."
  },
  {
    q: "Is a security deposit required?",
    a: "No advance deposit is required for most local and outstation bookings. For long tour packages, a nominal advance may be requested to confirm the vehicle."
  },
  {
    q: "Which areas do you operate in?",
    a: "We primarily serve Hosur, Krishnagiri and Bangalore, with outstation trips available across Tamil Nadu and neighbouring states."
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    name: "Ramesh M.",
    location: "Hosur",
    avatar: "RM",
    stars: 5,
    quote: "Booked an Innova Crysta for our Ooty family trip. The car was spotless and the driver knew every ghat road. Genuinely premium experience."
  },
  {
    name: "Sandhya K.",
    location: "Krishnagiri",
    avatar: "SK",
    stars: 5,
    quote: "We use them monthly for corporate airport pickups from Bangalore. Always on time, always professional. Never had a single delay."
  },
  {
    name: "Arun V.",
    location: "Bangalore",
    avatar: "AV",
    stars: 5,
    quote: "Hired the Tempo Traveller for a wedding party of 15. WhatsApp booking took two minutes and the fare was exactly as quoted."
  }
];
