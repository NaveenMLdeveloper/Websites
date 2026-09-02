/**
 * BS Travels - Main Client Scripts
 * Handles header transitions, mobile navigation drawer, FAQ accordion,
 * scroll animations, interactive modals, and fleet filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initActiveNavLink();
  initFAQAccordion();
  initScrollReveal();
  initBookingModal();
  initFleetFiltering();
  initCopyAddress();
});

/**
 * Sticky Header Scroll State
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Drawer Navigation
 */
function initMobileNav() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  const navBackdrop = document.getElementById('mobile-nav-backdrop');
  const closeBtn = document.getElementById('mobile-nav-close');

  if (!menuToggle || !mobileNav) return;

  function openMenu() {
    mobileNav.classList.add('is-open');
    if (navBackdrop) navBackdrop.classList.add('is-active');
    document.body.classList.add('no-scroll');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileNav.classList.remove('is-open');
    if (navBackdrop) navBackdrop.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = mobileNav.classList.contains('is-open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMenu);
  }

  // Close when tapping on mobile navigation links
  mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/**
 * Highlight Current Page Nav Link
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const cleanHref = href.toLowerCase().replace('./', '').replace('/', '');
    const cleanPath = currentPath.replace('/', '') || 'index.html';

    if (
      (cleanHref === cleanPath) ||
      (cleanPath === '' && cleanHref === 'index.html') ||
      (cleanPath.endsWith(cleanHref) && cleanHref !== '')
    ) {
      link.classList.add('active');
    }
  });
}

/**
 * FAQ Accordion
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const isExpanded = item.classList.contains('is-open');

      // Close all other items for clean single accordion
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          const otherTrigger = otherItem.querySelector('.faq-question');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isExpanded) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Scroll Reveal Animations
 */
function initScrollReveal() {
  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Quick Booking & WhatsApp Enquiry Modal
 */
function initBookingModal() {
  const modal = document.getElementById('quick-booking-modal');
  const openButtons = document.querySelectorAll('[data-open-modal="booking"]');
  const closeBtn = document.getElementById('booking-modal-close');
  const backdrop = document.getElementById('booking-modal-backdrop');
  const form = document.getElementById('quick-booking-form');

  if (!modal) return;

  function openModal(defaultVehicle = "Toyota Innova Crysta", defaultService = "Outstation Trip") {
    modal.classList.add('is-active');
    document.body.classList.add('no-scroll');

    const vehicleSelect = modal.querySelector('#modal-vehicle-select');
    if (vehicleSelect && defaultVehicle) {
      vehicleSelect.value = defaultVehicle;
    }

    const tripTypeInput = modal.querySelector('#modal-trip-type');
    if (tripTypeInput && defaultService) {
      tripTypeInput.value = defaultService;
    }
  }

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const vehicle = btn.getAttribute('data-vehicle-name') || "Toyota Innova Crysta";
      const service = btn.getAttribute('data-service-name') || "Outstation Trip";
      openModal(vehicle, service);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const vehicle = form.querySelector('#modal-vehicle-select')?.value || "Toyota Innova Crysta";
      const pickup = form.querySelector('#modal-pickup')?.value || "Hosur";
      const destination = form.querySelector('#modal-destination')?.value || "";
      const date = form.querySelector('#modal-date')?.value || "Upcoming date";
      const tripType = form.querySelector('#modal-trip-type')?.value || "Outstation Trip";
      const passengers = form.querySelector('#modal-passengers')?.value || "4-6";

      if (typeof getVehicleBookingMessage === 'function' && typeof getWhatsAppUrl === 'function') {
        const msg = getVehicleBookingMessage(vehicle, {
          pickup,
          destination,
          pickupDate: date,
          tripType,
          passengers
        });

        window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
        closeModal();
      }
    });
  }
}

/**
 * Fleet Categorization Filtering on Fleet Page
 */
function initFleetFiltering() {
  const filterBtns = document.querySelectorAll('[data-fleet-filter]');
  const fleetCards = document.querySelectorAll('.fleet-card-item');

  if (!filterBtns.length || !fleetCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = btn.getAttribute('data-fleet-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      fleetCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => card.classList.add('is-revealed'), 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Copy Address and Phone Helper
 */
function initCopyAddress() {
  const copyBtns = document.querySelectorAll('[data-copy-text]');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-text');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.textContent;
        btn.textContent = "Copied to clipboard!";
        btn.classList.add('is-copied');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('is-copied');
        }, 2000);
      } catch (err) {
        console.log('Copy error:', err);
      }
    });
  });
}
