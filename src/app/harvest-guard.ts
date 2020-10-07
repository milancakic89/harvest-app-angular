
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Service } from './app.service';

@Injectable()
export class HarvestGuard implements CanActivate {
  constructor(private service: Service, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const isAdmin = this.service.isAdmin();
    if (isAdmin) {
      return true;
    } else {
      return this.router.navigate(['/'])
    }
  }
}