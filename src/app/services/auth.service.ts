import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = false;
  userSub = new BehaviorSubject<User | null>(null); // Explicitly allow null
  clearTimeout: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClKACMkWfEscGdKUzZ8bRbvaAmPfc_zdk`,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClKACMkWfEscGdKUzZ8bRbvaAmPfc_zdk`,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  private handleUser(response: AuthResponseData) {
    console.log('Full Response:', response);
    const expireDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );
    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expireDate
    );

    console.log('User Object:', user); 
    console.log('Storing in localStorage');

    this.userSub.next(user);
    localStorage.setItem('userData', JSON.stringify(user));

    const storedUser = localStorage.getItem('userData');
    console.log('Stored User:', storedUser);

    this.isLoggedIn = true; // Add this line

    this.autoLogout(+response.expiresIn * 1000);
  }

  getErrorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Error Occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email Already Exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password';
        break;
    }
    return throwError(errorMessage);
  }

  autoLogin() {
    const userDataString = localStorage.getItem('userData');
  
    // Check if userData is null or not in localStorage
    if (!userDataString) {
      return;
    }
  
    try {
      // Parse the stored user data
      const userData = JSON.parse(userDataString);
  
      // Use the static fromJSON method to recreate the User instance
      const loadedUser = User.fromJSON(userData);
  
      // If the token is still valid, continue with the login process
      if (loadedUser.token) {
        this.userSub.next(loadedUser);  // Emit the user data
        this.isLoggedIn = true;  // Set isLoggedIn to true
  
        // Calculate remaining time for auto logout
        const expirationTime = new Date(userData._tokenExpirationDate).getTime();
        const currentTime = new Date().getTime();
        const expirationDuration = expirationTime - currentTime;
  
        this.autoLogout(expirationDuration);
      } else {
        // If token is expired, clear the data and logout
        this.logout();
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      this.logout();
    }
  }

  autoLogout(expirationDate: number) {
    console.log(expirationDate);
    this.clearTimeout = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  logout() {
    this.userSub.next(null);
    this.isLoggedIn = false;
    this.router.navigate(['/landing']);
    localStorage.removeItem('userData');
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
    }
  }

  isAuthenticated() {
    return new Promise((resolve) => {
      // Check if there's a current user
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        // Check if the token is still valid
        const expirationDate = new Date(user.expirationDate);
        resolve(expirationDate > new Date());
      } else {
        resolve(false);
      }
    });
  }
}