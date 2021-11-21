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

  getNoticias() {
    return this.http.get(this.api('noticias')).toPromise();
  }

  deleteNoticia(id: string) {
    return this.http.delete(this.api('noticias', id)).toPromise();
  }
}
