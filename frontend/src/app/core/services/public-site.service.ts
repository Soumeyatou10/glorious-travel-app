import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Destination, ServiceItem, Testimonial, Photo, Video, Faq, SiteSettings } from '../models/models';

/**
 * Regroupe tous les appels en lecture seule consommes par le site public
 * (/api/public/**). Utilise par les composants de public-site/.
 */
@Injectable({ providedIn: 'root' })
export class PublicSiteService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/public';

  getDestinations() { return this.http.get<Destination[]>(`${this.baseUrl}/destinations`); }
  getServices() { return this.http.get<ServiceItem[]>(`${this.baseUrl}/services`); }
  getTestimonials() { return this.http.get<Testimonial[]>(`${this.baseUrl}/testimonials`); }
  getPhotos() { return this.http.get<Photo[]>(`${this.baseUrl}/photos`); }
  getVideos() { return this.http.get<Video[]>(`${this.baseUrl}/videos`); }
  getFaqs() { return this.http.get<Faq[]>(`${this.baseUrl}/faqs`); }
  getSettings() { return this.http.get<SiteSettings>(`${this.baseUrl}/settings`); }

  submitRequest(payload: { fullName: string; phone: string; destination: string; projectType: string; message: string; }) {
    return this.http.post(`${this.baseUrl}/requests`, payload);
  }
}
