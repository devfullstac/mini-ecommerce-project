import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../services/cart';
import { OrderFavorite } from '../../services/order-favorite';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartPage {
  address = '';
  phone = '';

  constructor(
    public cartService: Cart,
    private orderFavService: OrderFavorite,
    public authService: Auth,
    private router: Router
  ) {}

  checkout() {
    if (!this.authService.isLoggedIn()) {
      alert('Please login first to complete your order!');
      this.router.navigate(['/login']);
      return;
    }
    if (!this.address.trim() || !this.phone.trim()) {
      alert('Please enter your delivery address and phone number.');
      return;
    }

    const items = this.cartService.getItems();
    items.forEach(item => {
      this.orderFavService.createOrder({
        productId: item.product.id,
        quantity: item.quantity,
        address: this.address,
        phone: this.phone
      }).subscribe();
    });

    alert('✅ All cart items ordered successfully!');
    this.cartService.clearCart();
    this.router.navigate(['/user-space']);
  }
}

