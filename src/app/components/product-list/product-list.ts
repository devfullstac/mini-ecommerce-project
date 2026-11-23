import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../services/product';
import { Cart } from '../../services/cart';
import { Auth } from '../../services/auth'; // <--- استدعاء خدمة المصادقة

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  products: any[] = [];
  searchTerm: string = '';

  constructor(
    private productService: Product,
    public cartService: Cart,
    public authService: Auth, // <--- حقنها هنا كـ public ليقرأها ملف HTML
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading products', err)
    });
  }

  addToBasket(product: any) {
    this.cartService.addToCart(product, 1);
    alert(`✅ "${product.name}" added to your cart!`);
  }

  get filteredProducts() {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
