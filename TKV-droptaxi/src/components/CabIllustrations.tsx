import React from 'react';

interface CabSvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// 1. SEDAN (Swift Dzire style with amber taxi bumper accents)
export const SedanCarSvg: React.FC<CabSvgProps> = ({ className = 'w-full h-auto', ...props }) => (
  <svg viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    {/* Body Shadow */}
    <ellipse cx="80" cy="62" rx="66" ry="4.5" fill="#000000" fillOpacity="0.16" />
    
    {/* Main Body */}
    <path
      d="M16 48C14 48 12.5 45 13 41L15 36C17 31 22 28 32 26C39 24 53 14 68 12C85 10 112 11 123 20C132 27 141 33 146 38C148 40 149 43 148 46C147 49 144 50 141 50H124C122 43 115 38 107 38C99 38 92 43 90 50H56C54 43 47 38 39 38C31 38 24 43 22 50H16V48Z"
      fill="#F1F5F9"
      stroke="#1E293B"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    
    {/* Rear Amber Bumper */}
    <path
      d="M13 41L15 36C16.5 32 19 30 23 29V47C18 47 14 47 13 41Z"
      fill="#F59E0B"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    
    {/* Front Amber Bumper */}
    <path
      d="M141 50C144 50 147 49 148 46C149 43 148 40 146 38L137 38V49.8L141 50Z"
      fill="#F59E0B"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Windows */}
    {/* Rear Window */}
    <path
      d="M37 27C44 24 54 16 66 14.5V27H37Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Middle Window */}
    <path
      d="M71 14.5C80 13.8 94 14 98 14.5V27H71V14.5Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Front Windshield Window */}
    <path
      d="M103 15C110 16 118 20 124 27H103V15Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Door Handles & Seams */}
    <line x1="71" y1="27" x2="71" y2="48" stroke="#64748B" strokeWidth="1.6" />
    <line x1="103" y1="27" x2="103" y2="48" stroke="#64748B" strokeWidth="1.6" />
    <rect x="76" y="32" width="7" height="2.2" rx="1" fill="#1E293B" />
    <rect x="48" y="32" width="7" height="2.2" rx="1" fill="#1E293B" />

    {/* Headlight & Taillight */}
    <path d="M144 38C145 39 146 41 146 42H140V38H144Z" fill="#FBBF24" />
    <path d="M14 36C15 35 17 35 18 36V40H14.5L14 36Z" fill="#EF4444" />

    {/* Rear Wheel */}
    <g>
      <circle cx="39" cy="50" r="11.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <circle cx="39" cy="50" r="5.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="39" cy="50" r="2.2" fill="#0F172A" />
    </g>

    {/* Front Wheel */}
    <g>
      <circle cx="107" cy="50" r="11.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <circle cx="107" cy="50" r="5.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="107" cy="50" r="2.2" fill="#0F172A" />
    </g>
  </svg>
);

// 2. ETIOS (Toyota Etios Sedan profile with sharp lines and amber accents)
export const EtiosCarSvg: React.FC<CabSvgProps> = ({ className = 'w-full h-auto', ...props }) => (
  <svg viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    {/* Body Shadow */}
    <ellipse cx="80" cy="62" rx="66" ry="4.5" fill="#000000" fillOpacity="0.16" />
    
    {/* Main Body */}
    <path
      d="M13 49C12 47 11 44 12 39L15 33C17 29 23 27 34 26C45 25 56 16 71 14C88 12 110 13 121 21C131 28 142 34 147 38C149 40 150 43 149 47C148 50 144 51 140 51H123C121 44 114 39 106 39C98 39 91 44 89 51H55C53 44 46 39 38 39C30 39 23 44 21 51H13V49Z"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    
    {/* Rear Amber Bumper */}
    <path
      d="M12 39L15 33C17 29 20 28 24 27V48C18 48 13 46 12 39Z"
      fill="#F59E0B"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    
    {/* Front Amber Bumper */}
    <path
      d="M140 51C144 51 148 50 149 47C150 43 149 40 147 38L136 38V50.8L140 51Z"
      fill="#F59E0B"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Windows (Sleek Etios side windows) */}
    {/* Rear Window */}
    <path
      d="M39 27C48 25 57 18 68 16V27H39Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Middle Window */}
    <path
      d="M73 16C82 15.5 93 15.5 97 16V27H73V16Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Front Window */}
    <path
      d="M102 16.5C108 17.5 116 21 123 27H102V16.5Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Body Lines & Handles */}
    <line x1="73" y1="27" x2="73" y2="49" stroke="#64748B" strokeWidth="1.6" />
    <line x1="102" y1="27" x2="102" y2="49" stroke="#64748B" strokeWidth="1.6" />
    <line x1="26" y1="36" x2="135" y2="36" stroke="#CBD5E1" strokeWidth="1.2" />
    <rect x="78" y="32" width="7" height="2.2" rx="1" fill="#1E293B" />
    <rect x="49" y="32" width="7" height="2.2" rx="1" fill="#1E293B" />

    {/* Lights */}
    <path d="M145 38C147 39 148 41 148 42H141V38H145Z" fill="#FBBF24" />
    <path d="M13 34C14 33 16 33 17 34V38H13.5L13 34Z" fill="#EF4444" />

    {/* Rear Wheel */}
    <g>
      <circle cx="38" cy="51" r="11.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <circle cx="38" cy="51" r="5.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="38" cy="51" r="2.2" fill="#0F172A" />
    </g>

    {/* Front Wheel */}
    <g>
      <circle cx="106" cy="51" r="11.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <circle cx="106" cy="51" r="5.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="106" cy="51" r="2.2" fill="#0F172A" />
    </g>
  </svg>
);

// 3. SUV (Maruti Ertiga / Scorpio / Compact SUV profile)
export const SuvCarSvg: React.FC<CabSvgProps> = ({ className = 'w-full h-auto', ...props }) => (
  <svg viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    {/* Body Shadow */}
    <ellipse cx="80" cy="62" rx="66" ry="4.5" fill="#000000" fillOpacity="0.16" />
    
    {/* Roof Rail */}
    <rect x="42" y="10" width="62" height="2.5" rx="1" fill="#475569" stroke="#1E293B" strokeWidth="1" />
    <rect x="46" y="12.5" width="4" height="2" fill="#1E293B" />
    <rect x="71" y="12.5" width="4" height="2" fill="#1E293B" />
    <rect x="96" y="12.5" width="4" height="2" fill="#1E293B" />

    {/* Main SUV Body */}
    <path
      d="M17 50C15 48 14 44 15 39L18 25C19 20 22 17 28 15C38 13 47 13 65 13C85 13 103 14 112 18C121 23 133 31 142 36C146 39 148 42 147 47C146 50 142 51 138 51H122C120 44 113 39 105 39C97 39 90 44 88 51H56C54 44 47 39 39 39C31 39 24 44 22 51H17V50Z"
      fill="#F1F5F9"
      stroke="#1E293B"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    
    {/* Rear Amber Bumper */}
    <path
      d="M15 39L18 25C19 21 22 18 26 17V48C20 48 16 46 15 39Z"
      fill="#F59E0B"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    
    {/* Front Amber Bumper */}
    <path
      d="M138 51C142 51 146 50 147 47C148 42 146 39 142 36L134 36V50.8L138 51Z"
      fill="#F59E0B"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* 3 SUV Side Windows */}
    {/* Rear Quarter Window */}
    <path
      d="M26 19H48V28H26V19Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Middle Passenger Window */}
    <path
      d="M53 17H80V28H53V17Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Front Windshield Window */}
    <path
      d="M85 17H106C112 20 119 24 123 28H85V17Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Pillars & Handles */}
    <line x1="53" y1="28" x2="53" y2="49" stroke="#64748B" strokeWidth="1.6" />
    <line x1="85" y1="28" x2="85" y2="49" stroke="#64748B" strokeWidth="1.6" />
    <rect x="61" y="32" width="7" height="2.2" rx="1" fill="#1E293B" />
    <rect x="91" y="32" width="7" height="2.2" rx="1" fill="#1E293B" />

    {/* Lights */}
    <path d="M141 36C143 37 144 39 144 41H138V36H141Z" fill="#FBBF24" />
    <path d="M16 26C17 25 19 25 20 26V32H16.5L16 26Z" fill="#EF4444" />

    {/* Rear Wheel */}
    <g>
      <circle cx="39" cy="51" r="11.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <circle cx="39" cy="51" r="5.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="39" cy="51" r="2.2" fill="#0F172A" />
    </g>

    {/* Front Wheel */}
    <g>
      <circle cx="105" cy="51" r="11.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <circle cx="105" cy="51" r="5.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="105" cy="51" r="2.2" fill="#0F172A" />
    </g>
  </svg>
);

// 4. INNOVA (Toyota Innova Crysta / Luxury MPV profile)
export const InnovaCarSvg: React.FC<CabSvgProps> = ({ className = 'w-full h-auto', ...props }) => (
  <svg viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    {/* Body Shadow */}
    <ellipse cx="80" cy="62" rx="66" ry="4.5" fill="#000000" fillOpacity="0.16" />
    
    {/* Roof Line accent */}
    <line x1="38" y1="12" x2="112" y2="12" stroke="#94A3B8" strokeWidth="1.5" />

    {/* Main Innova MPV Body */}
    <path
      d="M17 50C15 48 14 44 15 39L18 24C19 18 23 15 30 14C45 13 65 13 88 13C105 13 118 15 127 21C135 27 144 33 148 37C150 40 150 44 148 48C147 50 143 51 139 51H123C121 44 114 39 106 39C98 39 91 44 89 51H56C54 44 47 39 39 39C31 39 24 44 22 51H17V50Z"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    
    {/* Rear Amber Bumper */}
    <path
      d="M15 39L18 24C19 19 22 16 26 15V48C20 48 16 46 15 39Z"
      fill="#F59E0B"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    
    {/* Front Amber Bumper */}
    <path
      d="M139 51C143 51 147 50 148 48C150 44 150 40 148 37L138 37V50.8L139 51Z"
      fill="#F59E0B"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Innova 3 Panoramic Windows */}
    {/* Rear Quarter Window */}
    <path
      d="M27 17H50V27H27V17Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Middle Window */}
    <path
      d="M55 16H84V27H55V16Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Front Windshield Window */}
    <path
      d="M89 16H114C121 19 129 23 134 27H89V16Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Window Tint Divider lines */}
    <line x1="55" y1="27" x2="55" y2="49" stroke="#64748B" strokeWidth="1.6" />
    <line x1="89" y1="27" x2="89" y2="49" stroke="#64748B" strokeWidth="1.6" />
    <line x1="28" y1="36" x2="136" y2="36" stroke="#CBD5E1" strokeWidth="1.2" />
    
    {/* Door Handles */}
    <rect x="63" y="32" width="7" height="2.2" rx="1" fill="#1E293B" />
    <rect x="97" y="32" width="7" height="2.2" rx="1" fill="#1E293B" />

    {/* Headlights & Taillights */}
    <path d="M145 37C147 38 148 40 148 42H141V37H145Z" fill="#FBBF24" />
    <path d="M16 26C17 25 19 25 20 26V32H16.5L16 26Z" fill="#EF4444" />

    {/* Rear Wheel */}
    <g>
      <circle cx="39" cy="51" r="11.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <circle cx="39" cy="51" r="5.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="39" cy="51" r="2.2" fill="#0F172A" />
    </g>

    {/* Front Wheel */}
    <g>
      <circle cx="106" cy="51" r="11.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <circle cx="106" cy="51" r="5.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="106" cy="51" r="2.2" fill="#0F172A" />
    </g>
  </svg>
);
