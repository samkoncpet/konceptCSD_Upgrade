import { Component, OnInit } from '@angular/core';;
import { LocalstorageService } from '../../../../config/localstorage.service';
import { AppsettingsService } from '../../../../config/appsettings.service';

@Component({
  selector: 'app-profile-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: []
})
export class LeftSideComponent implements OnInit {

  public name = [];
  public profilepicture: string;

  constructor(
    private _appSettings: AppsettingsService,
    private _localstorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.name = this._localstorageService.localstorageGet("fullname");
    this.profilepicture = this._appSettings.defaultpicturePath;
  }

}
