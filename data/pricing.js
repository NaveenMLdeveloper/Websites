/**
 * BS Travels - Pricing & Tariff Guidelines
 * Transparent, realistic rate configuration for Hosur tourist vehicles.
 * All bookings include All India Tourist Permit vehicles with commercial insurance.
 */

const BSTravelsPricing = {
  currency: "₹",
  minKmOutstationPerDay: 250,
  nightTimeStart: "22:00", // 10 PM
  nightTimeEnd: "06:00",   // 6 AM
  notes: {
    disclaimer: "All rates shown are transparent estimates based on standard route parameters. Final fare is confirmed upon availability, specific toll routes, and permit states.",
    tollsParking: "Tolls, state entry permits, and parking charges are payable at actuals by the guest or can be included upon custom quote request.",
    driverBata: "Driver bata covers driver food and daily maintenance allowance for each calendar day (6:00 AM to 10:00 PM).",
    nightAllowance: "Night driving / night stay allowance applies when driving or staying between 10:00 PM and 6:00 AM."
  },
  rateCards: [
    {
      vehicleId: "innova-crysta",
      name: "Toyota Innova Crysta (6+1 / 7+1)",
      category: "Premium MPV",
      perKmRate: 18,
      driverBataPerDay: 400,
      nightStayPerNight: 300,
      minKmDay: 250,
      idealFor: "Premium family outstations & long journeys"
    },
    {
      vehicleId: "ertiga",
      name: "Maruti Ertiga / XL6 (6+1)",
      category: "Family MUV",
      perKmRate: 15,
      driverBataPerDay: 400,
      nightStayPerNight: 300,
      minKmDay: 250,
      idealFor: "Economical family trips & temple circuits"
    },
    {
      vehicleId: "tempo-traveller",
      name: "Force Tempo Traveller (12-17 Seater)",
      category: "Tourist Van",
      perKmRate: 24,
      driverBataPerDay: 600,
      nightStayPerNight: 400,
      minKmDay: 300,
      idealFor: "Large group tours, family functions & excursions"
    },
    {
      vehicleId: "dzire-etios",
      name: "Swift Dzire / Toyota Etios (4+1)",
      category: "Compact Sedan",
      perKmRate: 13,
      driverBataPerDay: 350,
      nightStayPerNight: 300,
      minKmDay: 250,
      idealFor: "Airport drops, couples & executive drops"
    },
    {
      vehicleId: "tourist-coach",
      name: "Tourist Coach (21-32 Seater)",
      category: "Luxury Mini Bus",
      perKmRate: 34,
      driverBataPerDay: 800,
      nightStayPerNight: 500,
      minKmDay: 300,
      idealFor: "Marriage functions & corporate offsites"
    }
  ],
  popularEstimates: [
    {
      route: "Hosur to Bangalore Airport (BLR)",
      distance: "Approx. 85 KM (One Way)",
      recommendedVehicle: "Dzire / Ertiga / Innova",
      duration: "Approx. 2 - 2.5 Hours",
      type: "Airport Drop / Pickup"
    },
    {
      route: "Hosur to Tirupati Temple",
      distance: "Approx. 240 KM (One Way) / 500 KM (Round Trip)",
      recommendedVehicle: "Innova Crysta / Ertiga / Tempo Traveller",
      duration: "1 - 2 Days",
      type: "Pilgrimage Tour"
    },
    {
      route: "Hosur to Chennai",
      distance: "Approx. 310 KM (One Way) / 630 KM (Round Trip)",
      recommendedVehicle: "Innova Crysta / Sedan",
      duration: "1 - 2 Days",
      type: "Outstation Trip"
    },
    {
      route: "Hosur to Ooty / Kodaikanal",
      distance: "Approx. 340 KM (One Way) / 720 KM (Round Trip)",
      recommendedVehicle: "Innova Crysta / Tempo Traveller",
      duration: "3 - 4 Days",
      type: "Hill Station Holiday"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BSTravelsPricing;
}
