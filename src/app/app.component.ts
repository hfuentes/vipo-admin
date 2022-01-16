import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'vipo-usach-admin';
  isLogin = true;
  isAdmin = false;

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLogin = event.url.indexOf('login') > -1;
        this.isAdmin = this.authService.getLocalProfile().esAdmin ? true : false;
      }
    });
  }

  salir() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
