import React, { useState, useEffect, useMemo, useRef, FormEvent } from 'react';
import {
  CONFIG,
  VEHICLES,
  SERVICES,
  REVIEWS,
  POPULAR_CITIES,
  POPULAR_DISTANCES,
  POPULAR_ROUTE_CARDS,
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
import brandLogo from '../public/images/logo/main.png';
const CAB_SELECTION_OPTIONS = [
  {
    id: 'dzire',
    name: 'SEDAN',
    subtitle: 'Swift Dzire',
    onewayRate: 15,
    roundRate: 14,
    localPackage: { baseFare: 2000, baseKm: 100, baseHours: 8, extraKmRate: 14, waitingPerHour: 150 },
    seats: 4,
    image: '/images/vehicles/Sedan.png'
  },
  {
    id: 'etios',
    name: 'ETIOS',
    subtitle: 'Toyota Etios',
    onewayRate: 15,
    roundRate: 14,
    localPackage: { baseFare: 2000, baseKm: 100, baseHours: 8, extraKmRate: 14, waitingPerHour: 150 },
    seats: 4,
    image: '/images/vehicles/Toyota%20Etios.png'
  },
  {
    id: 'ertiga',
    name: 'SUV',
    subtitle: 'Maruti Ertiga',
    onewayRate: 20,
    roundRate: 19,
    localPackage: { baseFare: 2800, baseKm: 100, baseHours: 8, extraKmRate: 17, waitingPerHour: 180 },
    seats: 6,
    image: '/images/vehicles/SUV.png'
  },
  {
    id: 'crysta',
    name: 'INNOVA',
    subtitle: 'Innova Crysta',
    onewayRate: 21,
    roundRate: 20,
    localPackage: { baseFare: 3500, baseKm: 100, baseHours: 8, extraKmRate: 18, waitingPerHour: 190 },
    seats: 7,
    image: '/images/vehicles/Toyota%20Innova.png'
  }
];

export default function App() {
  // Mobile drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Hero Booking Form State
  const [heroTripType, setHeroTripType] = useState<'oneway' | 'roundtrip' | 'local'>('oneway');
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
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip' | 'local'>('oneway');
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);
  const [distanceKm, setDistanceKm] = useState<string>('120');
  const [extraKm, setExtraKm] = useState<string>('0');
  const [extraHours, setExtraHours] = useState<string>('0');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactTrip, setContactTrip] = useState('');

  const fleetScrollRef = useRef<HTMLDivElement | null>(null);
  const routesScrollRef = useRef<HTMLDivElement | null>(null);
  const reviewsScrollRef = useRef<HTMLDivElement | null>(null);
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
    const fromCabList = CAB_SELECTION_OPTIONS.find(c => c.id === heroVehicleId);
    if (fromCabList) {
      const matchInVehicles = VEHICLES.find(v => v.id === heroVehicleId);
      const activeRate = heroTripType === 'roundtrip' ? fromCabList.roundRate : fromCabList.onewayRate;
      return matchInVehicles ? { ...matchInVehicles, rate: activeRate, onewayRate: fromCabList.onewayRate, roundRate: fromCabList.roundRate, localPackage: fromCabList.localPackage } : {
        id: fromCabList.id,
        name: fromCabList.subtitle,
        seats: fromCabList.seats,
        luggage: '3 Bags',
        fuel: 'Diesel',
        ac: true,
        type: (fromCabList.id === 'dzire' || fromCabList.id === 'etios' ? 'sedan' : 'suv') as 'sedan' | 'suv',
        rate: activeRate,
        onewayRate: fromCabList.onewayRate,
        roundRate: fromCabList.roundRate,
        localPackage: fromCabList.localPackage,
        minKm: 250,
        image: '',
        features: []
      };
    }
    const defaultV = VEHICLES.find(v => v.id === heroVehicleId) || VEHICLES[0];
    const activeRate = heroTripType === 'roundtrip' ? defaultV.roundRate : defaultV.onewayRate;
    return { ...defaultV, rate: activeRate };
  }, [heroVehicleId, heroTripType]);

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
    const driverBata = 400;

    if (heroTripType === 'local') {
      const pkg = heroSelectedVehicle.localPackage || {
        baseFare: 2000,
        baseKm: 100,
        baseHours: 8,
        extraKmRate: 14,
        waitingPerHour: 150
      };
      return {
        distance: pkg.baseKm,
        billedKm: pkg.baseKm,
        rate: pkg.extraKmRate,
        total: pkg.baseFare + driverBata,
        zeroReturn: false,
        isLocal: true,
        pkg
      };
    }

    const effectiveDistance = heroTripType === 'roundtrip' ? heroDistance * 2 : heroDistance;
    const billedKm = effectiveDistance;
    const applicableRate = heroTripType === 'roundtrip' ? heroSelectedVehicle.roundRate : heroSelectedVehicle.onewayRate;
    const fare = billedKm * applicableRate + driverBata;

    return {
      distance: effectiveDistance,
      billedKm,
      rate: applicableRate,
      total: Math.round(fare),
      zeroReturn: heroTripType === 'oneway',
      isLocal: false
    };
  }, [heroDistance, heroSelectedVehicle, heroTripType]);

  // Format currency in Indian Rupees format (e.g. ₹1,400)
  const formatINR = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  // Generate WhatsApp estimation link for Hero
  const getHeroWhatsAppUrl = () => {
    const tripLabel = heroTripType === 'oneway' 
      ? 'One Way Drop Taxi' 
      : heroTripType === 'roundtrip' 
        ? 'Round Trip Taxi' 
        : 'Local Trip (8 Hours / 100 KM)';
    
    let message = `🚖 *BOOK YOUR TAXI - INSTANT ESTIMATION*\n` +
      `----------------------------------------\n` +
      `• *Trip Type:* ${tripLabel}\n` +
      `• *From:* ${heroPickup || 'Hosur'}\n` +
      `• *To:* ${heroDrop || 'Chennai'}\n` +
      `• *Date & Time:* ${heroDate || 'Today'} at ${heroTime || 'Now'}\n` +
      `• *Vehicle:* ${heroSelectedVehicle.name} (${heroSelectedVehicle.type.toUpperCase()})\n`;

    if (heroTripType === 'local') {
      message += `• *Local Package:* 8 Hours / 100 KM\n` +
        `• *Estimated Base Fare:* ${formatINR(heroEstimate.total)}\n` +
        `• *Extra Rate:* ₹${heroSelectedVehicle.localPackage?.extraKmRate || 14}/km | ₹${heroSelectedVehicle.localPackage?.waitingPerHour || 150}/hr waiting\n`;
    } else {
      message += `• *Approx Distance:* ${heroEstimate.distance} km ${heroTripType === 'roundtrip' ? '(Round Trip)' : ''}\n` +
        `• *Base Rate:* ₹${heroEstimate.rate}/km\n` +
        `• *Estimated Total:* ${formatINR(heroEstimate.total)} ${heroEstimate.zeroReturn ? '(Zero Return Charges!)' : ''}\n`;
    }

    message += `• *Toll & Parking:* Extra\n` +
      `• *Driver Bata:* ₹400\n` +
      (heroName ? `• *Passenger Name:* ${heroName}\n` : '') +
      (heroPhone ? `• *WhatsApp / Phone:* ${heroPhone}\n` : '') +
      `----------------------------------------\n` +
      `Please confirm availability and dispatch details.`;

    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  // Swap pickup & drop
  const handleSwapCities = () => {
    const temp = heroPickup;
    setHeroPickup(heroDrop);
    setHeroDrop(temp);
  };

  // Scroll listener for sticky navbar & active section highlighting
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = document.getElementById('home');
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768;
    if (reducedMotion) {
      section.style.setProperty('--hero-shift', '0px');
      return;
    }

    let frame = 0;
    const updateParallax = () => {
      const rect = section.getBoundingClientRect();
      const shift = Math.max(-18, Math.min(18, rect.top * -0.06));
      section.style.setProperty('--hero-shift', `${shift}px`);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const siteTitle = 'TKV Drop Taxi | One Way Drop Taxi in Hosur & Bangalore';
    const defaultDescription = 'Book reliable one-way drop taxi services from Hosur to Bangalore and across Tamil Nadu with TKV Drop Taxi. Affordable fares, comfortable cars and easy WhatsApp booking.';

    document.title = siteTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', defaultDescription);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://tkvdroptaxi.com/');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', siteTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Book reliable one-way drop taxi services from Hosur to Bangalore and across Tamil Nadu with TKV Drop Taxi.');
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://tkvdroptaxi.com/');
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', 'https://tkvdroptaxi.com/images/logo/main.png');
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', siteTitle);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Book reliable one-way drop taxi services from Hosur to Bangalore and across Tamil Nadu with TKV Drop Taxi.');
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', 'https://tkvdroptaxi.com/images/logo/main.png');
    }

    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: CONFIG.businessName,
        url: 'https://tkvdroptaxi.com/',
        description: 'TKV Drop Taxi provides reliable taxi services from Hosur to Bangalore, Chennai, Tamil Nadu, and all India.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://tkvdroptaxi.com/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'TaxiService',
        name: CONFIG.businessName,
        image: 'https://tkvdroptaxi.com/images/logo/main.png',
        telephone: '+91 97862 84326',
        url: 'https://tkvdroptaxi.com/',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '2nd Cross Narashamma Colony, Krishnagiri ByePass Road, Suzuki Showroom back Side',
          addressLocality: 'Hosur',
          addressRegion: 'Tamil Nadu',
          postalCode: '635109',
          addressCountry: 'IN'
        },
        areaServed: [
          'Hosur',
          'Bangalore',
          'Tamil Nadu',
          'All India'
        ],
        description: 'TKV Drop Taxi provides one-way drop taxi, airport pickup and drop, outstation taxi, and long-distance travel from Hosur to Bangalore, Chennai, Salem, and across India.',
        sameAs: [
          'https://www.facebook.com/share/p/1BeGsCAgXS/'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          telephone: '+91 97862 84326',
          areaServed: 'IN',
          availableLanguage: ['English', 'Tamil']
        }
      }
    ];

    let scriptTag = document.getElementById('tkw-seo-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'tkw-seo-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    return () => {
      scriptTag?.remove();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = ['home', 'fleet', 'popular-routes', 'services', 'fare-calculator', 'about', 'contact'];
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

  const toNumber = (value: string | number | undefined, fallback = 0) => {
    const parsed = Number.parseFloat(String(value ?? '').replace(/,/g, ''));
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  // Fare calculations
  const calculation = useMemo(() => {
    const driverBata = 400;

    if (tripType === 'local') {
      const pkg = currentVehicle.localPackage || {
        baseFare: 2000,
        baseKm: 100,
        baseHours: 8,
        extraKmRate: 14,
        waitingPerHour: 150
      };
      const validExtraKm = Math.max(toNumber(extraKm, 0), 0);
      const validExtraHours = Math.max(toNumber(extraHours, 0), 0);
      const extraKmCost = validExtraKm * pkg.extraKmRate;
      const extraWaitingCost = validExtraHours * pkg.waitingPerHour;
      const total = pkg.baseFare + extraKmCost + extraWaitingCost + driverBata;

      return {
        tripType: 'local',
        pkg,
        baseFare: pkg.baseFare,
        extraKm: validExtraKm,
        extraKmCost,
        extraHours: validExtraHours,
        extraWaitingCost,
        ratePerKm: pkg.extraKmRate,
        billedKm: pkg.baseKm + validExtraKm,
        total,
        dist: pkg.baseKm + validExtraKm,
        driverBata
      };
    }

    const dist = Math.max(toNumber(distanceKm, 1), 1);
    const applicableRate = tripType === 'roundtrip' ? currentVehicle.roundRate : currentVehicle.onewayRate;
    const effectiveKm = tripType === 'roundtrip' ? dist * 2 : dist;
    const billedKm = effectiveKm;
    const baseFare = billedKm * applicableRate;
    const total = baseFare + driverBata;

    return {
      tripType,
      ratePerKm: applicableRate,
      billedKm,
      baseFare,
      total,
      dist,
      driverBata
    };
  }, [tripType, currentVehicle, distanceKm, extraKm, extraHours]);

  // Generate WhatsApp message for calculator
  const getWhatsAppQuoteUrl = () => {
    const tripLabel = tripType === 'oneway' 
      ? 'One Way Drop Taxi' 
      : tripType === 'roundtrip' 
        ? 'Round Trip Taxi' 
        : 'Local Trip (8 Hours / 100 KM)';
    const enteredDistance = toNumber(distanceKm, 0);
    
    let message = `🚖 *TKV DROP TAXI - INSTANT TRIP ESTIMATE*\n` +
      `----------------------------------------\n` +
      `• *Vehicle:* ${currentVehicle.name}\n` +
      `• *Trip Type:* ${tripLabel}\n`;

    if (tripType === 'local') {
      message += `• *Local Package:* 8 Hours / 100 KM (₹${calculation.baseFare})\n` +
        (calculation.extraKm ? `• *Extra KM:* ${calculation.extraKm} km (+₹${calculation.extraKmCost})\n` : '') +
        (calculation.extraHours ? `• *Extra Waiting:* ${calculation.extraHours} hrs (+₹${calculation.extraWaitingCost})\n` : '');
    } else {
      message += `• *Distance:* ${enteredDistance || 0} km ${tripType === 'roundtrip' ? `(Round Trip Billed: ${calculation.billedKm} km)` : ''}\n` +
        `• *Rate:* ₹${calculation.ratePerKm}/km\n`;
    }

    message += `• *Estimated Fare:* ${formatINR(calculation.total)}\n` +
      `• *Toll & Parking:* Extra\n` +
      `• *Driver Bata:* ${formatINR(calculation.driverBata || 400)}\n` +
      `----------------------------------------\n` +
      `Please confirm vehicle availability and booking.`;

    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  // Vehicle specific booking URL
  const getVehicleBookingUrl = (vName: string) => {
    const msg = `Hi TKV Drop Taxi, I'd like to book the ${vName}. Please share availability and fare.`;
    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  // Quick message form handler
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);

    const msg = `Hi TKV Drop Taxi, my name is ${contactName || '—'} (${contactPhone || '—'}). Trip details: ${contactTrip || 'Please contact me.'}`;
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

  // Select Popular Route -> Pre-fills Hero Booking Form and smoothly scrolls up
  const handleSelectPopularRoute = (from: string, to: string) => {
    setHeroPickup(from);
    setHeroDrop(to);
    const heroCard = document.getElementById('heroBookingCard');
    if (heroCard) {
      heroCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      heroCard.classList.add('pulse-glow');
      setTimeout(() => heroCard.classList.remove('pulse-glow'), 1800);
    }
  };

  // Generate WhatsApp inquiry link for popular route categories
  const getPopularRouteWhatsAppUrl = (category: string) => {
    const text = `🚖 *TKV DROP TAXI - ${category.toUpperCase()} INQUIRY*\n` +
      `----------------------------------------\n` +
      `Hello TKV Drop Taxi Team,\n` +
      `I would like to inquire about popular ${category} fares and vehicle availability.\n` +
      `Pickup Area: Hosur / Bangalore\n` +
      `Date: ${heroDate || 'Immediate'}\n` +
      `----------------------------------------\n` +
      `Please share the tariff and booking details.`;
    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      {/* ============ HEADER / NAV ============ */}
      <header className={`nav-wrap ${scrolled ? 'scrolled' : ''}`} id="navWrap">
        <div className="container nav">
          <a href="#home" className="logo" id="headerLogo">
            <img src={brandLogo} alt="TKV Drop Taxi Logo" className="logo-mark" />
          </a>

          <nav className="nav-links" id="navLinks">
            <a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a>
            <a href="#fleet" className={activeSection === 'fleet' ? 'active' : ''}>Fleet</a>
            <a href="#popular-routes" className={activeSection === 'popular-routes' ? 'active' : ''}>Routes</a>
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
            <img src={brandLogo} alt="TKV Drop Taxi Logo" className="logo-mark" />
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
        <a href="#popular-routes" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Routes</a>
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
                <div className="hero-clean-badge hero-animate-1">
                  <span className="clean-dot"></span>
                  TKV Drop Taxi Hosur · 15+ Years of Trust
                </div>

                <h1 className="hero-clean-headline hero-animate-2">
                  One Way Drop Taxi from <span className="hero-headline-accent">Hosur to Bangalore</span>
                </h1>

                <p className="hero-clean-lead hero-animate-3">
                  Reliable one-way taxi, airport pickup and drop, and outstation rides from Hosur to Bangalore, Chennai, Tamil Nadu and all India with transparent fares and 24x7 support.
                </p>

                {/* 3 Clean Icon Features from reference image */}
                <div className="hero-clean-features hero-animate-4">
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
                <div className="hero-action-buttons hero-animate-5">
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

              {/* Right Column: Image-Based "Book Your Taxi Now" Card (as in reference image) */}
              <div className="hero-clean-card hero-animate-6" id="heroBookingCard">
                <div className="clean-card-header">
                  <h2 className="clean-card-title">Book Your Taxi Now</h2>
                  <p className="clean-card-subtitle">Get instant estimation on WhatsApp</p>
                </div>

                <div className="clean-card-body">
                  {/* Clean Trip Type Tabs */}
                  <div className="clean-trip-tabs">
                    <button
                      type="button"
                      className={`clean-trip-tab ${heroTripType === 'oneway' ? 'active' : ''}`}
                      onClick={() => setHeroTripType('oneway')}
                      id="heroTabOneWay"
                    >
                      One Way
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
                      className={`clean-trip-tab ${heroTripType === 'local' ? 'active' : ''}`}
                      onClick={() => setHeroTripType('local')}
                      id="heroTabLocal"
                    >
                      Local Trip
                    </button>
                  </div>

                  {/* Clean Form Fields */}
                  <div className="clean-form-fields">
                    {/* Row 1: Name & Mobile */}
                    <div className="clean-fields-row">
                      <div className="clean-field-group">
                        <label htmlFor="heroNameInput" className="clean-field-caps-label">NAME</label>
                        <div className="clean-input-wrap">
                          <input
                            type="text"
                            id="heroNameInput"
                            value={heroName}
                            onChange={(e) => setHeroName(e.target.value)}
                            placeholder="Full name"
                            className="clean-input clean-text-input"
                          />
                        </div>
                      </div>

                      <div className="clean-field-group">
                        <label htmlFor="heroPhoneInput" className="clean-field-caps-label">MOBILE</label>
                        <div className="clean-input-wrap">
                          <input
                            type="tel"
                            id="heroPhoneInput"
                            value={heroPhone}
                            onChange={(e) => setHeroPhone(e.target.value)}
                            placeholder="Mobile Number"
                            className="clean-input clean-text-input"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: From & To in the Same Row */}
                    <div className="clean-fields-row">
                      <div className="clean-field-group">
                        <div className="flex items-center justify-between">
                          <label htmlFor="heroPickupInput" className="clean-field-caps-label">FROM</label>
                          <button
                            type="button"
                            onClick={handleSwapCities}
                            className="text-[10px] font-bold text-[#0066CC] hover:underline flex items-center gap-0.5 cursor-pointer transition-colors"
                            title="Swap Pickup and Drop"
                          >
                            ⇄ Swap
                          </button>
                        </div>
                        <div className="clean-input-wrap">
                          <span className="clean-input-dot dot-green"></span>
                          <input
                            type="text"
                            id="heroPickupInput"
                            value={heroPickup}
                            onChange={(e) => setHeroPickup(e.target.value)}
                            placeholder="Pickup City/Loc"
                            className="clean-input clean-input-with-dot"
                          />
                        </div>
                      </div>

                      <div className="clean-field-group">
                        <label htmlFor="heroDropInput" className="clean-field-caps-label">TO</label>
                        <div className="clean-input-wrap">
                          <span className="clean-input-dot dot-red"></span>
                          <input
                            type="text"
                            id="heroDropInput"
                            value={heroDrop}
                            onChange={(e) => setHeroDrop(e.target.value)}
                            placeholder="Drop City/Loc"
                            className="clean-input clean-input-with-dot"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Pickup Date & Pickup Time */}
                    <div className="clean-fields-row">
                      <div className="clean-field-group">
                        <label htmlFor="heroDateInput" className="clean-field-caps-label">PICKUP DATE</label>
                        <div className="clean-input-wrap">
                          <input
                            type="date"
                            id="heroDateInput"
                            value={heroDate}
                            onChange={(e) => setHeroDate(e.target.value)}
                            className="clean-input clean-date-input"
                          />
                        </div>
                      </div>

                      <div className="clean-field-group">
                        <label htmlFor="heroTimeInput" className="clean-field-caps-label">PICKUP TIME</label>
                        <div className="clean-input-wrap clean-select-wrap">
                          <select
                            id="heroTimeInput"
                            value={heroTime}
                            onChange={(e) => setHeroTime(e.target.value)}
                            className="clean-select"
                          >
                            <option value="12:00 AM">12:00 AM</option>
                            <option value="02:00 AM">02:00 AM</option>
                            <option value="04:00 AM">04:00 AM</option>
                            <option value="06:00 AM">06:00 AM</option>
                            <option value="08:00 AM">08:00 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="12:00 PM">12:00 PM</option>
                            <option value="02:00 PM">02:00 PM</option>
                            <option value="04:00 PM">04:00 PM</option>
                            <option value="06:00 PM">06:00 PM</option>
                            <option value="08:00 PM">08:00 PM</option>
                            <option value="10:00 PM">10:00 PM</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Section 5: SELECT YOUR CAB (IMAGE-BASED 4 CARS) */}
                    <div className="clean-cab-selector-block">
                      <label className="clean-field-caps-label select-cab-title">SELECT YOUR CAB</label>
                      <div className="cab-cards-grid">
                        {CAB_SELECTION_OPTIONS.map((cab) => {
                          const isSelected = heroVehicleId === cab.id;
                          const rateLabel = heroTripType === 'local' 
                            ? `₹${cab.localPackage.baseFare} / 8h`
                            : heroTripType === 'roundtrip'
                              ? `${cab.roundRate} ₹ / Km`
                              : `${cab.onewayRate} ₹ / Km`;

                          return (
                            <button
                              key={cab.id}
                              type="button"
                              id={`cabSelectBtn_${cab.id}`}
                              onClick={() => setHeroVehicleId(cab.id)}
                              className={`cab-select-card ${isSelected ? 'selected' : ''}`}
                              title={`${cab.subtitle} - ${rateLabel}`}
                            >
                              <div className="cab-card-rate">{rateLabel}</div>
                              <div className="cab-card-img-box">
                                <img src={cab.image} alt={cab.subtitle} className="cab-card-svg" />
                              </div>
                              <div className="cab-card-name">{cab.name}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Primary Action Button: GET ESTIMATION */}
                  <a
                    href={getHeroWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clean-get-estimation-btn"
                    id="heroGetEstimationBtn"
                  >
                    <span>GET ESTIMATION</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ WHY CHOOSE US ============ */}
        <section className="section why-section" id="why" data-reveal>
          <div className="container">
            <div className="why-split-grid">
              {/* Left Media Column with Badge */}
              <div className="why-media-col">
                <div className="why-image-card">
                  <img
                    src="images/home/family.png"
                    alt="Comfortable family and passenger travel with TKV Drop Taxi"
                    className="why-hero-photo"
                    loading="lazy"
                    referrerPolicy="no-referrer"
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
                  <div className="why-point-row" data-reveal style={{ transitionDelay: '80ms' }}>
                    <div className="why-point-check">
                      <CheckCircleIcon className="check-svg" />
                    </div>
                    <div className="why-point-desc">
                      <h4>24×7 Service</h4>
                      <p>Round-the-clock bookings and pickups, any day of the year.</p>
                    </div>
                  </div>

                  <div className="why-point-row" data-reveal style={{ transitionDelay: '150ms' }}>
                    <div className="why-point-check">
                      <CheckCircleIcon className="check-svg" />
                    </div>
                    <div className="why-point-desc">
                      <h4>Professional Drivers</h4>
                      <p>Verified, well-trained &amp; courteous drivers on every trip.</p>
                    </div>
                  </div>

                  <div className="why-point-row" data-reveal style={{ transitionDelay: '230ms' }}>
                    <div className="why-point-check">
                      <CheckCircleIcon className="check-svg" />
                    </div>
                    <div className="why-point-desc">
                      <h4>GPS Enabled Vehicles</h4>
                      <p>Live tracking for total peace of mind on long routes.</p>
                    </div>
                  </div>

                  <div className="why-point-row" data-reveal style={{ transitionDelay: '310ms' }}>
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
        <section className="section section-alt" id="fleet" data-reveal>
          <div className="container">
            <div className="section-head">
              <div className="eyebrow"><span className="dot"></span>Our Fleet</div>
              <h2>Popular vehicles for <span className="title-gradient">every journey</span></h2>
              <p>From a quick airport drop to a 12-seater family tour, pick a vehicle that matches your trip.</p>
            </div>

            <div className="fleet-scroll" ref={fleetScrollRef}>
                {VEHICLES.map((v) => (
                  <div key={v.id} className="vehicle-card" id={`vehicle-${v.id}`} data-reveal style={{ transitionDelay: '60ms' }}>
                    <div className="vehicle-media">
                      {v.badge && <span className="badge">{v.badge}</span>}
                      <img
                        src={v.image}
                        alt={`${v.name} - TKV Drop Taxi`}
                        className="vehicle-real-img"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="vehicle-body">
                      <h3>{v.name}</h3>
                      <div className="vehicle-price">
                        One-Way: ₹{v.onewayRate}/km · Round: ₹{v.roundRate}/km
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', fontWeight: 500 }}>
                        Local: ₹{v.localPackage?.baseFare} (8h / 100km)
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

        {/* ============ POPULAR ROUTES (4 CARDS SINGLE ROW LAYOUT) ============ */}
        <section className="section popular-routes-section" id="popular-routes" data-reveal>
          <div className="container">
            <div className="section-head">
              <div className="eyebrow"><span className="dot"></span>POPULAR ROUTES</div>
              <h2>Explore our most <span className="title-gradient">requested travel routes</span></h2>
              <p>Direct door-to-door drops, 24×7 airport transfers, and long-distance intercity rides at transparent fixed fares.</p>
            </div>

            <div className="popular-routes-scroll" ref={routesScrollRef}
                aria-label="Popular route carousel"
              >
                {POPULAR_ROUTE_CARDS.map((cat, index) => (
                  <div key={cat.id} className="popular-route-card" id={`popular-route-${cat.id}`} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
                    <div className="popular-route-card-header">
                      <div className="popular-route-title-row">
                        <div className="popular-route-icon-box">
                          <PinIcon className="popular-route-loc-icon" />
                        </div>
                        <h3 className="popular-route-title">{cat.category}</h3>
                      </div>
                      {cat.badge && <span className="popular-route-badge">{cat.badge}</span>}
                    </div>

                    <div className="popular-route-list">
                      {cat.routes.map((r, rIdx) => (
                        <button
                          key={rIdx}
                          type="button"
                          className="popular-route-item"
                          onClick={() => handleSelectPopularRoute(r.from, r.to)}
                          title={`Click to set pickup: ${r.from} and drop: ${r.to}`}
                        >
                          <div className="popular-route-item-left">
                            <span className="route-bullet"></span>
                            <span className="route-label-text">{r.label}</span>
                          </div>
                          <span className="route-select-tag">Book ➔</span>
                        </button>
                      ))}
                    </div>

                    <div className="popular-route-footer">
                      <a
                        href={getPopularRouteWhatsAppUrl(cat.category)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="popular-route-view-all"
                        id={`view-all-${cat.id}`}
                      >
                        <span>{cat.actionText}</span>
                      </a>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section className="section" id="services" data-reveal>
          <div className="container">
            <div className="section-head">
              <div className="eyebrow"><span className="dot"></span>What We Offer</div>
              <h2>Services designed <span className="title-gradient">around your trip</span></h2>
              <p>One partner for every kind of journey — business, family, celebration or pilgrimage.</p>
            </div>
            <div className="grid grid-4" id="servicesGrid">
              {SERVICES.map((s, index) => (
                <div key={s.id} className="service-card" id={`service-${s.id}`} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
                  <div className="service-media">
                    <img
                      src={s.image}
                      alt={`${s.name} - TKV Drop Taxi Hosur`}
                      className="service-real-img"
                      loading="lazy"
                      referrerPolicy="no-referrer"
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
        <section className="section section-alt" id="fare-calculator" data-reveal>
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
                      className={tripType === 'local' ? 'active' : ''}
                      onClick={() => setTripType('local')}
                      id="btnTripLocal"
                    >
                      Local Trip (8h/100km)
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
                    {VEHICLES.map((v, i) => {
                      const label = tripType === 'local'
                        ? `${v.name} — ₹${v.localPackage?.baseFare} (8h / 100km)`
                        : tripType === 'roundtrip'
                          ? `${v.name} — ₹${v.roundRate}/km`
                          : `${v.name} — ₹${v.onewayRate}/km`;
                      return (
                        <option key={v.id} value={i}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {tripType !== 'local' ? (
                  <div className="form-group">
                    <label htmlFor="distanceInput">Distance (KM)</label>
                    <input
                      type="number"
                      min={1}
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(e.target.value)}
                      className="input"
                      id="distanceInput"
                      placeholder="e.g. 120"
                    />
                    <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '6px', lineHeight: 1.4 }}>
                      {tripType === 'oneway' ? (
                        <span>Rate: <strong>₹{currentVehicle.onewayRate}/km</strong> (Sedan ₹15 · SUV ₹20 · Innova/Crysta ₹21)</span>
                      ) : (
                        <span>Rate: <strong>₹{currentVehicle.roundRate}/km</strong> (Sedan ₹14 · SUV ₹19 · Innova/Crysta ₹20) · Round distance billed</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{
                      padding: '12px 14px',
                      background: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      borderRadius: '12px',
                      marginBottom: '16px',
                      fontSize: '13px',
                      color: '#166534',
                      lineHeight: 1.5
                    }}>
                      <div style={{ fontWeight: 700, marginBottom: '2px' }}>✓ Included in Base Package: 8 Hours &amp; 100 KM</div>
                      <div>Base Fare: <strong>₹{currentVehicle.localPackage?.baseFare || 2000}</strong> (Sedan ₹2,000 · SUV ₹2,800 · Innova ₹3,500)</div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="extraKmInput">Extra KM</label>
                        <input
                          type="number"
                          min={0}
                          value={extraKm}
                          onChange={(e) => setExtraKm(e.target.value)}
                          className="input"
                          id="extraKmInput"
                          placeholder="0"
                        />
                        <span style={{ fontSize: '12px', color: '#64748B', marginTop: '4px', display: 'block' }}>
                          +₹{currentVehicle.localPackage?.extraKmRate || 14}/km extra
                        </span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="extraHoursInput">Extra Waiting (Hours)</label>
                        <input
                          type="number"
                          min={0}
                          value={extraHours}
                          onChange={(e) => setExtraHours(e.target.value)}
                          className="input"
                          id="extraHoursInput"
                          placeholder="0"
                        />
                        <span style={{ fontSize: '12px', color: '#64748B', marginTop: '4px', display: 'block' }}>
                          +₹{currentVehicle.localPackage?.waitingPerHour || 150}/hr waiting
                        </span>
                      </div>
                    </div>
                  </>
                )}

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
                  {tripType === 'local' ? (
                    <>
                      <div className="result-row">
                        <span>Trip Type</span>
                        <span id="rTripType">Local Package (8h / 100km)</span>
                      </div>
                      <div className="result-row">
                        <span>Selected Vehicle</span>
                        <span id="rVehicle">{currentVehicle.name}</span>
                      </div>
                      <div className="result-row">
                        <span>Base Package (8h / 100km)</span>
                        <span id="rBaseFare">{formatINR(calculation.baseFare)}</span>
                      </div>
                      {calculation.extraKm ? (
                        <div className="result-row">
                          <span>Extra Distance ({calculation.extraKm} km @ ₹{calculation.pkg?.extraKmRate}/km)</span>
                          <span id="rExtraKm">{formatINR(calculation.extraKmCost || 0)}</span>
                        </div>
                      ) : null}
                      {calculation.extraHours ? (
                        <div className="result-row">
                          <span>Extra Waiting ({calculation.extraHours} hr @ ₹{calculation.pkg?.waitingPerHour}/hr)</span>
                          <span id="rExtraHours">{formatINR(calculation.extraWaitingCost || 0)}</span>
                        </div>
                      ) : null}
                      <div className="result-row">
                        <span>Driver Bata</span>
                        <span id="rDriverBeta" style={{ color: '#FCD34D' }}>{formatINR(calculation.driverBata || 400)}</span>
                      </div>
                      <div className="result-row">
                        <span>Toll &amp; Parking</span>
                        <span id="rTollExtra" style={{ color: '#FCD34D' }}>Extra</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="result-row">
                        <span>Trip Type</span>
                        <span id="rTripType">{tripType === 'oneway' ? 'One Way Drop' : 'Round Trip'}</span>
                      </div>
                      <div className="result-row">
                        <span>Selected Vehicle</span>
                        <span id="rVehicle">{currentVehicle.name}</span>
                      </div>
                      <div className="result-row">
                        <span>Rate per KM</span>
                        <span id="rRate">₹{calculation.ratePerKm}/km</span>
                      </div>
                      <div className="result-row">
                        <span>{tripType === 'roundtrip' ? 'Round Distance Billed' : 'Billed Distance'}</span>
                        <span id="rBilledKm">{calculation.billedKm} KM {tripType === 'roundtrip' ? `(${distanceKm} km × 2)` : ''}</span>
                      </div>
                      <div className="result-row">
                        <span>Base Trip Fare</span>
                        <span id="rBaseFare">{formatINR(calculation.baseFare)}</span>
                      </div>
                      <div className="result-row">
                        <span>Driver Bata</span>
                        <span id="rDriverBeta" style={{ color: '#FCD34D' }}>{formatINR(calculation.driverBata || 400)}</span>
                      </div>
                      <div className="result-row">
                        <span>Toll &amp; Parking</span>
                        <span id="rTollExtra" style={{ color: '#FCD34D' }}>Extra</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="result-total">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>Final Estimate</span>
                    <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 400 }}>+ Toll &amp; Parking Extra</span>
                  </div>
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
                  *This is an estimated fare based on standard rates. Toll, parking, and permit charges (if any) are extra. Zero hidden charges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ REVIEWS ============ */}
        <section className="section section-alt" id="reviews" data-reveal>
          <div className="container">
            <div className="section-head">
              <div className="eyebrow"><span className="dot"></span>Customer Reviews</div>
              <h2>Trusted by <span className="title-gradient">families &amp; businesses</span></h2>
              <p>Real feedback from travellers across Hosur, Krishnagiri and Bangalore.</p>
            </div>
            <div className="reviews-grid">
              {REVIEWS.map((r, i) => (
                  <div key={i} className="review-card" id={`review-${i}`} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
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
        <section className="section section-alt" id="about" data-reveal>
          <div className="container">
            <div className="section-head">
              <div className="eyebrow"><span className="dot"></span>About Us</div>
              <h2>A decade on <span className="title-gradient">South India's highways</span></h2>
              <p>TKV Drop Taxi provides reliable one-way drop taxi and outstation cab services from Hosur to Bangalore, Chennai, Krishnagiri and other destinations across Tamil Nadu.</p>
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

              <div className="about-story">
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
        <section className="section" id="contact" data-reveal>
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
                <img src={brandLogo} alt="TKV Drop Taxi Logo" className="logo-mark" />
              </div>
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
