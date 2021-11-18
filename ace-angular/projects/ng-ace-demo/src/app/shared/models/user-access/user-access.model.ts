export class UserAccessModule { 
    Create: boolean;
    Retrieve: boolean;
    Update: boolean;
    Delete: boolean;

    // Not strictly necessary, but nice to have in most use cases
  constructor(model: UserAccessModule) {
    this.Create = model && model.Create;
    this.Retrieve = model && model.Retrieve;
    this.Update = model && model.Update;
    this.Delete = model && model.Delete;
  }
}
