import React, { useState, useEffect, useMemo, FormEvent } from 'react';
import {
  CONFIG,
  VEHICLES,
  SERVICES,
  REVIEWS,
  POPULAR_CITIES,
  POPULAR_DISTANCES,
  Vehicle
} from './data/travelData';
import {
  PhoneIcon,
  WhatsAppIcon,
  CheckIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  UsersIcon,
  GpsIcon,
  SparkleIcon,
  ShieldIcon,
  TagIcon,
  TimerIcon,
  StarIcon,
  PlaneIcon,
  BuildingIcon,
  HeartIcon,
  MountainIcon,
  BriefcaseIcon,
  SchoolIcon,
  BookIcon,
  MapPackageIcon,
  RepeatIcon,
  MailIcon,
  PinIcon,
  MenuIcon,
  XIcon,
  CarVectorIcon,
  VanVectorIcon,
  BusVectorIcon,
  SnowIcon,
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  GooglePlayColorIcon,
  AppleStoreWhiteIcon
} from './components/Icons';
import brandLogo from '../images/logo/main.png';

export default function App() {
  // Mobile drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Hero Booking Form State (Sim Drop Taxi style)
  const [heroTripType, setHeroTripType] = useState<'oneway' | 'roundtrip' | 'outstation'>('oneway');
  const [heroPickup, setHeroPickup] = useState('Hosur');
  const [heroDrop, setHeroDrop] = useState('Chennai');
  const [heroDate, setHeroDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [heroTime, setHeroTime] = useState('08:00 AM');
  const [heroVehicleId, setHeroVehicleId] = useState('dzire');
  const [heroName, setHeroName] = useState('');
  const [heroPhone, setHeroPhone] = useState('');

  // Fare calculator state
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip' | 'rental'>('oneway');
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);
  const [distanceKm, setDistanceKm] = useState<number>(120);
  const [numDays, setNumDays] = useState<number>(1);
  const [nightStay, setNightStay] = useState(false);
  const [driverAllowance, setDriverAllowance] = useState(true);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactTrip, setContactTrip] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Animated counters
  const [countYears, setCountYears] = useState(0);
  const [countTrips, setCountTrips] = useState(0);
  const [countVehicles, setCountVehicles] = useState(0);
  const [countHours, setCountHours] = useState(0);

  // Current year for footer
  const currentYear = new Date().getFullYear();

  // Selected vehicle in hero
  const heroSelectedVehicle = useMemo(() => {
    return VEHICLES.find(v => v.id === heroVehicleId) || VEHICLES[0];
  }, [heroVehicleId]);

  // Distance calculation for hero
  const heroDistance = useMemo(() => {
    const p = heroPickup.trim().toLowerCase();
    const d = heroDrop.trim().toLowerCase();
    const key = `${p}-${d}`;
    if (POPULAR_DISTANCES[key]) return POPULAR_DISTANCES[key];
    return 120;
  }, [heroPickup, heroDrop]);

  // Estimation for hero form
  const heroEstimate = useMemo(() => {
    const effectiveDistance = heroTripType === 'roundtrip' ? heroDistance * 2 : heroDistance;
    const billedKm = Math.max(effectiveDistance, heroSelectedVehicle.minKm);
    let fare = billedKm * heroSelectedVehicle.rate;
    
    if (heroTripType === 'roundtrip') {
      fare += 700; // Includes day allowance
    } else if (heroTripType === 'outstation') {
      fare += 700;
    }

    return {
      distance: effectiveDistance,
      billedKm,
      rate: heroSelectedVehicle.rate,
      total: Math.round(fare),
      zeroReturn: heroTripType === 'oneway'
    };
  }, [heroDistance, heroSelectedVehicle, heroTripType]);

  // Format currency in Indian Rupees format (e.g. ₹1,400)
  const formatINR = (val: number) => {
    return '\u20B9' + Math.round(val).toLocaleString('en-IN');
  };

  // Generate WhatsApp estimation link for Hero
  const getHeroWhatsAppUrl = () => {
    const tripLabel = heroTripType === 'oneway' 
      ? 'One Way Drop Taxi' 
      : heroTripType === 'roundtrip' 
        ? 'Round Trip Taxi' 
        : 'Outstation / Airport Taxi';
    
    const message = `*BOOK YOUR TAXI - INSTANT ESTIMATION*\n` +
      `----------------------------------------\n` +
      `\u2022 *Trip Type:* ${tripLabel}\n` +
      `\u2022 *From:* ${heroPickup || 'Hosur'}\n` +
      `\u2022 *To:* ${heroDrop || 'Chennai'}\n` +
      `\u2022 *Date & Time:* ${heroDate || 'Today'} at ${heroTime || 'Now'}\n` +
      `\u2022 *Vehicle:* ${heroSelectedVehicle.name} (${heroSelectedVehicle.type.toUpperCase()})\n` +
      `\u2022 *Approx Distance:* ${heroEstimate.distance} km\n` +
      `\u2022 *Base Rate:* \u20B9${heroEstimate.rate}/km\n` +
      `\u2022 *Estimated Total:* ${formatINR(heroEstimate.total)} ${heroEstimate.zeroReturn ? '(Zero Return Charges!)' : ''}\n` +
      (heroName ? `\u2022 *Passenger Name:* ${heroName}\n` : '') +
      (heroPhone ? `\u2022 *WhatsApp / Phone:* ${heroPhone}\n` : '') +
      `----------------------------------------\n` +
      `Please confirm availability and dispatch details.`;

    const params = new URLSearchParams({ text: message });
    return `https://wa.me/${CONFIG.whatsapp}?${params.toString()}`;
  };

  // Swap pickup & drop
  const handleSwapCities = () => {
    const temp = heroPickup;
    setHeroPickup(heroDrop);
    setHeroDrop(temp);
  };

  // Scroll listener for sticky navbar & active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = ['home', 'fleet', 'services', 'fare-calculator', 'about', 'contact'];
      const scrollPos = window.scrollY + 160;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Counter animation on initial load
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1500;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCountYears(Math.floor(ease * 12));
      setCountTrips(Math.floor(ease * 500));
      setCountVehicles(Math.floor(ease * 8));
      setCountHours(Math.floor(ease * 24));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCountYears(12);
        setCountTrips(500);
        setCountVehicles(8);
        setCountHours(24);
      }
    };

    requestAnimationFrame(step);
  }, []);

  // Selected vehicle object
  const currentVehicle: Vehicle = VEHICLES[selectedVehicleIndex] || VEHICLES[0];

  // Fare calculations
  const calculation = useMemo(() => {
    const dist = Math.max(distanceKm || 1, 1);
    const days = Math.max(numDays || 1, 1);

    let effectiveKm = dist;
    if (tripType === 'roundtrip') {
      effectiveKm = dist * 2;
    }
    const billedKm = Math.max(effectiveKm, currentVehicle.minKm);

    let baseFare = billedKm * currentVehicle.rate;
    if (tripType === 'rental') {
      baseFare = currentVehicle.rate * dist * days;
    }

    const bata = driverAllowance ? 700 * days : 0;
    const night = nightStay ? 300 * days : 0;
    const toll = Math.round(billedKm * 1.5);
    const subtotal = baseFare + bata + night + toll;
    const gst = subtotal * 0.05;
    const total = subtotal + gst;

    return {
      billedKm,
      baseFare,
      bata,
      night,
      toll,
      gst,
      total,
      days,
      dist
    };
  }, [tripType, currentVehicle, distanceKm, numDays, nightStay, driverAllowance]);

  // Generate WhatsApp message for calculator
  const getWhatsAppQuoteUrl = () => {
    const tripLabel = tripType === 'oneway' ? 'One Way' : tripType === 'roundtrip' ? 'Round Trip' : 'Rental';
    const message = `Hi Bhuvaneshvari Travels, I'd like a fare quote:\n• Vehicle: ${currentVehicle.name}\n• Trip Type: ${tripLabel}\n• Distance: ${calculation.dist} km\n• Days: ${calculation.days}\n• Estimated Fare: ${formatINR(calculation.total)}\nPlease confirm vehicle availability.`;
    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  // Vehicle specific booking URL
  const getVehicleBookingUrl = (vName: string) => {
    const msg = `Hi Bhuvaneshvari Travels, I'd like to book the ${vName}. Please share availability and fare.`;
    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  // Quick message form handler
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);

    const msg = `Hi Bhuvaneshvari Travels, my name is ${contactName || '—'} (${contactPhone || '—'}). Trip details: ${contactTrip || 'Please contact me.'}`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');

    setContactName('');
    setContactPhone('');
    setContactTrip('');
  };

  // Render Service Icon helper
  const renderServiceIcon = (icon: string) => {
    switch (icon) {
      case 'plane':
        return <PlaneIcon className="w-5 h-5" />;
      case 'briefcase':
        return <BriefcaseIcon className="w-5 h-5" />;
      case 'heart':
        return <HeartIcon className="w-5 h-5" />;
      case 'map-package':
        return <MapPackageIcon className="w-5 h-5" />;
      case 'mountain':
        return <MountainIcon className="w-5 h-5" />;
      case 'users':
        return <UsersIcon className="w-5 h-5" />;
      case 'building':
        return <BuildingIcon className="w-5 h-5" />;
      case 'school':
        return <SchoolIcon className="w-5 h-5" />;
      case 'book':
        return <BookIcon className="w-5 h-5" />;
      case 'repeat':
        return <RepeatIcon className="w-5 h-5" />;
      default:
        return <SparkleIcon className="w-5 h-5" />;
    }
  };

  // Render Vehicle Vector Icon helper
  const renderVehicleIcon = (type: string) => {
    switch (type) {
      case 'sedan':
        return <CarVectorIcon className="w-20 h-auto text-[#0F3D91]" />;
      case 'suv':
        return <VanVectorIcon className="w-20 h-auto text-[#0F3D91]" />;
      case 'tempo':
      case 'bus':
        return <BusVectorIcon className="w-20 h-auto text-[#0F3D91]" />;
      default:
        return <CarVectorIcon className="w-20 h-auto text-[#0F3D91]" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      {/* ============ HEADER / NAV ============ */}
      <header className={`nav-wrap ${scrolled ? 'scrolled' : ''}`} id="navWrap">
        <div className="container nav">
          <a href="#home" className="logo" id="headerLogo">
            <img className="brand-image" src={brandLogo} alt="TKV Drop Taxi" />
          </a>

          <nav className="nav-links" id="navLinks">
            <a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a>
            <a href="#fleet" className={activeSection === 'fleet' ? 'active' : ''}>Fleet</a>
            <a href="#services" className={activeSection === 'services' ? 'active' : ''}>Services</a>
            <a href="#fare-calculator" className={activeSection === 'fare-calculator' ? 'active' : ''}>Fare Calculator</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
          </nav>

          <div className="nav-cta">
            <a href={`tel:${CONFIG.phone}`} className="btn btn-outline btn-sm" id="navCallBtn">
              <PhoneIcon /> Call
            </a>
            <a
              href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.defaultWaMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              id="navWaBtn"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>

          <button
            className="nav-burger"
            id="burgerBtn"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* ============ MOBILE DRAWER ============ */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <div className="mobile-menu-top">
          <a href="#home" className="logo" onClick={() => setMobileMenuOpen(false)}>
            <img className="brand-image" src={brandLogo} alt="TKV Drop Taxi" />
          </a>
          <button
            className="mobile-menu-close"
            id="mobileMenuClose"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <XIcon />
          </button>
        </div>

        <a href="#home" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
        <a href="#fleet" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Fleet</a>
        <a href="#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
        <a href="#fare-calculator" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Fare Calculator</a>
        <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
        <a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>

        <div className="mobile-menu-cta">
          <a href={`tel:${CONFIG.phone}`} className="btn btn-primary btn-block">
            <PhoneIcon /> Call Now
          </a>
          <a
            href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.defaultWaMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-block"
          >
            <WhatsAppIcon /> Book on WhatsApp
          </a>
        </div>
      </div>

      <main className="flex-1">
        {/* ============ HERO (CLEAN BLUE & WHITE THEME) ============ */}
        <section className="hero-clean-section" id="home">
          <div className="container">
            <div className="hero-clean-grid">
              {/* Left Column: Hero Content & Car Visual */}
              <div className="hero-left-content">
                <div className="hero-clean-badge">
                  <span className="clean-dot"></span>
                  TKV Drop Taxi Hosur · 15+ Years of Trust
                </div>

                <h1 className="hero-clean-headline">
                  Your Journey.<br />
                  <span className="hero-headline-accent">Our Responsibility.</span>
                </h1>

                <p className="hero-clean-lead">
                  Safe, reliable and on-time drop taxi across Hosur, Bangalore, Chennai and beyond. Transparent one-way drops with zero return fare.
                </p>

                {/* 3 Clean Icon Features from reference image */}
                <div className="hero-clean-features">
                  <div className="clean-feature-item">
                    <div className="clean-feature-icon">
                      <UserIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="clean-feature-label">Verified Drivers</span>
                  </div>

                  <div className="clean-feature-item">
                    <div className="clean-feature-icon">
                      <ClockIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="clean-feature-label">On-Time Pickup</span>
                  </div>

                  <div className="clean-feature-item">
                    <div className="clean-feature-icon">
                      <ShieldIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="clean-feature-label">Safe &amp; Comfortable</span>
                  </div>
                </div>

                {/* Interactive Action Buttons with animated effects */}
                <div className="hero-action-buttons">
                  <a
                    href={`tel:${CONFIG.phone}`}
                    className="hero-action-btn hero-call-action-btn"
                    id="heroCallActionBtn"
                  >
                    <span className="action-btn-glow"></span>
                    <span className="action-icon-circle call-circle-glow">
                      <PhoneIcon className="w-5 h-5 text-white animate-pulse" />
                    </span>
                    <div className="action-btn-text">
                      <span className="action-btn-sub">24×7 Instant Dispatch</span>
                      <span className="action-btn-main">Call {CONFIG.phoneFormatted}</span>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.defaultWaMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-action-btn hero-wa-action-btn"
                    id="heroWaActionBtn"
                  >
                    <span className="action-btn-glow"></span>
                    <span className="action-icon-circle wa-circle-glow">
                      <WhatsAppIcon className="w-5 h-5 text-white" />
                    </span>
                    <div className="action-btn-text">
                      <span className="action-btn-sub">Instant Fare &amp; Booking</span>
                      <span className="action-btn-main">WhatsApp Chat</span>
                    </div>
                  </a>
                </div>

                {/* Trust Highlights */}
                <div className="hero-trust-row">
                  <span className="trust-pill"><CheckIcon className="w-3.5 h-3.5 text-[#16A34A]" /> Zero Return Fare</span>
                  <span className="trust-pill"><CheckIcon className="w-3.5 h-3.5 text-[#16A34A]" /> Sanitized AC Cabs</span>
                  <span className="trust-pill"><CheckIcon className="w-3.5 h-3.5 text-[#16A34A]" /> Instant Dispatch</span>
                </div>
              </div>

              {/* Right Column: Simplified "Book Your Ride" Card */}
              <div className="hero-clean-card" id="heroBookingCard">
                <h2 className="clean-card-title">Book Your Ride</h2>

                {/* Clean Trip Type Tabs */}
                <div className="clean-trip-tabs">
                  <button
                    type="button"
                    className={`clean-trip-tab ${heroTripType === 'oneway' ? 'active' : ''}`}
                    onClick={() => setHeroTripType('oneway')}
                    id="heroTabOneWay"
                  >
                    One Way Drop
                  </button>
                  <button
                    type="button"
                    className={`clean-trip-tab ${heroTripType === 'roundtrip' ? 'active' : ''}`}
                    onClick={() => setHeroTripType('roundtrip')}
                    id="heroTabRound"
                  >
                    Round Trip
                  </button>
                  <button
                    type="button"
                    className={`clean-trip-tab ${heroTripType === 'outstation' ? 'active' : ''}`}
                    onClick={() => setHeroTripType('outstation')}
                    id="heroTabOutstation"
                  >
                    Airport / Rental
                  </button>
                </div>

                {/* Simple Form Fields */}
                <div className="clean-form-fields">
                  {/* From Field */}
                  <div className="clean-field-group">
                    <label htmlFor="heroPickupInput">From</label>
                    <div className="clean-input-wrap">
                      <PinIcon className="clean-input-icon text-[#1E40AF]" />
                      <input
                        type="text"
                        id="heroPickupInput"
                        value={heroPickup}
                        onChange={(e) => setHeroPickup(e.target.value)}
                        placeholder="Pickup Location"
                        className="clean-input"
                      />
                    </div>
                  </div>

                  {/* To Field */}
                  <div className="clean-field-group">
                    <div className="flex items-center justify-between">
                      <label htmlFor="heroDropInput">To</label>
                      <button
                        type="button"
                        onClick={handleSwapCities}
                        className="text-[11px] font-semibold text-[#1E40AF] hover:underline flex items-center gap-1 cursor-pointer"
                        title="Swap Pickup and Drop"
                      >
                        ⇄ Swap
                      </button>
                    </div>
                    <div className="clean-input-wrap">
                      <PinIcon className="clean-input-icon text-[#16A34A]" />
                      <input
                        type="text"
                        id="heroDropInput"
                        value={heroDrop}
                        onChange={(e) => setHeroDrop(e.target.value)}
                        placeholder="Drop Location"
                        className="clean-input"
                      />
                    </div>
                  </div>

                  {/* Date & Time Row */}
                  <div className="clean-fields-row">
                    <div className="clean-field-group">
                      <label htmlFor="heroDateInput">Date</label>
                      <div className="clean-input-wrap">
                        <ClockIcon className="clean-input-icon text-[#64748B]" />
                        <input
                          type="date"
                          id="heroDateInput"
                          value={heroDate}
                          onChange={(e) => setHeroDate(e.target.value)}
                          className="clean-input"
                        />
                      </div>
                    </div>

                    <div className="clean-field-group">
                      <label htmlFor="heroTimeInput">Time</label>
                      <div className="clean-input-wrap">
                        <select
                          id="heroTimeInput"
                          value={heroTime}
                          onChange={(e) => setHeroTime(e.target.value)}
                          className="clean-select"
                        >
                          <option value="06:00 AM">06:00 AM</option>
                          <option value="08:00 AM">08:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="03:00 PM">03:00 PM</option>
                          <option value="06:00 PM">06:00 PM</option>
                          <option value="09:00 PM">09:00 PM</option>
                          <option value="11:30 PM">11:30 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Passengers & Vehicle Dropdown */}
                  <div className="clean-field-group">
                    <label htmlFor="heroVehicleSelect">Passengers &amp; Vehicle</label>
                    <div className="clean-input-wrap">
                      <UserIcon className="clean-input-icon text-[#64748B]" />
                      <select
                        id="heroVehicleSelect"
                        value={heroVehicleId}
                        onChange={(e) => setHeroVehicleId(e.target.value)}
                        className="clean-select"
                      >
                        <option value="dzire">4 Passengers — Swift Dzire (₹14/km)</option>
                        <option value="etios">4 Passengers — Toyota Etios (₹15/km)</option>
                        <option value="ertiga">6 Passengers — Maruti Ertiga (₹16/km)</option>
                        <option value="innova">7 Passengers — Toyota Innova (₹18/km)</option>
                        <option value="crysta">7 Passengers — Innova Crysta (₹21/km)</option>
                        <option value="tt12">12 Passengers — Force Traveller (₹26/km)</option>
                        <option value="tt17">17 Passengers — Luxury Traveller (₹26/km)</option>
                        <option value="minibus">25 Passengers — Mini Bus Coach (₹30/km)</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Number */}
                  <div className="clean-field-group">
                    <label htmlFor="heroPhoneInput">Phone / WhatsApp Number</label>
                    <div className="clean-input-wrap">
                      <PhoneIcon className="clean-input-icon text-[#64748B]" />
                      <input
                        type="tel"
                        id="heroPhoneInput"
                        value={heroPhone}
                        onChange={(e) => setHeroPhone(e.target.value)}
                        placeholder="e.g. 98765 43210"
                        className="clean-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Action Button: CHECK FARE */}
                <a
                  href={getHeroWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clean-check-fare-btn"
                  id="heroCheckFareBtn"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>CHECK FARE &amp; BOOK NOW</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ WHY CHOOSE US ============ */}
        <section className="section why-section" id="why">
          <div className="container">
            <div className="why-split-grid">
              {/* Left Media Column with Badge */}
              <div className="why-media-col">
                <div className="why-image-card">
                  <img
                    src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop"
                    alt="Comfortable family and passenger travel with TKV Drop Taxi"
                    className="why-hero-photo"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop') {
                        target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop';
                      }
                    }}
                  />
                  <div className="why-trust-badge">
                    <span className="badge-highlight">10+</span>
                    <span className="badge-label">Years of Trust</span>
                  </div>
                </div>
              </div>

              {/* Right Content Column */}
              <div className="why-content-col">
                <div className="why-eyebrow-tag">
                  WHY CHOOSE US
                </div>
                <h2 className="why-headline">
                  Personalized Service for <span className="text-highlight title-gradient">Every Trip</span>
                </h2>
                <p className="why-lead-text">
                  TKV Drop Taxi has been at the forefront of intercity travel in South India, providing seamless connectivity between Hosur, Bangalore, Chennai, Coimbatore, Salem, and every corner of Tamil Nadu.
                </p>

                <div className="why-points-list">
                  <div className="why-point-row">
                    <div className="why-point-check">
                      <CheckCircleIcon className="check-svg" />
                    </div>
                    <div className="why-point-desc">
                      <h4>24×7 Service</h4>
                      <p>Round-the-clock bookings and pickups, any day of the year.</p>
                    </div>
                  </div>

                  <div className="why-point-row">
                    <div className="why-point-check">
                      <CheckCircleIcon className="check-svg" />
                    </div>
                    <div className="why-point-desc">
                      <h4>Professional Drivers</h4>
                      <p>Verified, well-trained &amp; courteous drivers on every trip.</p>
                    </div>
                  </div>

                  <div className="why-point-row">
                    <div className="why-point-check">
                      <CheckCircleIcon className="check-svg" />
                    </div>
                    <div className="why-point-desc">
                      <h4>GPS Enabled Vehicles</h4>
                      <p>Live tracking for total peace of mind on long routes.</p>
                    </div>
                  </div>

                  <div className="why-point-row">
                    <div className="why-point-check">
                      <CheckCircleIcon className="check-svg" />
                    </div>
                    <div className="why-point-desc">
                      <h4>Clean &amp; Sanitized</h4>
                      <p>Every vehicle is cleaned and sanitized before departure.</p>
                    </div>
                  </div>
                </div>

                <div className="why-cta-row">
                  <a href="#plan-trip" className="why-primary-btn" id="whyLearnMoreBtn">
                    Learn More
                  </a>
                  <a href={`tel:${CONFIG.phone}`} className="why-phone-btn" id="whyCallNowBtn">
                    <PhoneIcon className="w-4 h-4" />
                    <span>Call {CONFIG.phoneFormatted}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FLEET ============ */}
        <section className="section section-alt" id="fleet">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow"><span className="dot"></span>Our Fleet</div>
              <h2>Popular vehicles for <span className="title-gradient">every journey</span></h2>
              <p>From a quick airport drop to a 12-seater family tour, pick a vehicle that matches your trip.</p>
            </div>

            <div className="grid grid-4" id="fleetGrid">
              {VEHICLES.map((v) => (
                <div key={v.id} className="vehicle-card" id={`vehicle-${v.id}`}>
                  <div className="vehicle-media">
                    {v.badge && <span className="badge">{v.badge}</span>}
                    <img
                      src={v.image}
                      alt={`${v.name} - TKV Drop Taxi`}
                      className="vehicle-real-img"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (v.fallbackImage && target.src !== v.fallbackImage) {
                          target.src = v.fallbackImage;
                        }
                      }}
                    />
                  </div>
                  <div className="vehicle-body">
                    <h3>{v.name}</h3>
                    <div className="vehicle-price">
                      From ₹{v.rate}/km <span>· min {v.minKm} km</span>
                    </div>
                    <div className="vehicle-specs">
                      <span><UsersIcon className="w-3.5 h-3.5" />{v.seats} Seats</span>
                      <span><BriefcaseIcon className="w-3.5 h-3.5" />{v.luggage}</span>
                      <span><SnowIcon className="w-3.5 h-3.5" />{v.ac ? 'AC' : 'Non-AC'}</span>
                    </div>
                    <div className="vehicle-features">
                      {v.features.map((f, i) => (
                        <span key={i}>{f}</span>
                      ))}
                    </div>
                    <a
                      href={getVehicleBookingUrl(v.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-block"
                    >
                      <WhatsAppIcon /> Book Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section className="section" id="services">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow"><span className="dot"></span>What We Offer</div>
              <h2>Services designed <span className="title-gradient">around your trip</span></h2>
              <p>One partner for every kind of journey — business, family, celebration or pilgrimage.</p>
            </div>
            <div className="grid grid-4" id="servicesGrid">
              {SERVICES.map((s) => (
                <div key={s.id} className="service-card" id={`service-${s.id}`}>
                  <div className="service-media">
                    <img
                      src={s.image}
                      alt={`${s.name} - TKV Drop Taxi Hosur`}
                      className="service-real-img"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (s.fallbackImage && target.src !== s.fallbackImage) {
                          target.src = s.fallbackImage;
                        }
                      }}
                    />
                    <div className="service-media-overlay"></div>
                  </div>
                  <div className="service-content">
                    <h4>{s.name}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FARE CALCULATOR ============ */}
        <section className="section section-alt" id="fare-calculator">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow"><span className="dot"></span>Fare Calculator</div>
              <h2>Get an instant <span className="title-gradient">trip estimate</span></h2>
              <p>Pick your vehicle and trip details — we'll estimate the fare and send it straight to WhatsApp.</p>
            </div>

            <div className="calc-wrap" id="fareCalcCard">
              <div className="calc-form">
                <div className="form-group">
                  <label>Trip Type</label>
                  <div className="trip-toggle" id="tripToggle">
                    <button
                      type="button"
                      className={tripType === 'oneway' ? 'active' : ''}
                      onClick={() => setTripType('oneway')}
                      id="btnTripOneWay"
                    >
                      One Way
                    </button>
                    <button
                      type="button"
                      className={tripType === 'roundtrip' ? 'active' : ''}
                      onClick={() => setTripType('roundtrip')}
                      id="btnTripRound"
                    >
                      Round Trip
                    </button>
                    <button
                      type="button"
                      className={tripType === 'rental' ? 'active' : ''}
                      onClick={() => setTripType('rental')}
                      id="btnTripRental"
                    >
                      Rental
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="vehicleSelect">Select Vehicle</label>
                  <select
                    className="select"
                    id="vehicleSelect"
                    value={selectedVehicleIndex}
                    onChange={(e) => setSelectedVehicleIndex(Number(e.target.value))}
                  >
                    {VEHICLES.map((v, i) => (
                      <option key={v.id} value={i}>
                        {v.name} — ₹{v.rate}/km
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="distanceInput">Distance (KM)</label>
                    <input
                      type="number"
                      min={1}
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(Number(e.target.value))}
                      className="input"
                      id="distanceInput"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="daysInput">No. of Days</label>
                    <input
                      type="number"
                      min={1}
                      value={numDays}
                      onChange={(e) => setNumDays(Number(e.target.value))}
                      className="input"
                      id="daysInput"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row" onClick={() => setNightStay(!nightStay)}>
                    <input
                      type="checkbox"
                      id="nightStay"
                      checked={nightStay}
                      onChange={(e) => setNightStay(e.target.checked)}
                    />
                    <label htmlFor="nightStay">Include Night Stay Charges</label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row" onClick={() => setDriverAllowance(!driverAllowance)}>
                    <input
                      type="checkbox"
                      id="driverAllowance"
                      checked={driverAllowance}
                      onChange={(e) => setDriverAllowance(e.target.checked)}
                    />
                    <label htmlFor="driverAllowance">Include Driver Allowance (Bata)</label>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  id="calcBtn"
                >
                  <SparkleIcon /> Calculated Automatically
                </button>
              </div>

              <div className="calc-result">
                <h4>Estimated Fare Breakdown</h4>
                <div className="result-rows">
                  <div className="result-row">
                    <span>Base Trip Fare</span>
                    <span id="rFare">{formatINR(calculation.baseFare)}</span>
                  </div>
                  <div className="result-row">
                    <span>Driver Bata</span>
                    <span id="rBata">{formatINR(calculation.bata)}</span>
                  </div>
                  <div className="result-row">
                    <span>Night Stay Charges</span>
                    <span id="rNight">{formatINR(calculation.night)}</span>
                  </div>
                  <div className="result-row">
                    <span>Toll &amp; Parking (est.)</span>
                    <span id="rToll">{formatINR(calculation.toll)}</span>
                  </div>
                  <div className="result-row">
                    <span>GST (5%)</span>
                    <span id="rGst">{formatINR(calculation.gst)}</span>
                  </div>
                </div>
                <div className="result-total">
                  <span>Final Estimate</span>
                  <span id="rTotal">{formatINR(calculation.total)}</span>
                </div>
                <a
                  href={getWhatsAppQuoteUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-block"
                  id="waQuoteBtn"
                >
                  <WhatsAppIcon /> Generate WhatsApp Quote
                </a>
                <p className="result-note">
                  *This is an estimated fare based on standard rates. Final price may vary depending on actual route, traffic, waiting time and season. Toll, parking &amp; state permit charges (if any) are extra.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ REVIEWS ============ */}
        <section className="section section-alt" id="reviews">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow"><span className="dot"></span>Customer Reviews</div>
              <h2>Trusted by <span className="title-gradient">families &amp; businesses</span></h2>
              <p>Real feedback from travellers across Hosur, Krishnagiri and Bangalore.</p>
            </div>
            <div className="grid grid-3">
              {REVIEWS.map((r, i) => (
                <div key={i} className="review-card" id={`review-${i}`}>
                  <div className="review-stars">
                    {[...Array(r.stars)].map((_, sIdx) => (
                      <StarIcon key={sIdx} />
                    ))}
                  </div>
                  <p>"{r.quote}"</p>
                  <div className="review-person">
                    <div className="review-avatar">{r.avatar}</div>
                    <div>
                      <div className="review-name">{r.name}</div>
                      <div className="review-loc">{r.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA BANNER ============ */}
        <section className="section" id="plan-trip">
          <div className="container">
            <div className="cta-banner">
              <h2>Ready to plan your <span className="title-gradient-amber">next trip?</span></h2>
              <p>Get an instant quote on WhatsApp or speak to our team right now — we're available 24×7.</p>
              <div className="cta-actions">
                <a
                  href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.defaultWaMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  id="bannerWaBtn"
                >
                  <WhatsAppIcon /> Book on WhatsApp
                </a>
                <a href={`tel:${CONFIG.phone}`} className="btn btn-ghost" id="bannerCallBtn">
                  <PhoneIcon /> Call Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ABOUT ============ */}
        <section className="section section-alt" id="about">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow"><span className="dot"></span>About Us</div>
              <h2>A decade on <span className="title-gradient">South India's highways</span></h2>
              <p>TKV Drop Taxi started as a two-car outfit in Hosur — today we're a trusted name across Krishnagiri, Bangalore, Chennai and Tamil Nadu.</p>
            </div>

            <div className="about-grid">
              <div className="about-visual">
                <div className="num">12+</div>
                <div className="num-label">Years serving South India</div>
                <div className="about-mini-grid">
                  <div>
                    <h5>500+</h5>
                    <span>Trips Completed</span>
                  </div>
                  <div>
                    <h5>8</h5>
                    <span>Premium Vehicles</span>
                  </div>
                  <div>
                    <h5>4.9★</h5>
                    <span>Average Rating</span>
                  </div>
                  <div>
                    <h5>24×7</h5>
                    <span>Availability</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="about-block">
                  <h3><BookIcon /> Our Story</h3>
                  <p>What began as a single Swift Dzire ferrying families between Hosur and Bangalore has grown into a full premium fleet — Innova Crysta, Tempo Travellers and more — built on the same promise of punctual, courteous service.</p>
                </div>
                <div className="about-block">
                  <h3><SparkleIcon /> Our Mission</h3>
                  <p>To make every road trip feel as reliable and comfortable as a first-class journey, at a fare that's honest and upfront.</p>
                </div>
                <div className="about-block">
                  <h3><MountainIcon /> Our Vision</h3>
                  <p>To be South India's most trusted name in premium outstation travel, known equally for safety and hospitality.</p>
                </div>
                <div className="about-block">
                  <h3><ShieldIcon /> Safety First</h3>
                  <p>Every vehicle carries a valid All India Tourist Permit, is GPS-tracked, and is driven by a verified, background-checked driver.</p>
                </div>
                <div className="about-block">
                  <h3><HeartIcon /> Our Promise</h3>
                  <p>Transparent pricing, on-time pickup and a clean, sanitized vehicle — every single trip, no exceptions.</p>
                </div>

                <div className="timeline">
                  <div className="timeline-item">
                    <h5>2014 — The First Car</h5>
                    <p>Started operations in Hosur with a single sedan.</p>
                  </div>
                  <div className="timeline-item">
                    <h5>2017 — Fleet Expansion</h5>
                    <p>Added Innova &amp; Innova Crysta for family and corporate travel.</p>
                  </div>
                  <div className="timeline-item">
                    <h5>2020 — All India Permit</h5>
                    <p>Secured All India Tourist Permit for seamless interstate trips.</p>
                  </div>
                  <div className="timeline-item">
                    <h5>2023 — Group Travel</h5>
                    <p>Introduced Tempo Travellers and Mini Bus for larger groups.</p>
                  </div>
                  <div className="timeline-item">
                    <h5>Today — 500+ Trips</h5>
                    <p>Trusted by families and businesses across Hosur, Krishnagiri &amp; Bangalore.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section className="section" id="contact">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow"><span className="dot"></span>Contact Us</div>
              <h2>Let's plan <span className="title-gradient">your trip</span></h2>
              <p>Reach out on WhatsApp, call directly, or send a quick message — we typically reply within minutes.</p>
            </div>

            <div className="contact-grid">
              <div>
                <div className="contact-card">
                  <div className="contact-row">
                    <div className="ci"><PhoneIcon /></div>
                    <div>
                      <h5>Phone</h5>
                      <a href={`tel:${CONFIG.phone}`} id="contactPhoneLink">{CONFIG.phoneFormatted}</a>
                    </div>
                  </div>
                  <div className="contact-row">
                    <div className="ci"><WhatsAppIcon /></div>
                    <div>
                      <h5>WhatsApp</h5>
                      <a
                        href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.defaultWaMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="contactWaLink"
                      >
                        {CONFIG.phoneFormatted}
                      </a>
                    </div>
                  </div>
                  <div className="contact-row">
                    <div className="ci"><MailIcon /></div>
                    <div>
                      <h5>Email</h5>
                      <a href={`mailto:${CONFIG.email}`} id="contactEmailLink">{CONFIG.email}</a>
                    </div>
                  </div>
                  <div className="contact-row">
                    <div className="ci"><PinIcon /></div>
                    <div>
                      <h5>Address</h5>
                      <p>{CONFIG.address}</p>
                    </div>
                  </div>
                  <div className="contact-row">
                    <div className="ci"><ClockIcon /></div>
                    <div>
                      <h5>Business Hours</h5>
                      <p>Open 24×7, all days of the week</p>
                    </div>
                  </div>
                </div>

                <div className="map-frame">
                  <iframe
                    src={CONFIG.mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TKV Drop Taxi Location Map"
                  />
                </div>
              </div>

              <div>
                <div className="form-card">
                  <h3>Send a quick message</h3>
                  <p>Fill this in and our team will call you back shortly.</p>
                  <form id="contactForm" onSubmit={handleContactSubmit}>
                    <div className="form-group">
                      <label htmlFor="cName">Full Name</label>
                      <input
                        className="input"
                        id="cName"
                        required
                        placeholder="Your name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cPhone">Phone Number</label>
                      <input
                        className="input"
                        id="cPhone"
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cTrip">Trip Details</label>
                      <input
                        className="input"
                        id="cTrip"
                        placeholder="e.g. Hosur to Ooty, 4 pax, 2 days"
                        value={contactTrip}
                        onChange={(e) => setContactTrip(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" id="btnSubmitContact">
                      <CheckIcon /> Send Message
                    </button>
                    {showToast && (
                      <div className="toast show" id="formToast">
                        <CheckIcon /> Thanks! Opening WhatsApp and calling you back shortly.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer>
        <div className="container">
          <div className="footer-top">
            <div>
              <div className="footer-logo">
                <img className="brand-image" src={brandLogo} alt="TKV Drop Taxi" />
              </div>
              <p>
                #1 Outstation drop taxi, round trips &amp; airport transfers across Hosur, Krishnagiri, Bangalore, Chennai and Tamil Nadu — Zero Return Fare.
              </p>
              <div className="social-row">
                <a href={CONFIG.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <YouTubeIcon />
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#fleet">Fleet</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#fare-calculator">Fare Calculator</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Popular Services</h5>
              <ul>
                <li><a href="#services">Airport Pickup &amp; Drop</a></li>
                <li><a href="#services">Outstation Trips</a></li>
                <li><a href="#services">Wedding Travel</a></li>
                <li><a href="#services">Corporate Travel</a></li>
                <li><a href="#services">Temple Tour</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Get In Touch</h5>
              <ul>
                <li><a href={`tel:${CONFIG.phone}`}>{CONFIG.phoneFormatted} (Call)</a></li>
                <li>
                  <a
                    href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.defaultWaMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CONFIG.phoneFormatted} (WhatsApp)
                  </a>
                </li>
                <li><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></li>
                <li><a href="#contact">Hosur, Tamil Nadu</a></li>
              </ul>
            </div>

            {/* Dedicated 5th Column: Our Mobile Apps (Sim Drop Taxi style) */}
            <div className="footer-col footer-apps-col">
              <h5>Our Mobile Apps</h5>
              <div className="footer-app-badges">
                <a href="#plan-trip" className="app-badge-btn" title="Get it on Google Play" id="footerGooglePlayBtn">
                  <GooglePlayColorIcon className="app-badge-icon" />
                  <div className="app-badge-text">
                    <span className="badge-sub">GET IT ON</span>
                    <span className="badge-name">Google Play</span>
                  </div>
                </a>
                <a href="#plan-trip" className="app-badge-btn" title="Download on the App Store" id="footerAppStoreBtn">
                  <AppleStoreWhiteIcon className="app-badge-icon" />
                  <div className="app-badge-text">
                    <span className="badge-sub">Download on the</span>
                    <span className="badge-name">App Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {currentYear} TKV Drop Taxi. All rights reserved.</span>
            <div className="legal-links">
              <a href="#home">Privacy Policy</a>
              <a href="#home">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ============ FLOATING ACTIONS ============ */}
      <div className="floating-actions" id="floatingActions">
        <a
          href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.defaultWaMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fab-wrap"
          aria-label="Chat on WhatsApp"
          id="fabWa"
        >
          <span className="fab-ping"></span>
          <span className="fab fab-whatsapp">
            <WhatsAppIcon className="w-7 h-7 text-white" />
          </span>
        </a>
        <a
          href={`tel:${CONFIG.phone}`}
          className="fab fab-call"
          aria-label="Call now"
          id="fabCall"
        >
          <PhoneIcon className="w-7 h-7 text-white" />
        </a>
      </div>

      {/* ============ MOBILE STICKY TAB BAR ============ */}
      <div className="mobile-tabbar" id="mobileTabbar">
        <div className="row">
          <a href={`tel:${CONFIG.phone}`} className="tab-call" id="tabCall">
            <PhoneIcon /> Call
          </a>
          <a
            href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.defaultWaMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tab-whatsapp"
            id="tabWa"
          >
            <WhatsAppIcon /> WhatsApp
          </a>
          <a href="#fleet" className="tab-book" id="tabBook">
            <CarVectorIcon className="w-5 h-5 text-white" /> Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
