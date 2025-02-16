import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  registerForm: FormGroup;
  authMode: 'login' | 'register' = 'login'; // Toggle between Login & Register

  constructor(private fb: FormBuilder, private router: Router) {
    // Login Form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Register Form
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Handle Login
  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email } = this.loginForm.value;
    const userRole = email === 'admin@example.com' ? 'admin' : 'user';

    // Navigate based on role
    this.router.navigate([userRole === 'admin' ? '/admin/category' : '/home']);
  }

  // Handle Registration
  onRegisterSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Mock API call (replace with real API)
    console.log('User Registered:', this.registerForm.value);

    // After successful registration, switch to login form
    this.authMode = 'login';
  }
}
