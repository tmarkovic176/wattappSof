// import { NgToastService } from 'ng-angular-popup';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css'],
})
export class NavBarComponent implements OnInit {
  value: string = '';
  url: string = '';
  letValue: string = '';
  constructor(private router: Router, private cookie: CookieService) {}

  ngOnInit(): void {
    this.value = this.cookie.get('role');
    this.url = window.location.pathname;
    this.ChangeActive();
    this.letValue = this.cookie.get('role');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        this.ChangeActive();
      }
    });
  }

  ChangeActive() {
    if (this.url === '/DsoApp/users') {
      document.getElementById('navbarDropdownUsers')?.classList.add('active');
      document.getElementById('home')?.classList.remove('active');
      document
        .getElementById('navbarDropdownEmployees')
        ?.classList.remove('active');
    } else if (this.url === '/DsoApp/home') {
      document
        .getElementById('navbarDropdownUsers')
        ?.classList.remove('active');
      document.getElementById('home')?.classList.add('active');
      document
        .getElementById('navbarDropdownEmployees')
        ?.classList.remove('active');
    } else if (this.url === '/DsoApp/employees') {
      document
        .getElementById('navbarDropdownUsers')
        ?.classList.remove('active');
      document.getElementById('home')?.classList.remove('active');
      document
        .getElementById('navbarDropdownEmployees')
        ?.classList.add('active');
    }
  }

  LogOut() {
    this.cookie.delete('token', '/');
    this.cookie.delete('refresh', '/');
    this.cookie.delete('id', '/');
    this.cookie.delete('role', '/');
    this.cookie.delete('username', '/');
    this.cookie.delete('lat', '/');
    this.cookie.delete('long', '/');
    this.cookie.delete('acc', '/');
    this.cookie.delete('country', '/');
    this.cookie.deleteAll();
    this.router.navigate(['login']);
  }
}
