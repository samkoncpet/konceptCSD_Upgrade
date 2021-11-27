import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../config/localstorage.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { UserAccessModule } from '../../../shared/models/user-access/user-access.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {

  megaOpen!: boolean;
  isNavbarMenuCollapsed = true
  public name = [];
  public profilepicture: string;
  public _UserAccessModule = new UserAccessModule();

  constructor(private router: Router,
    private _appSettings: AppsettingsService,
    private _localstorageService: LocalstorageService
  ) {
    this.megaOpen = false;
  }

  ngOnInit(): void {
    this.name = this._localstorageService.localstorageGet("fullname");
    this.profilepicture = this._appSettings.defaultpicturePath;

    this._localstorageService.localstorageSet("UserAccess", JSON.stringify(this._UserAccessModule));
  }

  toggleNavbarMenu() {
    this.isNavbarMenuCollapsed = !this.isNavbarMenuCollapsed
  }
  logout(){
    window.localStorage.clear();
    this.router.navigateByUrl('/index');
  }
}
