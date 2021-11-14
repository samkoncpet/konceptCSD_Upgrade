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

   // Package API
   insertPackageAPI: string = "api/package/insertpackage";
   updatePackageAPI: string = "api/package/update-package";

   // User Type API
   insertUserTypeAPI: string = "api/user/insert-user-type";
   getUserTypeAPI: string = "api/user/fetch-user";

    // User API
    insertUpdateUserAPI: string = "api/user/insertupdateuser";

    fetchUserAPI: string = "api/user/fetchuser";
}
