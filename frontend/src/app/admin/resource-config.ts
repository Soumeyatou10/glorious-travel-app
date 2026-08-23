import { Type } from '@angular/core';
import {
  DestinationService, ServiceItemService, OfferService, TestimonialService,
  PhotoService, VideoService, ArticleService, FaqService, AppointmentService,
  ClientRequestService, ClientService, ContactMessageService, AdminUserService
} from '../core/services/admin-resource.services';

export type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'select' | 'photo' | 'video' | 'password';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];     // pour type "select"
  required?: boolean;
}

export interface ColumnConfig {
  key: string;
  label: string;
}

export interface ResourceConfig {
  title: string;
  subtitle: string;
  service: Type<any>;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  statusField?: string;   // colonne affichee sous forme de badge, si applicable
}

/**
 * Un seul point de configuration par ressource : le composant generique
 * AdminResourceComponent (voir admin-resource.component.ts) s'appuie dessus
 * pour construire dynamiquement le tableau et le formulaire d'ajout/edition.
 * Ajouter une nouvelle ressource admin = ajouter une entree ici + une route.
 */
export const RESOURCE_CONFIGS: Record<string, ResourceConfig> = {

  destinations: {
    title: 'Destinations', subtitle: 'Les destinations affichées sur le site public',
    service: DestinationService,
    columns: [{ key: 'name', label: 'Nom' }, { key: 'region', label: 'Région' }, { key: 'published', label: 'Publiée' }],
    fields: [
      { key: 'name', label: 'Nom', type: 'text', required: true },
      { key: 'region', label: 'Région', type: 'text' },
      { key: 'flightCode', label: 'Code vol (ex: DLA → YUL)', type: 'text' },
      { key: 'shortDescription', label: 'Description courte', type: 'textarea' },
      { key: 'fullDescription', label: 'Description complète', type: 'textarea' },
      { key: 'imageUrl', label: 'Photo', type: 'photo' },
      { key: 'displayOrder', label: "Ordre d'affichage", type: 'number' },
      { key: 'published', label: 'Publiée sur le site', type: 'checkbox' },
    ],
  },

  services: {
    title: 'Services', subtitle: "Les prestations proposées sur la page d'accueil",
    service: ServiceItemService,
    columns: [{ key: 'title', label: 'Service' }, { key: 'published', label: 'Publié' }],
    fields: [
      { key: 'title', label: 'Titre', type: 'text', required: true },
      { key: 'icon', label: 'Icône (emoji ou symbole)', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'displayOrder', label: "Ordre d'affichage", type: 'number' },
      { key: 'published', label: 'Publié sur le site', type: 'checkbox' },
    ],
  },

  offers: {
    title: 'Offres', subtitle: 'Offres et packages mis en avant',
    service: OfferService,
    columns: [{ key: 'title', label: 'Offre' }, { key: 'destination', label: 'Destination' }, { key: 'priceLabel', label: 'Prix' }],
    fields: [
      { key: 'title', label: 'Titre', type: 'text', required: true },
      { key: 'destination', label: 'Destination', type: 'text' },
      { key: 'priceLabel', label: 'Prix (ex: À partir de 350 000 FCFA)', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'published', label: 'Publiée sur le site', type: 'checkbox' },
    ],
  },

  testimonials: {
    title: 'Témoignages', subtitle: 'Avis clients affichés sur le site',
    service: TestimonialService,
    columns: [{ key: 'clientLabel', label: 'Client' }, { key: 'destination', label: 'Destination' }, { key: 'rating', label: 'Note' }],
    fields: [
      { key: 'clientLabel', label: 'Nom abrégé (ex: Client S.M.)', type: 'text', required: true },
      { key: 'destination', label: 'Destination', type: 'text' },
      { key: 'rating', label: 'Note (1 à 5)', type: 'number' },
      { key: 'imageUrl', label: 'Photo', type: 'photo' },
      { key: 'caption', label: 'Légende', type: 'textarea' },
      { key: 'published', label: 'Publié sur le site', type: 'checkbox' },
    ],
  },

  photos: {
    title: 'Photos', subtitle: 'Médiathèque utilisée dans la galerie du site',
    service: PhotoService,
    columns: [{ key: 'title', label: 'Titre' }, { key: 'category', label: 'Catégorie' }],
    fields: [
      { key: 'title', label: 'Titre', type: 'text' },
      { key: 'url', label: 'Fichier', type: 'photo', required: true },
      { key: 'category', label: 'Catégorie', type: 'text' },
      { key: 'published', label: 'Publiée sur le site', type: 'checkbox' },
    ],
  },

  videos: {
    title: 'Vidéos', subtitle: 'Vidéos utilisées sur le site (témoignages, présentation)',
    service: VideoService,
    columns: [{ key: 'title', label: 'Titre' }, { key: 'duration', label: 'Durée' }],
    fields: [
      { key: 'title', label: 'Titre', type: 'text' },
      { key: 'url', label: 'Fichier vidéo', type: 'video', required: true },
      { key: 'thumbnailUrl', label: 'Vignette', type: 'photo' },
      { key: 'duration', label: 'Durée (ex: 1:42)', type: 'text' },
      { key: 'published', label: 'Publiée sur le site', type: 'checkbox' },
    ],
  },

  articles: {
    title: 'Articles', subtitle: 'Contenus de blog et actualités',
    service: ArticleService,
    columns: [{ key: 'title', label: 'Titre' }, { key: 'category', label: 'Catégorie' }, { key: 'author', label: 'Auteur' }],
    fields: [
      { key: 'title', label: 'Titre', type: 'text', required: true },
      { key: 'category', label: 'Catégorie', type: 'text' },
      { key: 'author', label: 'Auteur', type: 'text' },
      { key: 'coverImageUrl', label: 'Image de couverture', type: 'photo' },
      { key: 'content', label: 'Contenu', type: 'textarea' },
      { key: 'published', label: 'Publié sur le site', type: 'checkbox' },
    ],
  },

  faqs: {
    title: 'FAQ', subtitle: 'Questions fréquentes affichées sur le site',
    service: FaqService,
    columns: [{ key: 'question', label: 'Question' }, { key: 'category', label: 'Catégorie' }],
    fields: [
      { key: 'question', label: 'Question', type: 'text', required: true },
      { key: 'answer', label: 'Réponse', type: 'textarea' },
      { key: 'category', label: 'Catégorie', type: 'text' },
      { key: 'displayOrder', label: "Ordre d'affichage", type: 'number' },
      { key: 'published', label: 'Publiée sur le site', type: 'checkbox' },
    ],
  },

  appointments: {
    title: 'Rendez-vous', subtitle: 'Rendez-vous planifiés avec les clients',
    service: AppointmentService,
    columns: [{ key: 'clientName', label: 'Client' }, { key: 'appointmentDate', label: 'Date' }, { key: 'status', label: 'Statut' }],
    fields: [
      { key: 'clientName', label: 'Client', type: 'text', required: true },
      { key: 'clientPhone', label: 'Téléphone', type: 'text' },
      { key: 'appointmentDate', label: 'Date (aaaa-mm-jj)', type: 'text' },
      { key: 'appointmentTime', label: 'Heure (hh:mm)', type: 'text' },
      { key: 'type', label: 'Type de rendez-vous', type: 'text' },
      { key: 'status', label: 'Statut', type: 'select', options: ['A_CONFIRMER', 'CONFIRME', 'ANNULE', 'TERMINE'] },
    ],
  },

  requests: {
    title: 'Demandes clients', subtitle: 'Toutes les demandes reçues depuis le site et WhatsApp',
    service: ClientRequestService,
    columns: [{ key: 'fullName', label: 'Client' }, { key: 'destination', label: 'Destination' }, { key: 'status', label: 'Statut' }],
    fields: [
      { key: 'fullName', label: 'Nom du client', type: 'text', required: true },
      { key: 'phone', label: 'Téléphone', type: 'text' },
      { key: 'destination', label: 'Destination', type: 'text' },
      { key: 'projectType', label: 'Type de projet', type: 'text' },
      { key: 'message', label: 'Message', type: 'textarea' },
      { key: 'status', label: 'Statut', type: 'select', options: ['NOUVELLE', 'EN_COURS', 'DOSSIER_PRET', 'CLOTUREE'] },
    ],
  },

  clients: {
    title: 'Clients', subtitle: 'Tous les clients enregistrés dans votre agence',
    service: ClientService,
    columns: [{ key: 'fullName', label: 'Client' }, { key: 'phone', label: 'Téléphone' }, { key: 'status', label: 'Statut' }],
    fields: [
      { key: 'fullName', label: 'Nom complet', type: 'text', required: true },
      { key: 'phone', label: 'Téléphone', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'activeFile', label: 'Dossier actif', type: 'text' },
      { key: 'status', label: 'Statut', type: 'text' },
      { key: 'notes', label: 'Notes internes', type: 'textarea' },
    ],
  },

  messages: {
    title: 'Messages', subtitle: 'Messages reçus via le formulaire et WhatsApp',
    service: ContactMessageService,
    columns: [{ key: 'senderName', label: 'Expéditeur' }, { key: 'subject', label: 'Sujet' }, { key: 'read', label: 'Lu' }],
    fields: [
      { key: 'senderName', label: 'Expéditeur', type: 'text', required: true },
      { key: 'subject', label: 'Sujet', type: 'text' },
      { key: 'content', label: 'Contenu', type: 'textarea' },
      { key: 'read', label: 'Marqué comme lu', type: 'checkbox' },
    ],
  },

  users: {
    title: 'Utilisateurs administrateurs', subtitle: 'Comptes ayant accès à cet espace',
    service: AdminUserService,
    columns: [{ key: 'fullName', label: 'Nom' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Rôle' }],
    fields: [
      { key: 'fullName', label: 'Nom complet', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'text', required: true },
      { key: 'password', label: 'Mot de passe (laisser vide pour ne pas changer)', type: 'password' },
      { key: 'role', label: 'Rôle', type: 'select', options: ['ADMINISTRATEUR_PRINCIPAL', 'GESTION_DOSSIERS', 'COMMUNITY_MANAGER'] },
      { key: 'active', label: 'Compte actif', type: 'checkbox' },
    ],
  },
};
