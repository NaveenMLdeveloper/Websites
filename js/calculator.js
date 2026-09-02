/**
 * BS Travels - Fare Calculator Engine
 * Calculates transparent, realistic fare estimates for Outstation, Airport, and Rental trips.
 */

class BSTravelsFareCalculator {
  constructor(containerId = "fare-calculator-container") {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.state = {
      tripType: "round-trip", // 'round-trip', 'one-way', 'rental'
      vehicleId: "innova-crysta",
      distanceKm: 300,
      days: 2,
      nightStay: true,
      pickup: "Hosur",
      destination: "",
      rentalPackage: "8-80" // 8 hrs 80 km, 12 hrs 120 km for rentals
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.calculateAndRender();
  }

  getVehicleData(id) {
    if (typeof BSTravelsVehicles !== 'undefined' && Array.isArray(BSTravelsVehicles)) {
      const found = BSTravelsVehicles.find(v => v.id === id);
      if (found) return found;
    }
    // Fallback defaults
    return {
      id: "innova-crysta",
      name: "Toyota Innova Crysta",
      ratePerKm: 18,
      driverBata: 400,
      nightStayBata: 300,
      minKmPerDay: 250
    };
  }

  bindEvents() {
    // Trip type selection buttons / radio
    const tripTypeBtns = this.container.querySelectorAll('[data-calc-trip-type]');
    tripTypeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        tripTypeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.tripType = btn.getAttribute('data-calc-trip-type');
        this.updateTripTypeUI();
        this.calculateAndRender();
      });
    });

    // Vehicle dropdown or vehicle radio cards
    const vehicleSelect = this.container.querySelector('#calc-vehicle-select');
    if (vehicleSelect) {
      vehicleSelect.addEventListener('change', (e) => {
        this.state.vehicleId = e.target.value;
        this.calculateAndRender();
      });
    }

    // Distance input and range slider
    const distanceInput = this.container.querySelector('#calc-distance-input');
    const distanceRange = this.container.querySelector('#calc-distance-range');

    if (distanceInput && distanceRange) {
      distanceInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value, 10) || 0;
        if (val < 10) val = 10;
        this.state.distanceKm = val;
        distanceRange.value = Math.min(val, 2000);
        this.calculateAndRender();
      });

      distanceRange.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10) || 100;
        this.state.distanceKm = val;
        distanceInput.value = val;
        this.calculateAndRender();
      });
    }

    // Days counter (+/- buttons)
    const daysMinus = this.container.querySelector('#calc-days-minus');
    const daysPlus = this.container.querySelector('#calc-days-plus');
    const daysInput = this.container.querySelector('#calc-days-input');

    if (daysInput) {
      daysInput.addEventListener('change', (e) => {
        let val = parseInt(e.target.value, 10) || 1;
        if (val < 1) val = 1;
        if (val > 30) val = 30;
        this.state.days = val;
        daysInput.value = val;
        this.calculateAndRender();
      });
    }

    if (daysMinus && daysInput) {
      daysMinus.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.state.days > 1) {
          this.state.days--;
          daysInput.value = this.state.days;
          this.calculateAndRender();
        }
      });
    }

    if (daysPlus && daysInput) {
      daysPlus.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.state.days < 30) {
          this.state.days++;
          daysInput.value = this.state.days;
          this.calculateAndRender();
        }
      });
    }

    // Night Stay toggle checkbox
    const nightStayToggle = this.container.querySelector('#calc-night-stay');
    if (nightStayToggle) {
      nightStayToggle.addEventListener('change', (e) => {
        this.state.nightStay = e.target.checked;
        this.calculateAndRender();
      });
    }

    // Route quick presets (Tirupati, Airport, Chennai, Ooty, etc.)
    const presetBtns = this.container.querySelectorAll('[data-route-km]');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const km = parseInt(btn.getAttribute('data-route-km'), 10);
        const days = parseInt(btn.getAttribute('data-route-days') || '1', 10);
        const dest = btn.getAttribute('data-route-dest') || '';

        this.state.distanceKm = km;
        this.state.days = days;
        this.state.destination = dest;

        if (distanceInput) distanceInput.value = km;
        if (distanceRange) distanceRange.value = Math.min(km, 2000);
        if (daysInput) daysInput.value = days;

        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.calculateAndRender();
      });
    });

    // WhatsApp Action Button
    const waBtn = this.container.querySelector('#calc-whatsapp-btn');
    if (waBtn) {
      waBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.sendWhatsAppEstimate();
      });
    }
  }

  updateTripTypeUI() {
    const daysContainer = this.container.querySelector('#calc-days-group');
    const nightStayGroup = this.container.querySelector('#calc-night-group');
    const distanceLabel = this.container.querySelector('#calc-distance-label');

    if (this.state.tripType === 'one-way') {
      if (daysContainer) daysContainer.style.display = 'none';
      if (nightStayGroup) nightStayGroup.style.display = 'none';
      if (distanceLabel) distanceLabel.textContent = 'Drop Distance in KM (One-Way)';
      this.state.days = 1;
      this.state.nightStay = false;
    } else if (this.state.tripType === 'rental') {
      if (daysContainer) daysContainer.style.display = 'block';
      if (nightStayGroup) nightStayGroup.style.display = 'block';
      if (distanceLabel) distanceLabel.textContent = 'Estimated Local Usage in KM';
    } else {
      // Round trip
      if (daysContainer) daysContainer.style.display = 'block';
      if (nightStayGroup) nightStayGroup.style.display = 'block';
      if (distanceLabel) distanceLabel.textContent = 'Total Round-Trip Distance in KM';
    }
  }

  calculateFare() {
    const vehicle = this.getVehicleData(this.state.vehicleId);
    const { tripType, distanceKm, days, nightStay } = this.state;

    let billableKm = distanceKm;
    let minKm = (vehicle.minKmPerDay || 250) * days;

    // For round trip, standard travel min distance applies
    if (tripType === 'round-trip') {
      billableKm = Math.max(distanceKm, minKm);
    } else if (tripType === 'one-way') {
      // One-way drops usually charge for base distance or standard minimum
      billableKm = Math.max(distanceKm, 100);
    }

    const ratePerKm = vehicle.ratePerKm || 18;
    const baseFare = billableKm * ratePerKm;
    const driverAllowance = (vehicle.driverBata || 400) * days;
    const nightStayFee = nightStay ? ((vehicle.nightStayBata || 300) * (days > 1 ? days - 1 : 1)) : 0;
    
    const estimatedTotal = baseFare + driverAllowance + nightStayFee;

    return {
      vehicle,
      billableKm,
      minKm,
      ratePerKm,
      baseFare,
      driverAllowance,
      nightStayFee,
      estimatedTotal,
      days,
      distanceKm,
      nightStay: nightStay ? "Yes" : "No",
      tripTypeName: tripType === 'round-trip' ? 'Round Trip' : (tripType === 'one-way' ? 'One Way Drop' : 'Local Rental')
    };
  }

  calculateAndRender() {
    const result = this.calculateFare();
    this.currentResult = result;

    // Render result breakdown
    const vehicleNameEl = this.container.querySelector('#calc-res-vehicle-name');
    const vehicleCatEl = this.container.querySelector('#calc-res-vehicle-category');
    const baseFareEl = this.container.querySelector('#calc-res-base-fare');
    const driverBataEl = this.container.querySelector('#calc-res-driver-bata');
    const nightStayEl = this.container.querySelector('#calc-res-night-stay');
    const nightStayRow = this.container.querySelector('#calc-res-night-row');
    const totalEl = this.container.querySelector('#calc-res-total');
    const totalMobileEl = this.container.querySelector('#calc-res-total-mobile');
    const rateNoteEl = this.container.querySelector('#calc-res-rate-note');

    if (vehicleNameEl) vehicleNameEl.textContent = result.vehicle.name;
    if (vehicleCatEl) vehicleCatEl.textContent = `${result.vehicle.capacity || '6+1'} • AC Tourist Vehicle`;
    
    if (baseFareEl) {
      baseFareEl.textContent = `₹${result.baseFare.toLocaleString('en-IN')}`;
    }

    if (driverBataEl) {
      driverBataEl.textContent = `₹${result.driverAllowance.toLocaleString('en-IN')}`;
    }

    if (nightStayRow) {
      if (result.nightStayFee > 0) {
        nightStayRow.style.display = 'flex';
        if (nightStayEl) nightStayEl.textContent = `₹${result.nightStayFee.toLocaleString('en-IN')}`;
      } else {
        nightStayRow.style.display = 'none';
      }
    }

    if (totalEl) {
      totalEl.textContent = `₹${result.estimatedTotal.toLocaleString('en-IN')}`;
    }
    if (totalMobileEl) {
      totalMobileEl.textContent = `₹${result.estimatedTotal.toLocaleString('en-IN')}`;
    }

    if (rateNoteEl) {
      rateNoteEl.textContent = `Calculated at ₹${result.ratePerKm}/KM for ${result.billableKm} KM (${result.days} Day${result.days > 1 ? 's' : ''})`;
    }
  }

  sendWhatsAppEstimate() {
    if (!this.currentResult) return;
    const res = this.currentResult;

    if (typeof getCalculatorEstimateMessage === 'function' && typeof getWhatsAppUrl === 'function') {
      const msg = getCalculatorEstimateMessage({
        vehicleName: res.vehicle.name,
        tripType: res.tripTypeName,
        distanceKm: res.distanceKm,
        days: res.days,
        nightStay: res.nightStay,
        baseFare: res.baseFare,
        driverAllowance: res.driverAllowance,
        nightStayFee: res.nightStayFee,
        estimatedTotal: res.estimatedTotal,
        pickupLocation: this.state.pickup,
        dropLocation: this.state.destination
      });

      const url = getWhatsAppUrl(msg);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('fare-calculator-container')) {
    window.bsCalculator = new BSTravelsFareCalculator('fare-calculator-container');
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BSTravelsFareCalculator;
}
