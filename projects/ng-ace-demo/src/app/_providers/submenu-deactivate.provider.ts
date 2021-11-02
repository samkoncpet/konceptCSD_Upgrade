import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class SubmenuDeactivate implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if(this.router.url == '/') {
      // This means that we have directly entered an address like "http://www.app.com/elements" in browser's address bar
      // However this  route(e.g. "/elements") is a route that should not be activated and is only used to toggle submenu
      // So we redirect to "dashboard"
      this.router.navigate(['/dashboard'])
    }
    return false;
  }

}