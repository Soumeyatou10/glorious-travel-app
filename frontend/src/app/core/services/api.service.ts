import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Service HTTP generique CRUD, reutilise par toutes les ressources admin
 * (destinations, services, offres, temoignages, faqs, rendez-vous, etc.)
 * ainsi que par les lectures publiques.
 *
 * IMPORTANT : cette classe de base n'est PAS decoree avec @Injectable.
 * Elle n'est jamais injectee directement - seules ses sous-classes
 * (DestinationService, ServiceItemService, ...) le sont. Le decorateur
 * @Injectable sur la classe de base ferait planter la compilation Angular,
 * car "resourcePath: string" ne peut pas etre resolu comme un token
 * d'injection.
 */
export class ApiService<T extends { id?: number }> {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  constructor(private resourcePath: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.resourcePath}`);
  }

  getOne(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.resourcePath}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.resourcePath}`, item);
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${this.resourcePath}/${id}`, item);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.resourcePath}/${id}`);
  }
}
