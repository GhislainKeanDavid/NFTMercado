export class User {
    constructor(
      public email: string,
      public id: string,
      private _token: string,
      private _tokenExpirationDate: Date
    ) {}
  
    // Get the token of the user if it has not expired
    get token(): string | null {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
      }
      return this._token;
    }

    toJSON() {
      return {
        email: this.email,
        id: this.id,
        _token: this._token,
        _tokenExpirationDate: this._tokenExpirationDate.toISOString()
      };
    }

    static fromJSON(json: any): User {
      return new User(
        json.email,
        json.id,
        json._token,
        new Date(json._tokenExpirationDate)
      );
    }

    // Get the expiration date of the token
    get tokenExpirationDate(): Date {
      return this._tokenExpirationDate;
    }
  
    // Helper method to check if the user is authenticated
    get isAuthenticated(): boolean {
      return !!this.token;
    }
  }
  