import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/app.service';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {

  menuOpened = false;
  isLogged = false;
  user = '';
  constructor(private service: Service) { }

  ngOnChanges() {
    this.service.checkToken();
    this.isLogged = !!localStorage.getItem('loggedIn');
    if (!this.isLogged) {
      this.service.logout();
    }
  }
  ngOnInit(): void {
    this.user = this.service.getUserName();
    this.isLogged = !!localStorage.getItem('loggedIn');

  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  logout() {
    this.isLogged = false;
    this.service.logout();
  }
}
