import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private items: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

  addToCart(product: any, quantity: number = 1) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.saveCart();
  }

  updateQuantity(productId: number, change: number) {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.saveCart();
      }
    }
  }

  getItems() {
    return this.items;
  }

  getCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  removeItem(productId: number) {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('cart');
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}

