import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../config/localstorage.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { CommonAccessModule, UserAccessModule, OrganizationAccessModule, PackagesAccessModule, SettingsAccessModule } from '../../../shared/models/user-access/user-access.model';

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

  public _CommonAccessModule = new CommonAccessModule();
  public _UserAccessModule = new UserAccessModule();
  public _OrganizationAccessModule = new OrganizationAccessModule();
  public _PackagesAccessModule = new PackagesAccessModule();
  public _SettingsAccessModule = new SettingsAccessModule();

  constructor(private router: Router,
    private _appSettings: AppsettingsService,
    private _localstorageService: LocalstorageService
  ) {
    this.megaOpen = false;
  }

  ngOnInit(): void {
    this.name = this._localstorageService.localstorageGet("fullname");
    this.profilepicture = this._appSettings.defaultpicturePath;

    this._localstorageService.localstorageSet("CommonAccess", JSON.stringify(this._CommonAccessModule));
    this._localstorageService.localstorageSet("UserAccess", JSON.stringify(this._UserAccessModule));
    this._localstorageService.localstorageSet("OrganizationAccess", JSON.stringify(this._OrganizationAccessModule));
    this._localstorageService.localstorageSet("PackagesAccess", JSON.stringify(this._PackagesAccessModule));
    this._localstorageService.localstorageSet("SettingsAccess", JSON.stringify(this._SettingsAccessModule));
  }

  toggleNavbarMenu() {
    this.isNavbarMenuCollapsed = !this.isNavbarMenuCollapsed
  }
  logout(){
    window.localStorage.clear();
    this.router.navigateByUrl('/index');
  }
}
