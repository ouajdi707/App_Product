import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../sevices/products.service";
import {Product} from "../../model/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products$: Observable<AppDataState<Product[]>>|null=null;
readonly DataStateEnum=DataStateEnum;
  constructor(private productService:ProductsService ,private  router:Router ) { }

  ngOnInit(): void {
  }

  OnGetAllProducts() {
    this.products$=
      this.productService.getAllProducts().pipe(
        map(data=>({dataState:DataStateEnum.LOADED,data:data}),
        startWith({dataState:DataStateEnum.LODING})),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );


  }


  OnGetSelectedProduct() {this.products$=
    this.productService.getSelectedProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data}),
        startWith({dataState:DataStateEnum.LODING})),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );

  }

  OnGetAvailableProduct() {this.products$=
    this.productService.getAvailableProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data}),
        startWith({dataState:DataStateEnum.LODING})),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );


  }

  Onsearch(dataForm: any) {this.products$=
    this.productService.SearchProducts(dataForm.keyword).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data}),
        startWith({dataState:DataStateEnum.LODING})),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  Onselect(p: Product) {
    this.productService.SelectProduct(p)
      .subscribe(data=> {
        p.selected = data.selected;


      })

  }

  OnDeleteproduct(p: Product) {
    let v=confirm("theb tfaaasakh?");
    if (v==true)
    this.productService.DeleteProduct(p)
      .subscribe((data=>{
        this.OnGetAllProducts();

        }
      ))

  }

  OnNewProduct() {
    this.router.navigateByUrl("/addproduct")


  }

  OnEditproduct(p:Product) {
    this.router.navigateByUrl("/editproduct/"+p.id);

  }
}
