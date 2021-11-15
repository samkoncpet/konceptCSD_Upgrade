import { Component, OnInit } from '@angular/core';;
import { LocalstorageService } from '../../../../config/localstorage.service';
import { AppsettingsService } from '../../../../config/appsettings.service';
import { ShareDataServiceService } from "../../../../config/share-data-service.service";    

@Component({
  selector: 'app-profile-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: []
})
export class LeftSideComponent implements OnInit {

  public name!: string;
  public profilepicture: string;
  public data: [];

  constructor(
    private _appSettings: AppsettingsService,
    private _localstorageService: LocalstorageService,
    public shareDataService: ShareDataServiceService) { }

  ngOnInit(): void {
    // this.shareDataService.share.subscribe((x) =>{  
    //   this.name = x
    // });
    this.data = JSON.parse(this._localstorageService.localstorageGet("data"));
    this.name = this.data["FullName"];
    this.profilepicture = this._appSettings.defaultpicturePath;
  }

}
