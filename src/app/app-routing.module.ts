import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProductsComponent} from "./components/products/products.component";
import {HomeComponent} from "./components/home/home.component";
import {ProductAddComponent} from "./components/product-add/product-add.component";
import {ProductEditComponent} from "./components/product-edit/product-edit.component";

const routes: Routes = [
  {path:"product", component:ProductsComponent},
  {path:"addproduct", component:ProductAddComponent},
  {path:"editproduct/:id", component:ProductEditComponent},
  {path:"", component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
