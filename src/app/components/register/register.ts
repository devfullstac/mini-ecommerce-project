import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  user = { username: '', email: '', password: '' };
  errorMessage = '';

  constructor(private authService: Auth, private router: Router) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: () => {
         alert('Account created successfully! You can now login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }
}
