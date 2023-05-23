import { Component, OnInit } from '@angular/core';
import { Product } from '../../interface/product';
import { ProductsService } from './../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  // Get All Products
  getProducts(): void { 
    this.loading = true;
    this.service.getAllProduct().subscribe(
      (res: any) => {
        this.products = res.products;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        console.log('getProducts error', err.message);
      }
    );
  }

  //  Get All Categories
  getCategories() {
    this.loading = true;
    this.service.getAllCategories().subscribe(
      (result: any) => {
        this.loading = false;
        this.categories = result;
      },
      (err) => {
        this.loading = false;
        console.log('categories error', err);
      }
    );
  }

  // Filter Product With Category
  filterCategories(event: any) {
    let value = event.target.value;

    value == 'All Categories'
      ? this.getProducts()
      : this.getProductCategory(value);
  }

  // Get Single Category
  getProductCategory(keyWord: any) {
    this.loading = true;
    this.service.getProductByCategory(keyWord).subscribe((res: any) => {
      this.loading = false;
      this.products = res.products;
    });
  }

  // Add Item To Cart
  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find((item) => item.item.id == event.item.id);
      if (exist) {
        alert(event.item.title + ' Already Exist In Your Cart');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
