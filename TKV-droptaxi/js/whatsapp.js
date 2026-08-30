/**
 * BS Travels - WhatsApp Link & Message Generator
 * Centralized WhatsApp automation for enquiries, vehicle bookings, and fare estimates.
 */

const BSTravelsContact = {
  phoneDisplay: "+91 97862 84326",
  phoneRaw: "919786284326",
  telLink: "tel:+919786284326",
  whatsappBase: "https://wa.me/919786284326",
  emailDisplay: "support@bstravelshosur.com",
  address: "2nd Cross Narashamma Colony, Krishnagiri ByePass Road, Suzuki Showroom back Side, Hosur - 635109.",
  locationName: "Hosur, Tamil Nadu",
  permitType: "ALL INDIA TOURIST PERMIT"
};

/**
 * Encodes text into a WhatsApp direct link
 */
function getWhatsAppUrl(message) {
  return `${BSTravelsContact.whatsappBase}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Generate message for general enquiry
 */
function getGeneralEnquiryMessage(topic = "Travel Booking") {
  return `Hello BS Travels,

I would like to enquire about travel services from Hosur.

Topic: ${topic}
Permit: All India Tourist Permit Enquiry

Please let me know availability and vehicle options.

Thank you.`;
}

/**
 * Generate message for specific vehicle booking
 */
function getVehicleBookingMessage(vehicleName, details = {}) {
  const tripType = details.tripType || "Outstation Trip";
  const pickupDate = details.pickupDate || "Upcoming Date";
  const pickup = details.pickup || "Hosur";
  const destination = details.destination || "Not specified";
  const passengers = details.passengers || "4-6";

  return `Hello BS Travels,

I would like to enquire about booking a vehicle.

🚗 Vehicle: ${vehicleName}
📍 Pickup Location: ${pickup}
🎯 Destination: ${destination}
🗓️ Travel Date: ${pickupDate}
👥 Passengers: ${passengers}
🛣️ Trip Type: ${tripType}

Please check vehicle availability and share the best quote.

Thank you.`;
}

/**
 * Generate message for specific service enquiry
 */
function getServiceEnquiryMessage(serviceTitle, notes = "") {
  return `Hello BS Travels,

I am interested in your "${serviceTitle}" service from Hosur.

Service: ${serviceTitle}
${notes ? `Notes: ${notes}\n` : ""}
Please share vehicle options, rate guidelines, and booking details.

Thank you.`;
}

/**
 * Generate message for Fare Calculator Estimate
 */
function getCalculatorEstimateMessage(calcData) {
  const {
    vehicleName = "Toyota Innova Crysta",
    tripType = "Round Trip",
    distanceKm = 300,
    days = 2,
    nightStay = "No",
    baseFare = 0,
    driverAllowance = 0,
    nightStayFee = 0,
    estimatedTotal = 0,
    pickupLocation = "Hosur",
    dropLocation = ""
  } = calcData;

  return `Hello BS Travels,

I would like to enquire about a travel booking estimate generated on your website.

🚗 Vehicle: ${vehicleName}
🛣️ Trip Type: ${tripType}
📍 Route: ${pickupLocation} ${dropLocation ? "→ " + dropLocation : ""}
📏 Distance: ${distanceKm} KM
🗓️ Number of Days: ${days} Day(s)
🌙 Night Stay: ${nightStay}

💰 Estimated Fare Breakdown:
• Base Travel Fare: ₹${baseFare.toLocaleString('en-IN')}
• Driver Bata: Extra
${nightStayFee > 0 ? `• Night Stay: ₹${nightStayFee.toLocaleString('en-IN')}\n` : ""}• Estimated Total: ₹${estimatedTotal.toLocaleString('en-IN')}

Please confirm vehicle availability and the final confirmed fare.

Thank you.`;
}

// Global click handler helper for WhatsApp elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-wa-action]').forEach(element => {
    element.addEventListener('click', (e) => {
      const action = element.getAttribute('data-wa-action');
      let url = BSTravelsContact.whatsappBase;

      if (action === 'general') {
        const topic = element.getAttribute('data-wa-topic') || "Travel Service";
        url = getWhatsAppUrl(getGeneralEnquiryMessage(topic));
      } else if (action === 'vehicle') {
        const vehicle = element.getAttribute('data-wa-vehicle') || "Toyota Innova Crysta";
        url = getWhatsAppUrl(getVehicleBookingMessage(vehicle));
      } else if (action === 'service') {
        const service = element.getAttribute('data-wa-service') || "Outstation Trip";
        url = getWhatsAppUrl(getServiceEnquiryMessage(service));
      }

      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BSTravelsContact,
    getWhatsAppUrl,
    getGeneralEnquiryMessage,
    getVehicleBookingMessage,
    getServiceEnquiryMessage,
    getCalculatorEstimateMessage
  };
}
