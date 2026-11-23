import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: Auth, private router: Router) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
         
        if (res.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/products']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message 
      }
    });
  }
  //function login Google / Facebook
  socialLogin(provider: string) {
    localStorage.setItem('token', 'social-demo-token-' + provider);
    localStorage.setItem('role', 'user');
    localStorage.setItem('username', provider + ' User');
    this.router.navigate(['/products']);
  }
}


