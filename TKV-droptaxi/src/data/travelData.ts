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

export interface CityLocation {
  name: string;
  state?: string;
  lat: number;
  lng: number;
  description?: string;
  aliases?: string[];
}

export const POPULAR_CITY_LOCATIONS: CityLocation[] = [
  { name: "Hosur", state: "Tamil Nadu", lat: 12.7407, lng: 77.8204, description: "Industrial Hub, Near Bangalore border" },
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946, description: "Silicon Valley of India, Karnataka", aliases: ["bengaluru", "blr"] },
  { name: "Bangalore Airport", state: "Karnataka", lat: 13.1986, lng: 77.7066, description: "Kempegowda International Airport", aliases: ["kia", "kempegowda", "devanahalli", "blr airport"] },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, description: "Capital of Tamil Nadu", aliases: ["madras", "maa"] },
  { name: "Chennai Airport", state: "Tamil Nadu", lat: 12.9941, lng: 80.1709, description: "Meenambakkam International Airport", aliases: ["maa airport", "meenambakkam"] },
  { name: "Salem", state: "Tamil Nadu", lat: 11.6643, lng: 78.1460, description: "Steel City, Central Tamil Nadu" },
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, description: "Manchester of South India", aliases: ["kovai", "cjb"] },
  { name: "Coimbatore Airport", state: "Tamil Nadu", lat: 11.0298, lng: 77.0434, description: "Peelamedu Airport", aliases: ["cjb airport", "peelamedu"] },
  { name: "Krishnagiri", state: "Tamil Nadu", lat: 12.5186, lng: 78.2137, description: "Mango City, Tamil Nadu" },
  { name: "Tirupati", state: "Andhra Pradesh", lat: 13.6288, lng: 79.4192, description: "Pilgrimage City, Balaji Temple" },
  { name: "Pondicherry", state: "Puducherry", lat: 11.9416, lng: 79.8083, description: "French Quarter & Promenade Beach", aliases: ["puducherry", "pondy"] },
  { name: "Trichy", state: "Tamil Nadu", lat: 10.7905, lng: 78.7047, description: "Rockfort City, Central Tamil Nadu", aliases: ["tiruchirappalli"] },
  { name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, description: "Temple City, Meenakshi Amman Temple" },
  { name: "Vellore", state: "Tamil Nadu", lat: 12.9165, lng: 79.1325, description: "CMC Hospital & Golden Temple" },
  { name: "Mysore", state: "Karnataka", lat: 12.2958, lng: 76.6394, description: "Palace City, Heritage Karnataka", aliases: ["mysuru"] },
  { name: "Ooty", state: "Tamil Nadu", lat: 11.4102, lng: 76.6950, description: "Queen of Hill Stations, Nilgiris", aliases: ["udhagamandalam"] },
  { name: "Kodaikanal", state: "Tamil Nadu", lat: 10.2381, lng: 77.4892, description: "Princess of Hill Stations" },
  { name: "Dharmapuri", state: "Tamil Nadu", lat: 12.1211, lng: 78.1582, description: "Hogenakkal Falls Region" },
  { name: "Erode", state: "Tamil Nadu", lat: 11.3410, lng: 77.7172, description: "Turmeric City, Kongu Region" },
  { name: "Tiruppur", state: "Tamil Nadu", lat: 11.1085, lng: 77.3411, description: "Knitwear Capital of India" },
  { name: "Thanjavur", state: "Tamil Nadu", lat: 10.7870, lng: 79.1378, description: "Brihadeeswara Big Temple", aliases: ["tanjore"] },
  { name: "Dindigul", state: "Tamil Nadu", lat: 10.3673, lng: 77.9803, description: "Lock City & Biryani Capital" },
  { name: "Namakkal", state: "Tamil Nadu", lat: 11.2189, lng: 78.1674, description: "Poultry Capital & Anjaneyar Temple" },
  { name: "Karur", state: "Tamil Nadu", lat: 10.9601, lng: 78.0766, description: "Textile City on Amaravathi River" },
  { name: "Kanchipuram", state: "Tamil Nadu", lat: 12.8342, lng: 79.7036, description: "Silk City & Temple City" },
  { name: "Tiruvannamalai", state: "Tamil Nadu", lat: 12.2253, lng: 79.0747, description: "Annamalaiyar Temple & Girivalam" },
  { name: "Cuddalore", state: "Tamil Nadu", lat: 11.7480, lng: 79.7714, description: "Silver Beach & Coastal Port" },
  { name: "Villupuram", state: "Tamil Nadu", lat: 11.9401, lng: 79.4861, description: "Gateway to Central & South TN" },
  { name: "Tirunelveli", state: "Tamil Nadu", lat: 8.7139, lng: 77.7567, description: "Nellaiappar Temple & Halwa City" },
  { name: "Kanyakumari", state: "Tamil Nadu", lat: 8.0883, lng: 77.5385, description: "Southernmost Tip of India" },
  { name: "Rameswaram", state: "Tamil Nadu", lat: 9.2876, lng: 79.3129, description: "Holy Island, Ramanathaswamy Temple" },
  { name: "Kumbakonam", state: "Tamil Nadu", lat: 10.9602, lng: 79.3845, description: "Navagraha Temples City" },
  { name: "Chidambaram", state: "Tamil Nadu", lat: 11.3992, lng: 79.6937, description: "Nataraja Temple & Pichavaram" },
  { name: "Yercaud", state: "Tamil Nadu", lat: 11.7753, lng: 78.2093, description: "Jewel of the South, Shevaroy Hills" },
  { name: "Yelagiri", state: "Tamil Nadu", lat: 12.5784, lng: 78.6399, description: "Hill Station near Jolarpettai" },
  { name: "Theni", state: "Tamil Nadu", lat: 10.0104, lng: 77.4768, description: "Western Ghats, Cardamom City" },
  { name: "Nagercoil", state: "Tamil Nadu", lat: 8.1833, lng: 77.4119, description: "Kanyakumari District HQ" }
];

export const POPULAR_CITIES = POPULAR_CITY_LOCATIONS.map(c => c.name);

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
  siteUrl: "https://tkvdroptaxi.com",
  logoPath: "/images/logo/main.png",
  socialImage: "/images/logo/main.png",
  domainNote: "Production domain configured for TKV Drop Taxi."
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
    image: "/images/services/airport-pickup.png",
    fallbackImage: "/images/services/airport-pickup.png",
    desc: "On-time pickups from Bangalore & Chennai airports with flight tracking."
  },
  {
    id: "airport-drop",
    name: "Airport Drop",
    icon: "plane",
    image: "/images/services/airport-drop.png",
    fallbackImage: "/images/services/airport-drop.png",
    desc: "Relaxed, punctual drop-offs for any domestic or international flight."
  },
  {
    id: "corporate",
    name: "Corporate Travel",
    icon: "briefcase",
    image: "/images/services/corporate-travel.png",
    fallbackImage: "/images/services/corporate-travel.png",
    desc: "Reliable rides for business meetings, tech parks & corporate teams."
  },
  {
    id: "wedding",
    name: "Wedding Travel",
    icon: "heart",
    image: "/images/services/wedding.png",
    fallbackImage: "/images/services/wedding.png",
    desc: "Decorated, on-time premium cars and guest convoys for your big day."
  },
  {
    id: "outstation",
    name: "Outstation Trips",
    icon: "map-package",
    image: "/images/services/outstation.png",
    fallbackImage: "/images/services/outstation.png",
    desc: "Comfortable long-distance travel across Tamil Nadu, Karnataka & beyond."
  },
  {
    id: "temple",
    name: "Temple Tour",
    icon: "mountain",
    image: "/images/services/temple-tour.png",
    fallbackImage: "/images/services/temple-tour.png",
    desc: "Peaceful pilgrimage trips to Tirupati, Madurai, Rameshwaram & Palani."
  },
  {
    id: "family",
    name: "Family Tour",
    icon: "users",
    image: "/images/services/family-tour.png",
    fallbackImage: "/images/services/family-tour.png",
    desc: "Spacious, safe MPVs and Travellers for memorable family vacations."
  },
  {
    id: "business",
    name: "Business Travel",
    icon: "building",
    image: "/images/services/business-travel.png",
    fallbackImage: "/images/services/business-travel.png",
    desc: "Professional chauffeur service for VIP clients and executives."
  },
  {
    id: "medical",
    name: "Hospital & Medical Transit",
    icon: "heart-pulse",
    image: "/images/services/hospital.png",
    fallbackImage: "/images/services/hospital.png",
    desc: "Comfortable, sanitized transit for hospital appointments, checkups & treatments across Bangalore & Chennai."
  },
  {
    id: "hillstation",
    name: "Weekend & Hill Getaways",
    icon: "compass",
    image: "/images/services/weekend.png",
    fallbackImage: "/images/services/weekend.png",
    desc: "Chauffeured scenic trips to Yercaud, Ooty, Kodaikanal, Coorg & Yelagiri with zero return charges."
  },
  {
    id: "packages",
    name: "Tour Packages",
    icon: "mountain",
    image: "/images/services/tour-packages.png",
    fallbackImage: "/images/services/tour-packages.png",
    desc: "Curated hill station & coastal travel packages to Ooty, Kodaikanal & Coorg."
  },
  {
    id: "monthly",
    name: "Monthly Rental",
    icon: "repeat",
    image: "/images/services/home-bg.png",
    fallbackImage: "/images/services/monthly-rental.png",
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
