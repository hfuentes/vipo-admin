import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setSession(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('profile', JSON.stringify(data.profile));
  }

  public getLocalProfile(): any {
    return JSON.parse(localStorage.getItem('profile') || '{}');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
  }

  public isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
