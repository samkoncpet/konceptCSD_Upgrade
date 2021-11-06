import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {

  megaOpen!: boolean;
  isNavbarMenuCollapsed = true

  constructor(private router: Router
  ) {
    this.megaOpen = false
  }


  ngOnInit(): void {
  }

  toggleNavbarMenu() {
    this.isNavbarMenuCollapsed = !this.isNavbarMenuCollapsed
  }
  logout(){
    window.localStorage.clear();
    this.router.navigateByUrl('/index');
  }
}
