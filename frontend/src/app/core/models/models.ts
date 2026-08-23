/**
 * Interfaces TypeScript miroir des entites du backend Spring Boot.
 * Un seul fichier pour simplifier les imports dans les composants.
 */

export interface BaseEntity {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Destination extends BaseEntity {
  name: string;
  region?: string;
  flightCode?: string;
  shortDescription?: string;
  fullDescription?: string;
  imageUrl?: string;
  displayOrder?: number;
  published?: boolean;
}

export interface ServiceItem extends BaseEntity {
  title: string;
  icon?: string;
  description?: string;
  displayOrder?: number;
  published?: boolean;
}

export interface Offer extends BaseEntity {
  title: string;
  destination?: string;
  priceLabel?: string;
  description?: string;
  published?: boolean;
}

export interface Testimonial extends BaseEntity {
  clientLabel?: string;
  destination?: string;
  rating?: number;
  imageUrl?: string;
  caption?: string;
  published?: boolean;
}

export interface Photo extends BaseEntity {
  title?: string;
  url: string;
  category?: string;
  published?: boolean;
}

export interface Video extends BaseEntity {
  title?: string;
  url: string;
  thumbnailUrl?: string;
  duration?: string;
  published?: boolean;
}

export interface Article extends BaseEntity {
  title: string;
  category?: string;
  author?: string;
  content?: string;
  coverImageUrl?: string;
  published?: boolean;
}

export interface Faq extends BaseEntity {
  question: string;
  answer?: string;
  category?: string;
  displayOrder?: number;
  published?: boolean;
}

export interface Appointment extends BaseEntity {
  clientName: string;
  clientPhone?: string;
  appointmentDate?: string; // yyyy-MM-dd
  appointmentTime?: string; // HH:mm
  type?: string;
  status?: 'A_CONFIRMER' | 'CONFIRME' | 'ANNULE' | 'TERMINE';
}

export interface ClientRequest extends BaseEntity {
  fullName: string;
  phone?: string;
  destination?: string;
  projectType?: string;
  message?: string;
  status?: 'NOUVELLE' | 'EN_COURS' | 'DOSSIER_PRET' | 'CLOTUREE';
}

export interface Client extends BaseEntity {
  fullName: string;
  phone?: string;
  email?: string;
  activeFile?: string;
  status?: string;
  notes?: string;
}

export interface ContactMessage extends BaseEntity {
  senderName: string;
  subject?: string;
  content?: string;
  read?: boolean;
}

export interface AdminUserModel extends BaseEntity {
  fullName: string;
  email: string;
  password?: string; // seulement en ecriture (creation/changement)
  role?: string;
  active?: boolean;
}

export interface SiteSettings extends BaseEntity {
  agencyName?: string;
  slogan?: string;
  logoUrl?: string;
  whatsappNumber?: string;
  address?: string;
  email?: string;
  hoursWeekdays?: string;
  hoursSaturday?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface DashboardStats {
  requestsThisMonth: number;
  newClientsThisMonth: number;
  upcomingAppointments: number;
  unreadMessages: number;
  requestsByDestination: Record<string, number>;
  requestsByMonth: { month: string; count: number }[];
}

export interface LoginRequest { email: string; password: string; }
export interface LoginResponse { token: string; fullName: string; email: string; role: string; }
