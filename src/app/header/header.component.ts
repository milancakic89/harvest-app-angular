import { Component, OnChanges, OnInit } from '@angular/core';
import { Service } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  menuOpened = false;
  isLogged = false;
  user = '';
  constructor(private service: Service) { }

  ngOnChanges() {
    this.service.checkToken();
    this.isLogged = !!localStorage.getItem('loggedIn');
    if (!this.isLogged) {
      this.logout();
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
    this.service.logout();
  }
}
