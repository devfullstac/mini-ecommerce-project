import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Cart } from '../../services/cart'; // <--- استدعاء خدمة السلة

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  // حقن الخدمة هنا ليتمكن ملف navbar.html من قراءة عدد المنتجات
  constructor(
    public authService: Auth,
    public cartService: Cart,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

