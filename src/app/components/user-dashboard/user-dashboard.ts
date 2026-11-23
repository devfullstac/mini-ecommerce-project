import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderFavorite } from '../../services/order-favorite';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard implements OnInit {
  orders: any[] = [];
  favorites: any[] = [];
  username: string = '';

  constructor(private orderFavService: OrderFavorite, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Customer';
    this.loadUserData();
  }

  loadUserData() {
    this.orderFavService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.cdr.detectChanges();
      }
    });

    this.orderFavService.getMyFavorites().subscribe({
      next: (data) => {
        this.favorites = data;
        this.cdr.detectChanges();
      }
    });
  }

  removeFavorite(productId: number) {
    this.orderFavService.toggleFavorite(productId).subscribe(() => {
      this.loadUserData();
    });
  }
    cancelOrder(orderId: number) {
    if (confirm('Are you sure you want to cancel and delete this order?')) {
      this.orderFavService.deleteOrder(orderId).subscribe({
        next: () => {
          alert('Order deleted successfully.');
          this.loadUserData();
        },
        error: () => alert('Error deleting order')
      });
    }
  }

}
