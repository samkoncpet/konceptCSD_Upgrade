import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../config/localstorage.service';
import { AppsettingsService } from '../../../config/appsettings.service';
import { AccessModule, CommonAccessModule, UserAccessModule, OrganizationAccessModule, PackagesAccessModule, SettingsAccessModule } from '../../../shared/models/user-access/user-access.model';
import { ConfigurationService } from '../../../config/configuration.service';

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

  public _accessModule : Array<AccessModule>[];
  public _accessList = [];

  public _CommonAccessModule = new CommonAccessModule();
  public _UserAccessModule = new UserAccessModule();
  public _OrganizationAccessModule = new OrganizationAccessModule();
  public _PackagesAccessModule = new PackagesAccessModule();
  public _SettingsAccessModule = new SettingsAccessModule();

  constructor(private router: Router,
    private _appSettings: AppsettingsService,
    private _localstorageService: LocalstorageService,
    private _configurationService: ConfigurationService) {
    this.megaOpen = false;
  }

  ngOnInit(): void {
    this.name = this._localstorageService.localstorageGet("fullname");
    this.profilepicture = this._appSettings.defaultpicturePath;
    this.getGroupDetailList();
    this._localstorageService.localstorageSet("CommonAccess", JSON.stringify(this._CommonAccessModule));
    this._localstorageService.localstorageSet("UserAccess", JSON.stringify(this._UserAccessModule));
    this._localstorageService.localstorageSet("OrganizationAccess", JSON.stringify(this._OrganizationAccessModule));
    this._localstorageService.localstorageSet("PackagesAccess", JSON.stringify(this._PackagesAccessModule));
    this._localstorageService.localstorageSet("SettingsAccess", JSON.stringify(this._SettingsAccessModule));
  }
  getGroupDetailList(){
    var url = this._appSettings.koncentAPI;
    var fetchusergroupmapping = this._appSettings.fetchusergroupmapping;
    url = url + fetchusergroupmapping;

    var data = {
      User_Group_ID: 7,
      Search: '',
      User_Group_Name: '',
      Is_Predefined: null,
      Is_Active: null
    }
    this._configurationService.post(url, data)
        .subscribe(response => {
          if (response["response"] == 1) {
            this._accessList = [];
            this._accessList = response["data"];  
            this._accessList.forEach((item :AccessModule) => {
              this._localstorageService.localstorageSet("Access" + item.User_Group_Access_Area, JSON.parse(JSON.stringify(item)));
            });
          }
        },
        err => {
        });
   }
  toggleNavbarMenu() {
    this.isNavbarMenuCollapsed = !this.isNavbarMenuCollapsed
  }
  logout(){
    window.localStorage.clear();
    this.router.navigateByUrl('/index');
  }
}
