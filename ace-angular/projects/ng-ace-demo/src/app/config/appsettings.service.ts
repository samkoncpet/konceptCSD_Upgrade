import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppsettingsService {

  constructor() { }
  // Koncent Host URL's
  koncentAPI: string = environment.koncentAPI;
  
    // Signin API
    signinAPI: string = "api/authentication/signin";

    // Entity Master API
    entityMasterAPI: string = "api/entitymaster/fetchentitymaster";
    getNavigationMenuAPI: string = "api/entitymaster/fetchNavigationMenu";

    // Package API
    insertUpdatetPackageAPI: string = "api/package/insertupdatepackage";
    fetchpackage: string = "api/package/fetchpackage";
    deletePackageAPI: string = "api/package/deletepackage";

    // User Type API
    insertUserTypeAPI: string = "api/user/insert-user-type";
    getUserTypeAPI: string = "api/user/fetch-user";

    // User API
    insertUpdateUserAPI: string = "api/user/insertupdateuser";  
    fetchUserAPI: string = "api/user/fetchuser";
    deleteUserAPI: string = "api/user/deleteuser";

    // User Group API
    insertUpdateusergroup: string = "api/user/insertupdateusergroup";
    fetchusergroup: string = "api/user/fetchusergroup";
    fetchusergroupmapping: string = "api/user/fetchusergroupmapping";
    deleteUserGroupAPI: string = "api/user/Deleteusergroup";

    // Customer API
    insertcustomerAPI: string = "api/customer/insertcustomer";
    fetchcustomerAPI: string = "api/customer/fetchcustomer";
    fetchsubscriptionAPI: string = "api/customer/fetchsubscription";
    fetchcustomerchildAPI: string = "api/customer/fetchcustomerchild";
    updatecustomersubscriptionAPI: string = "api/customer/updatecustomersubscription";
    updatecustomerchildAPI: string = "api/customer/updatecustomerchild";
  
    defaultpicturePath: string = "assets/image/avatar/profile-pic.jpg";
}
