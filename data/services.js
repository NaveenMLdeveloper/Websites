/**
 * BS Travels - Services Data
 * Detailed list of verified travel and tourist vehicle services based out of Hosur.
 */

const BSTravelsServices = [
  {
    id: "outstation-trips",
    title: "Outstation Trips & Round Tours",
    shortDesc: "Comfortable interstate journeys from Hosur to Tamil Nadu, Karnataka, Kerala, Andhra Pradesh & beyond.",
    icon: "compass",
    badge: "Most Popular",
    details: [
      "Custom multi-day itineraries for leisure and business",
      "Flexible pickup from anywhere in Hosur, Electronic City, or Attibele",
      "Professional highway drivers familiar with ghat roads and scenic routes",
      "Transparent billing by kilometers with daily driver bata"
    ],
    popularRoutes: ["Hosur ↔ Chennai", "Hosur ↔ Coimbatore", "Hosur ↔ Madurai", "Hosur ↔ Mysore", "Hosur ↔ Ooty/Kodaikanal"],
    ctaText: "Enquire Outstation Trip"
  },
  {
    id: "airport-transfers",
    title: "Bangalore Airport (BLR) Pickup & Drop",
    shortDesc: "Punctual, stress-free transfers between Hosur/Krishnagiri and Kempegowda International Airport (BLR).",
    icon: "plane",
    badge: "24/7 Service",
    details: [
      "Guaranteed on-time doorstep pickup in Hosur and surrounding industrial corridors",
      "Real-time flight arrival monitoring for midnight and early morning pickups",
      "Toll-inclusive fast tag passage via STRR / NICE Road / NH routes",
      "Spacious sedans and MPVs with ample luggage room for international travel"
    ],
    popularRoutes: ["Hosur ↔ BLR Airport Terminal 1 & 2", "SIPCOT / Bagalur ↔ BLR Airport"],
    ctaText: "Book Airport Cab"
  },
  {
    id: "pilgrimage-temple-tours",
    title: "Temple Tours & Pilgrimage Packages",
    shortDesc: "Serene and devout pilgrimage journeys across premier South Indian spiritual circuits.",
    icon: "sun",
    badge: "Family Favorite",
    details: [
      "Specialized routes for senior citizens with gentle driving and flexible stops",
      "Experienced drivers well-versed with temple timings, darshan queues, and parking",
      "Clean, pure, and quiet AC vehicles suitable for devotional travel",
      "Custom multi-temple circuits across Tamil Nadu, Andhra, and Karnataka"
    ],
    popularRoutes: ["Tirupati Balaji Darshan", "Palani & Madurai Meenakshi", "Navagraha Temples", "Kanchipuram & Mahabalipuram", "Rameshwaram & Kanyakumari"],
    ctaText: "Plan Temple Tour"
  },
  {
    id: "family-holiday-tours",
    title: "Family Vacations & Hill Station Trips",
    shortDesc: "Memorable holiday trips to Ooty, Coorg, Wayanad, Kodaikanal, Munnar, Yercaud, and Chikmagalur.",
    icon: "mountain",
    badge: "Holiday Special",
    details: [
      "Expert hill-station drivers trained on hairpin bends and mist conditions",
      "Spacious MPVs (Innova Crysta, Ertiga) and Tempo Travellers for combined families",
      "Flexible sightseeing schedules with local point-to-point guidance",
      "Luggage carriers and clean climate-controlled cabin"
    ],
    popularRoutes: ["Hosur ↔ Ooty & Coonoor", "Hosur ↔ Kodaikanal", "Hosur ↔ Wayanad", "Hosur ↔ Coorg & Chikmagalur"],
    ctaText: "Book Vacation Trip"
  },
  {
    id: "corporate-travel",
    title: "Corporate & Business Delegation Travel",
    shortDesc: "Executive mobility for Hosur SIPCOT, Electronic City, and Bangalore industrial hubs.",
    icon: "briefcase",
    badge: "Business Class",
    details: [
      "Spotless, premium executive cars (Innova Crysta, XL6, Executive Sedans)",
      "Courteous, well-groomed, and punctual chauffeurs",
      "GST-compliant printed tax invoices for corporate expense processing",
      "Flexible daily or monthly corporate retention contracts"
    ],
    popularRoutes: ["Hosur SIPCOT ↔ Bangalore Tech Parks", "Factory Audits & Client Visits", "Inter-Plant Executive Travel"],
    ctaText: "Request Corporate Quote"
  },
  {
    id: "wedding-events",
    title: "Wedding & Event Guest Transportation",
    shortDesc: "Coordinated fleet management for marriage ceremonies, family functions, and grand celebrations.",
    icon: "users",
    badge: "Group Transport",
    details: [
      "Fleet coordination with multiple sedans, MPVs, and 14/17 seater Tempo Travellers",
      "Chauffeured guest shuttles between railway stations, airports, hotels, and marriage halls",
      "Dedicated trip coordinator for seamless timing and on-time pickups",
      "Clean, decorated, and spotless vehicles ready for photos and celebrations"
    ],
    popularRoutes: ["Hosur Marriage Halls", "Interstate Guest Pickups", "Reception Convoy Travel"],
    ctaText: "Book Wedding Fleet"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BSTravelsServices;
}
