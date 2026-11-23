import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ProductList } from './components/product-list/product-list';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { ProductDetails } from './components/product-details/product-details';
import { UserDashboard } from './components/user-dashboard/user-dashboard';
import { CartPage } from './components/cart/cart'; 

@NgModule({
  declarations: [
    App,
    Navbar,
    Login,
    Register,
    ProductList,
    AdminDashboard,
    ProductDetails,
    UserDashboard,
    CartPage,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
