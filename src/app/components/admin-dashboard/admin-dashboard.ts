import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../services/product';
import { OrderFavorite } from '../../services/order-favorite';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  products: any[] = [];
  allOrders: any[] = [];
  allFavorites: any[] = [];
  
  currentProduct: any = { id: null, name: '', price: 0, description: '', image: '' };
  isEditing = false;

  constructor(
    private productService: Product,
    private orderFavService: OrderFavorite,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // جلب المنتجات + الطلبات + المفضلة في نفس الوقت
  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading products:', err)
    });

    this.orderFavService.getAllOrders().subscribe({
      next: (data) => {
        this.allOrders = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading orders:', err)
    });

    this.orderFavService.getAllFavorites().subscribe({
      next: (data) => {
        this.allFavorites = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading favorites:', err)
    });
  }

  // إضافة أو تعديل منتج
  saveProduct() {
    if (!this.currentProduct.name || !this.currentProduct.name.trim()) {
      alert('Please enter a product name!');
      return;
    }

    if (this.isEditing && this.currentProduct.id) {
      this.productService.updateProduct(this.currentProduct.id, this.currentProduct).subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => alert('Update error: ' + (err.error?.message || err.message))
      });
    } else {
      this.productService.addProduct(this.currentProduct).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => alert('Add error: ' + (err.error?.message || err.message))
      });
    }
  }

  editProduct(product: any) {
    this.currentProduct = { ...product };
    this.isEditing = true;
    this.cdr.detectChanges();
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => alert('Delete error: ' + (err.error?.message || err.message))
      });
    }
  }

  // تغيير حالة الطلبية إلى تم التوصيل
  markDelivered(id: number) {
    this.orderFavService.updateOrderStatus(id, 'Delivered').subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => console.error('Error updating order status:', err)
    });
  }

  resetForm() {
    this.currentProduct = { id: null, name: '', price: 0, description: '', image: '' };
    this.isEditing = false;
    this.cdr.detectChanges();
  }
}
