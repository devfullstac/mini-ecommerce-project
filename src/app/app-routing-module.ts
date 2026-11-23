import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ProductList } from './components/product-list/product-list';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { ProductDetails } from './components/product-details/product-details';
import { UserDashboard } from './components/user-dashboard/user-dashboard';
import { CartPage } from './components/cart/cart'; // <--- استدعاء صفحة السلة
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'products', component: ProductList },
  { path: 'product/:id', component: ProductDetails },
  { path: 'user-space', component: UserDashboard },
  { path: 'cart', component: CartPage }, // <--- مسار السلة
  { 
    path: 'admin', 
    component: AdminDashboard, 
    canActivate: [authGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

