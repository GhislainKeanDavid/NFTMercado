import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;
  isLoading = false; // Add loading state

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router // Inject Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (!this.loginForm.valid) return;
  
    const { email, password } = this.loginForm.value;
    
    this.isLoading = true;
    this.error = null;
  
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Full login response:', response); // Log entire response
        this.isLoading = false;
        this.router.navigate(['/marketplace']); 
      },
      error: (error) => {
        console.error('Detailed login error:', error);
        this.isLoading = false;
        this.error = error;
        alert(error);
      },
    });
  }
}