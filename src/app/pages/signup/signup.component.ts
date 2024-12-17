import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  error: string | null = null; // Use union type to allow null

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      // Explicitly extract email and password
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      this.isLoading = true;
      this.error = null;

      this.authService.signUp(email, password)
        .subscribe({
          next: () => {
            this.isLoading = false;
            alert('Signup successful! Please log in.');
            this.router.navigate(['/login']);
          },
          error: (errorMessage) => {
            this.isLoading = false;
            this.error = errorMessage;
            alert(errorMessage);
          }
        });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}