import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:3000/api/auth'; // url server Node.js

  constructor(private http: HttpClient) {}


  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('username', response.username);
        }
      })
    );
  }

 
  logout() {
    localStorage.clear();
  }

  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  
  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }
}

