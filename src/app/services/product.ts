import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Product {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  // prepare Token to send with requests edit , delete 
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // 1. Read:
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

    getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 2. Create:
  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product, this.getHeaders());
  }

  // 3. Update: 
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product, this.getHeaders());
  }

  // 4. Delete:delete part of product (Admin)
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}

