import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getNoticias() {
    return this.http.get('https://vipo-usach-serve.herokuapp.com/api/noticias').toPromise();
  }
}
