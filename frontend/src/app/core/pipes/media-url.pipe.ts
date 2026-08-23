import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Les photos/videos uploadees depuis l'admin sont enregistrees sur le
 * BACKEND (ex: http://localhost:8080) et l'API renvoie une URL relative
 * (/uploads/photos/xxx.jpg). Le frontend Angular tourne sur un port different
 * (ex: http://localhost:4200) : sans ce pipe, le navigateur chercherait
 * l'image sur le frontend au lieu du backend. Usage : [src]="photo.url | mediaUrl"
 */
@Pipe({
  name: 'mediaUrl',
  standalone: true
})
export class MediaUrlPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    const backendOrigin = environment.apiUrl.replace(/\/api\/?$/, '');
    return backendOrigin + value;
  }
}
