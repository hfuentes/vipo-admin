import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  api(name: string, id?: string) {
    const base = `${environment.apiUrl}/api/${name}`;
    return id ? `${base}/${id}` : base;
  }

  getNoticia(id: string) {
    return this.http.get(this.api('noticias', id)).toPromise();
  }

  getNoticias() {
    return this.http.get(this.api('noticias')).toPromise();
  }

  deleteNoticia(id: string) {
    return this.http.delete(this.api('noticias', id)).toPromise();
  }

  createNoticia(data: any) {
    return this.http.post(this.api('noticias'), data).toPromise();
  }

  updateNoticia(id: string, data: any) {
    return this.http.put(this.api('noticias', id), data).toPromise();
  }
}
