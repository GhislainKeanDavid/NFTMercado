// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent {
//   constructor(private router: Router) {}

//   navigateToSignup(): void {
//     this.router.navigate(['/signup']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  private userSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userSub = this.authService.userSub.subscribe(user => {
      this.isLoggedIn = !!user; // Convert the user object to a boolean
    });
  }

  onLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout(); // Your existing logout logic
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success"
        });
        this.router.navigate(['/']); // Adjust the route as needed
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}

