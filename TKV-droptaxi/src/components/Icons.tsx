import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const PhoneIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.004 2C6.478 2 2 6.477 2 12c0 1.88.522 3.653 1.44 5.184L2 22l4.933-1.398A9.958 9.958 0 0 0 12.004 22C17.53 22 22 17.523 22 12S17.53 2 12.004 2zm0 18.115a8.09 8.09 0 0 1-4.132-1.133l-.297-.176-3.106.88.898-3.011-.194-.31A8.08 8.08 0 0 1 3.905 12c0-4.472 3.638-8.115 8.099-8.115 4.462 0 8.096 3.643 8.096 8.115 0 4.473-3.634 8.115-8.096 8.115z" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8.5 12.5l2.5 2.5 5-5" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 16 14" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const GpsIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
);

export const SparkleIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3l1.9 4.9L19 9.8l-4.9 1.9L12 17l-2-5.3L5 9.8l5.1-1.9z" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2 4 5v6c0 5.2 3.4 9.8 8 11 4.6-1.2 8-5.8 8-11V5z" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.59 13.41 11 3.83 3.83 11l9.58 9.58a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.82z" />
    <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const TimerIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2M9 2h6M12 2v3" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className = 'w-3 h-3', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const PlaneIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17.8 19.2 16 11l3.5-3.5c.83-.83.83-2.17 0-3s-2.17-.83-3 0L13 8l-8.2-1.8-1.6 1.6L9.7 11 6 14.7l-2.9-.6-1.1 1.1L5.6 18l2.8 3.6 1.1-1.1-.6-2.9L12.6 14l3.6 6.4z" />
  </svg>
);

export const BuildingIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <path d="M9 22v-4h6v4M9 6h1M14 6h1M9 10h1M14 10h1M9 14h1M14 14h1" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

export const MountainIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 3 4 12h8L8 3zM16 8l-6 13h13l-7-13z" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export const SchoolIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 10 12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
  </svg>
);

export const BookIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const MapPackageIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3M3 8l9 5 9-5M3 8v11a2 2 0 0 0 2 2h4M12 13v9" />
    <circle cx="18" cy="17" r="4" />
    <path d="M18 15.5v3l1.5 1" />
  </svg>
);

export const RepeatIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

export const PinIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const CarVectorIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 17h14M5 17a2 2 0 1 1-.001 4.001A2 2 0 0 1 5 17zm14 0a2 2 0 1 1-.001 4.001A2 2 0 0 1 19 17zM3 17v-4l2-5a2 2 0 0 1 2-1.4h10A2 2 0 0 1 19 8l2 5v4" />
    <path d="M3 13h18M7 13V9M17 13V9" />
  </svg>
);

export const VanVectorIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 17h1M3 17V8a1 1 0 0 1 1-1h11l4 4v6h-1M3 17h13M17 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM14 7v6h7" />
  </svg>
);

export const BusVectorIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M3 11h18M7 17v2M17 17v2" />
    <circle cx="7.5" cy="20" r="1" />
    <circle cx="16.5" cy="20" r="1" />
  </svg>
);

export const SnowIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
    <path d="M12 2v20M4.9 5.9l14.2 12.2M19.1 5.9 4.9 18.1M2 12h20M6 6l1.5 3M18 6l-1.5 3M6 18l1.5-3M18 18l-1.5-3" />
  </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H17V3.7c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.96 1.44-3.96 4.07V10H8v3.1h2.67V21z" />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" />
  </svg>
);

export const YouTubeIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12s0-3.2-.4-4.7c-.2-.9-1-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.5c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7c.2.9 1 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.5c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.7.4-4.7zM10 15.2V8.8l5.5 3.2z" />
  </svg>
);

export const SedanCarGraphic: React.FC<IconProps> = ({ className = 'w-16 h-8', ...props }) => (
  <svg className={className} viewBox="0 0 100 45" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Rear bumper yellow accent */}
    <path d="M6 28 C6 24 8 22 10 22 L16 22 L16 35 L10 35 C7 35 6 32 6 28 Z" fill="#F59E0B" stroke="#1F2937" strokeWidth="1.5" />
    {/* Front bumper yellow accent */}
    <path d="M84 26 C87 26 94 28 94 32 C94 35 91 36 86 36 L82 36 L82 26 Z" fill="#F59E0B" stroke="#1F2937" strokeWidth="1.5" />
    {/* Car body */}
    <path d="M10 23 L22 16 C26 13 32 8 40 8 L66 8 C74 8 80 15 84 24 L86 26 L86 35 L76 35 C76 30 71 26 66 26 C61 26 56 30 56 35 L34 35 C34 30 29 26 24 26 C19 26 14 30 14 35 L8 35 C6 35 5 32 5 28 C5 24 7 23 10 23 Z" fill="#F3F4F6" stroke="#1F2937" strokeWidth="1.6" strokeLinejoin="round" />
    {/* Windows */}
    <path d="M26 18 L38 12 L50 12 L50 22 L24 22 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.3" />
    <path d="M54 12 L66 12 C71 12 75 16 78 22 L54 22 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.3" />
    {/* Wheels */}
    <circle cx="24" cy="34" r="7" fill="#1F2937" />
    <circle cx="24" cy="34" r="3.5" fill="#E5E7EB" stroke="#1F2937" strokeWidth="1" />
    <circle cx="66" cy="34" r="7" fill="#1F2937" />
    <circle cx="66" cy="34" r="3.5" fill="#E5E7EB" stroke="#1F2937" strokeWidth="1" />
  </svg>
);

export const EtiosCarGraphic: React.FC<IconProps> = ({ className = 'w-16 h-8', ...props }) => (
  <svg className={className} viewBox="0 0 100 45" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Rear bumper yellow accent */}
    <path d="M5 26 C5 23 7 21 9 21 L14 21 L14 34 L8 34 C6 34 5 30 5 26 Z" fill="#F59E0B" stroke="#1F2937" strokeWidth="1.5" />
    {/* Front bumper yellow accent */}
    <path d="M85 28 C89 28 95 30 95 33 C95 36 91 36 86 36 L83 36 L83 28 Z" fill="#F59E0B" stroke="#1F2937" strokeWidth="1.5" />
    {/* Car body */}
    <path d="M9 22 L20 15 C25 11 32 9 42 9 L64 9 C72 9 78 14 83 22 L86 28 L86 35 L76 35 C76 30 71 26 66 26 C61 26 56 30 56 35 L34 35 C34 30 29 26 24 26 C19 26 14 30 14 35 L7 35 C5 35 4 30 4 26 C4 23 6 22 9 22 Z" fill="#F3F4F6" stroke="#1F2937" strokeWidth="1.6" strokeLinejoin="round" />
    {/* Windows */}
    <path d="M24 16 L38 12 L49 12 L49 22 L22 22 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.3" />
    <path d="M53 12 L64 12 C69 12 73 15 76 22 L53 22 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.3" />
    {/* Wheels */}
    <circle cx="24" cy="34" r="7" fill="#1F2937" />
    <circle cx="24" cy="34" r="3.5" fill="#E5E7EB" stroke="#1F2937" strokeWidth="1" />
    <circle cx="66" cy="34" r="7" fill="#1F2937" />
    <circle cx="66" cy="34" r="3.5" fill="#E5E7EB" stroke="#1F2937" strokeWidth="1" />
  </svg>
);

export const SuvCarGraphic: React.FC<IconProps> = ({ className = 'w-16 h-8', ...props }) => (
  <svg className={className} viewBox="0 0 100 45" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Front & Rear yellow accents */}
    <path d="M6 25 C6 23 8 21 11 21 L15 21 L15 34 L8 34 C6 34 6 30 6 25 Z" fill="#F59E0B" stroke="#1F2937" strokeWidth="1.5" />
    <path d="M85 27 C88 27 94 29 94 32 C94 35 90 35 86 35 L83 35 L83 27 Z" fill="#F59E0B" stroke="#1F2937" strokeWidth="1.5" />
    {/* SUV Body */}
    <path d="M8 22 L12 12 C13 9 17 8 22 8 L72 8 C78 8 83 14 86 24 L88 27 L88 34 L78 34 C78 29 73 25 68 25 C63 25 58 29 58 34 L34 34 C34 29 29 25 24 25 C19 25 14 29 14 34 L7 34 C5 34 5 28 5 24 C5 22 6 22 8 22 Z" fill="#F3F4F6" stroke="#1F2937" strokeWidth="1.6" strokeLinejoin="round" />
    {/* Windows */}
    <path d="M16 12 L32 12 L32 21 L16 21 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.3" />
    <path d="M36 12 L52 12 L52 21 L36 21 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.3" />
    <path d="M56 12 L70 12 C73 12 76 15 78 21 L56 21 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.3" />
    {/* Wheels */}
    <circle cx="24" cy="34" r="7.5" fill="#1F2937" />
    <circle cx="24" cy="34" r="3.5" fill="#E5E7EB" stroke="#1F2937" strokeWidth="1" />
    <circle cx="68" cy="34" r="7.5" fill="#1F2937" />
    <circle cx="68" cy="34" r="3.5" fill="#E5E7EB" stroke="#1F2937" strokeWidth="1" />
  </svg>
);

export const InnovaCarGraphic: React.FC<IconProps> = ({ className = 'w-16 h-8', ...props }) => (
  <svg className={className} viewBox="0 0 100 45" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Rear yellow accent */}
    <path d="M6 25 C6 22 8 20 11 20 L15 20 L15 34 L8 34 C6 34 6 30 6 25 Z" fill="#F59E0B" stroke="#1F2937" strokeWidth="1.5" />
    {/* Front yellow accent */}
    <path d="M85 27 C88 27 94 29 94 32 C94 35 90 35 86 35 L83 35 L83 27 Z" fill="#F59E0B" stroke="#1F2937" strokeWidth="1.5" />
    {/* Innova Body */}
    <path d="M8 21 L12 11 C13 8 18 7 24 7 L70 7 C76 7 81 12 85 21 L88 27 L88 34 L78 34 C78 29 73 25 68 25 C63 25 58 29 58 34 L34 34 C34 29 29 25 24 25 C19 25 14 29 14 34 L7 34 C5 34 5 28 5 24 C5 22 6 21 8 21 Z" fill="#F3F4F6" stroke="#1F2937" strokeWidth="1.6" strokeLinejoin="round" />
    {/* Long 3-pane MPV Windows */}
    <path d="M15 11 L31 11 L31 20 L15 20 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.3" />
    <path d="M35 11 L51 11 L51 20 L35 20 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.3" />
    <path d="M55 11 L68 11 C72 11 76 14 78 20 L55 20 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.3" />
    {/* Wheels */}
    <circle cx="24" cy="34" r="7.5" fill="#1F2937" />
    <circle cx="24" cy="34" r="3.5" fill="#E5E7EB" stroke="#1F2937" strokeWidth="1" />
    <circle cx="68" cy="34" r="7.5" fill="#1F2937" />
    <circle cx="68" cy="34" r="3.5" fill="#E5E7EB" stroke="#1F2937" strokeWidth="1" />
  </svg>
);

export const GooglePlayColorIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M382.77 233.32L94.05 69.87C79.79 61.8 62.46 72.16 62.46 88.55V423.45C62.46 439.84 79.79 450.2 94.05 442.13L382.77 278.68C398.24 269.93 398.24 242.07 382.77 233.32Z" fill="url(#gplay_grad4)" />
    <path d="M62.46 88.55C62.46 72.16 79.79 61.8 94.05 69.87L282.77 176.7L82.16 377.31L62.46 88.55Z" fill="url(#gplay_grad1)" />
    <path d="M62.46 423.45C62.46 439.84 79.79 450.2 94.05 442.13L282.77 335.3L82.16 134.69L62.46 423.45Z" fill="url(#gplay_grad2)" />
    <path d="M282.77 176.7L382.77 233.32C398.24 242.07 398.24 269.93 382.77 278.68L282.77 335.3L234.33 256L282.77 176.7Z" fill="url(#gplay_grad3)" />
    <defs>
      <linearGradient id="gplay_grad1" x1="62.46" y1="256" x2="282.77" y2="176.7" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00E5FF" />
        <stop offset="1" stopColor="#00A0FF" />
      </linearGradient>
      <linearGradient id="gplay_grad2" x1="62.46" y1="256" x2="282.77" y2="335.3" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00E676" />
        <stop offset="1" stopColor="#00C853" />
      </linearGradient>
      <linearGradient id="gplay_grad3" x1="234.33" y1="256" x2="390" y2="256" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD600" />
        <stop offset="0.5" stopColor="#FFAB00" />
        <stop offset="1" stopColor="#FF3D00" />
      </linearGradient>
      <linearGradient id="gplay_grad4" x1="62.46" y1="256" x2="390" y2="256" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00C853" />
        <stop offset="0.3" stopColor="#00A0FF" />
        <stop offset="0.7" stopColor="#FFAB00" />
        <stop offset="1" stopColor="#FF3D00" />
      </linearGradient>
    </defs>
  </svg>
);

export const AppleStoreWhiteIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', ...props }) => (
  <svg className={className} viewBox="0 0 170 170" fill="currentColor" {...props}>
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.6-7.85-11.75-14.44-6.19-9.84-11.04-20.91-14.55-33.21-3.51-12.3-5.27-23.77-5.27-34.41 0-14.45 3.63-26.4 10.89-35.85 7.26-9.45 16.5-14.28 27.72-14.49 4.35 0 9.4 1.16 15.16 3.49 5.76 2.33 9.4 3.52 10.92 3.52 1.4 0 5.25-1.28 11.56-3.83 6.31-2.55 11.83-3.65 16.56-3.3 12.36.96 22.09 5.7 29.19 14.21-10.78 6.53-16.05 15.54-15.82 27.02.23 9.17 3.64 16.89 10.23 23.16 6.59 6.27 14.42 9.77 23.49 10.51-2.45 7.42-5.46 14.65-9.03 21.68zM119.22 33.72c0-7.39 2.65-14.27 7.95-20.64 5.3-6.37 11.85-10.24 19.65-11.61.23 1.09.35 2.06.35 2.92 0 7.39-2.73 14.45-8.19 21.18-5.46 6.73-12.24 10.73-20.34 12-0.23-1.09-.35-2.06-.35-2.92z" />
  </svg>
);

export const BrandLogo: React.FC<IconProps> = ({ className = 'w-11 h-11', ...props }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="tkvBrandBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E40AF" />
        <stop offset="100%" stop-color="#1D4ED8" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#tkvBrandBlue)" />
    
    {/* Yellow Taxi Roof Light */}
    <rect x="23" y="10" width="18" height="4.5" rx="2" fill="#FACC15" />
    
    {/* Car body contour */}
    <path d="M14 34 L18 22 C19.5 18 22 16.5 27 16.5 L37 16.5 C42 16.5 44.5 18 46 22 L50 34" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
    
    {/* Wheels */}
    <circle cx="20" cy="40" r="4.5" fill="#FFFFFF" />
    <circle cx="20" cy="40" r="2" fill="#1E40AF" />
    <circle cx="44" cy="40" r="4.5" fill="#FFFFFF" />
    <circle cx="44" cy="40" r="2" fill="#1E40AF" />
    
    {/* Yellow bumper line */}
    <path d="M12 34 L52 34" stroke="#FACC15" strokeWidth="2.8" strokeLinecap="round" />
    
    {/* TKV text */}
    <text x="32" y="55" font-family="'Poppins', sans-serif" font-weight="900" font-size="10.5" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">TKV</text>
  </svg>
);
