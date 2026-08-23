import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {
  Destination, ServiceItem, Offer, Testimonial, Photo, Video,
  Article, Faq, Appointment, ClientRequest, Client, ContactMessage, AdminUserModel
} from '../models/models';

/**
 * Un service par ressource admin, chacun branche sur son endpoint REST.
 * Toute la logique CRUD vit dans ApiService (voir api.service.ts) ;
 * ces classes ne font que fixer le chemin et le type.
 */
@Injectable({ providedIn: 'root' })
export class DestinationService extends ApiService<Destination> { constructor() { super('admin/destinations'); } }

@Injectable({ providedIn: 'root' })
export class ServiceItemService extends ApiService<ServiceItem> { constructor() { super('admin/services'); } }

@Injectable({ providedIn: 'root' })
export class OfferService extends ApiService<Offer> { constructor() { super('admin/offers'); } }

@Injectable({ providedIn: 'root' })
export class TestimonialService extends ApiService<Testimonial> { constructor() { super('admin/testimonials'); } }

@Injectable({ providedIn: 'root' })
export class PhotoService extends ApiService<Photo> { constructor() { super('admin/photos'); } }

@Injectable({ providedIn: 'root' })
export class VideoService extends ApiService<Video> { constructor() { super('admin/videos'); } }

@Injectable({ providedIn: 'root' })
export class ArticleService extends ApiService<Article> { constructor() { super('admin/articles'); } }

@Injectable({ providedIn: 'root' })
export class FaqService extends ApiService<Faq> { constructor() { super('admin/faqs'); } }

@Injectable({ providedIn: 'root' })
export class AppointmentService extends ApiService<Appointment> { constructor() { super('admin/appointments'); } }

@Injectable({ providedIn: 'root' })
export class ClientRequestService extends ApiService<ClientRequest> { constructor() { super('admin/requests'); } }

@Injectable({ providedIn: 'root' })
export class ClientService extends ApiService<Client> { constructor() { super('admin/clients'); } }

@Injectable({ providedIn: 'root' })
export class ContactMessageService extends ApiService<ContactMessage> { constructor() { super('admin/messages'); } }

@Injectable({ providedIn: 'root' })
export class AdminUserService extends ApiService<AdminUserModel> { constructor() { super('admin/users'); } }
