import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setSession(data: any) {
    localStorage.setItem('token', data.token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  public isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
