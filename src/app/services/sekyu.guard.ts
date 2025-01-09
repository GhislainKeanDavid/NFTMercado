import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2'; // Import SweetAlert

@Injectable({
  providedIn: 'root'
})
export class SekyuGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn) {
      return true; // Allow access if user is logged in
    } else {
      // Trigger SweetAlert if user is not logged in
      Swal.fire({
        title: 'Please log in first',
        text: "You need to log in before accessing this page.",
        icon: 'warning',
        confirmButtonText: 'Go to Login',
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page if the user clicks 'Go to Login'
          this.router.navigate(['/login']);
        }
      });

      return false; // Block access to the route
    }
  }
  
}
