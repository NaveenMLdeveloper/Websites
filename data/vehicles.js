/**
 * BS Travels - Vehicle Fleet Data
 * Centralized data source for fleet showcase and booking calculators.
 * All vehicles are registered with All India Tourist Permit.
 */

const BSTravelsVehicles = [
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    tagline: "The Gold Standard for Premium Outstation Travel",
    category: "Premium MPV / SUV",
    featured: true,
    capacity: "6+1 / 7+1 Passengers",
    luggage: "4-5 Large Bags",
    fuelType: "Diesel",
    acType: "Dual Zone Powerful Climate Control",
    ratePerKm: 18,
    driverBata: 400,
    nightStayBata: 300,
    minKmPerDay: 250,
    features: [
      "Plush Captain / Bench Seats with Recline",
      "Superior Highway Suspension & Safety",
      "USB Fast Mobile Charging Ports",
      "Ample Boot Space for Luggage",
      "All India Tourist Permit & Commercial Insurance",
      "Regularly Sanitized & Well Maintained"
    ],
    popularFor: "Long-Distance Family Tours, Outstation Trips, Corporate Delegations, Airport Runs",
    image: "images/vehicles/innova-crysta.svg"
  },
  {
    id: "ertiga",
    name: "Maruti Suzuki Ertiga / XL6",
    tagline: "Budget-Friendly Comfort for Medium Families",
    category: "Family MUV",
    featured: true,
    capacity: "6+1 Passengers",
    luggage: "2-3 Medium Bags",
    fuelType: "Petrol / Diesel",
    acType: "Chilled AC with Rear Vents",
    ratePerKm: 15,
    driverBata: 400,
    nightStayBata: 300,
    minKmPerDay: 250,
    features: [
      "Comfortable 3-Row Ergonomic Seating",
      "High Fuel Efficiency & Pocket Friendly",
      "Smooth Highway Driving",
      "Rear Air Conditioning Vents",
      "Commercial Yellow Board with All India Permit",
      "Experienced Hosur-based Chauffeur"
    ],
    popularFor: "Budget Family Outstations, Temple Visits, Weekend Trips, City-to-City Transfers",
    image: "images/vehicles/ertiga.svg"
  },
  {
    id: "tempo-traveller",
    name: "Force Tempo Traveller",
    tagline: "Spacious Group Travel with Maximum Legroom",
    category: "Luxury Tourist Van (12 / 14 / 17 Seater)",
    featured: true,
    capacity: "12 to 17 Passengers",
    luggage: "10-15 Bags (Dedicated Luggage Carrier)",
    fuelType: "Diesel",
    acType: "Heavy-Duty Roof AC Vents per Row",
    ratePerKm: 24,
    driverBata: 600,
    nightStayBata: 400,
    minKmPerDay: 300,
    features: [
      "Individual Pushback Reclining Seats",
      "High Ceiling with Walkway Space",
      "LED TV & High-Quality Music System",
      "Wide Panoramic Tinted Windows",
      "Carrier for Heavy Group Luggage",
      "All State Tourist Permits & Experienced Hill Driver"
    ],
    popularFor: "Group Pilgrimages, College/School Tours, Wedding Events, Extended Holiday Packages",
    image: "images/vehicles/tempo-traveller.svg"
  },
  {
    id: "dzire-etios",
    name: "Swift Dzire / Toyota Etios",
    tagline: "Economical & Swift Sedans for 1-4 Travellers",
    category: "Compact Sedan",
    featured: false,
    capacity: "4+1 Passengers",
    luggage: "2-3 Bags",
    fuelType: "Diesel / Petrol",
    acType: "Standard Air Conditioning",
    ratePerKm: 13,
    driverBata: 350,
    nightStayBata: 300,
    minKmPerDay: 250,
    features: [
      "Compact & Smooth Sedan Comfort",
      "Economical Outstation & One-Way Rates",
      "Clean Interiors with Sanitized Seats",
      "Spacious Trunk Boot for Baggage",
      "GPS Tracking & Verified Driver",
      "Prompt Airport Drop & Pickup Support"
    ],
    popularFor: "Airport Transfers, Couple & Small Family Trips, Business Solo Travel, Urgent Drops",
    image: "images/vehicles/sedan.svg"
  },
  {
    id: "tourist-coach",
    name: "Mini Bus / Tourist Coach (21 to 32 Seater)",
    tagline: "Large Delegations, Corporate Tours & Events",
    category: "Commercial Tourist Coach",
    featured: false,
    capacity: "21 / 25 / 32 Passengers",
    luggage: "Large Storage Underbelly",
    fuelType: "Heavy Diesel",
    acType: "Centralized Ducted Climate Control",
    ratePerKm: 34,
    driverBata: 800,
    nightStayBata: 500,
    minKmPerDay: 300,
    features: [
      "Deluxe 2x2 Pushback Recliner Seats",
      "Air Suspension for Ultra-Smooth Travel",
      "Microphone & Audio-Visual Entertainment",
      "Massive Luggage Capacity",
      "Senior Interstate Tourist Drivers",
      "All State Toll & Tax Documentation Ready"
    ],
    popularFor: "Company Offsites, Large Marriage Parties, Academic Excursions, Multi-Day South India Tours",
    image: "images/vehicles/coach.svg"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BSTravelsVehicles;
}
