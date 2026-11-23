import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../services/product';
import { OrderFavorite } from '../../services/order-favorite';
import { Auth } from '../../services/auth';
import { Cart } from '../../services/cart'; // <--- 1. استيراد خدمة السلة هنا

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  product: any = null;
  orderData = { quantity: 1, address: '', phone: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: Product,
    private orderFavService: OrderFavorite,
    public authService: Auth,
    public cartService: Cart, // <--- 2. حقن خدمة السلة داخل أقواس الـ constructor
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product = data;
          this.cdr.detectChanges();
        },
        error: () => this.router.navigate(['/products'])
      });
    }
  }

  // إضافة للسلة من صفحة التفاصيل
  addToCartFromDetails() {
    this.cartService.addToCart(this.product, this.orderData.quantity);
    alert(`✅ Added ${this.orderData.quantity}x "${this.product.name}" to your cart!`);
  }

  // إضافة أو إزالة من المفضلة
  addToFavorites() {
    if (!this.authService.isLoggedIn()) {
      alert('Please login first to save favorites!');
      this.router.navigate(['/login']);
      return;
    }

    this.orderFavService.toggleFavorite(this.product.id).subscribe({
      next: (res) => alert(res.message),
      error: () => alert('Error updating favorites')
    });
  }

  // إرسال طلبية مباشرة (Commande)
  placeOrder() {
    if (!this.authService.isLoggedIn()) {
      alert('Please login first to place an order!');
      this.router.navigate(['/login']);
      return;
    }

    if (!this.orderData.address.trim() || !this.orderData.phone.trim()) {
      alert('Please fill in your delivery address and phone number.');
      return;
    }

    const payload = {
      productId: this.product.id,
      quantity: this.orderData.quantity,
      address: this.orderData.address,
      phone: this.orderData.phone
    };

    this.orderFavService.createOrder(payload).subscribe({
      next: () => {
        alert('✅ Order placed successfully!');
        this.router.navigate(['/user-space']);
      },
      error: () => alert('Error placing order')
    });
  }
}
