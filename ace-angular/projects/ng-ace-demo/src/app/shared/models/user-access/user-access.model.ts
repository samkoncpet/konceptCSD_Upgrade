export class AccessModule { 
  User_Group_Access_Area_ID: number;
  User_Group_Access_Area: string;
  Is_Create: boolean = true;
  Is_Update: boolean = true;
  Is_Retrieve: boolean = true;
  Is_Delete: boolean = true;
}


export class CommonAccessModule { 
  Is_Create: boolean = true;
  Is_Update: boolean = true;
  Is_Retrieve: boolean = true;
  Is_Delete: boolean = true;
}

export class UserAccessModule { 
  Is_Create: boolean = true;
  Is_Update: boolean = true;
  Is_Retrieve: boolean = true;
  Is_Delete: boolean = true;
}

export class OrganizationAccessModule { 
  Is_Create: boolean = true;
  Is_Update: boolean = true;
  Is_Retrieve: boolean = true;
  Is_Delete: boolean = true;
}

export class CustomersAccessModule { 
  Is_Create: boolean = true;
  Is_Update: boolean = true;
  Is_Retrieve: boolean = true;
  Is_Delete: boolean = true;
}

export class PackagesAccessModule { 
  Is_Create: boolean = true;
  Is_Update: boolean = true;
  Is_Retrieve: boolean = true;
  Is_Delete: boolean = true;
}

export class SettingsAccessModule { 
  Is_Create: boolean = true;
  Is_Update: boolean = true;
  Is_Retrieve: boolean = true;
  Is_Delete: boolean = true;
}
