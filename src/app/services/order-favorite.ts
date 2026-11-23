import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderFavorite {
  private orderUrl = 'http://localhost:3000/api/orders';
  private favUrl = 'http://localhost:3000/api/favorites';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // إنشاء طلبية جديدة (Commande)
  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.orderUrl, orderData, this.getHeaders());
  }

  // جلب طلبيات المستخدم
  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderUrl}/my-orders`, this.getHeaders());
  }

  // إضافة أو إزالة من المفضلة (Favorites)
  toggleFavorite(productId: number): Observable<any> {
    return this.http.post(`${this.favUrl}/toggle`, { productId }, this.getHeaders());
  }

  // جلب قائمة المفضلة للمستخدم
  getMyFavorites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.favUrl}/my-favorites`, this.getHeaders());
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderUrl}/all`, this.getHeaders());
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.orderUrl}/${id}/status`, { status }, this.getHeaders());
  }

  getAllFavorites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.favUrl}/all`, this.getHeaders());
  }
    deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.orderUrl}/${orderId}`, this.getHeaders());
  }

}