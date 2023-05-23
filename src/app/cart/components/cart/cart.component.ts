import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  total: number = 0;
  success: boolean = false;

  constructor(private service: CartService) {}

  ngOnInit(): void {
    this.getCartProduct();
  }

  // update local storage
  updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  // get products that saved in local storage
  getCartProduct() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getTotalPrice();
  }

  // Total Cart Price
  getTotalPrice() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  // mins one product
  minAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getTotalPrice();
    this.updateLocalStorage();
  }

  // add one product
  plusAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getTotalPrice();
    this.updateLocalStorage();
  }

  // detect changes on input
  detectChange() {
    this.getTotalPrice();
    this.updateLocalStorage();
  }

  // delete Product
  deleteProduct(index: any) {
    this.cartProducts.splice(index, 1);
    this.getTotalPrice();
    this.updateLocalStorage();
  }

  // delete all products from cart
  clearCart() {
    this.cartProducts = [];
    this.getTotalPrice();
    this.updateLocalStorage();
  }

  addCart() {
    let products = this.cartProducts.map((item) => {
      return { productId: item.item.id, quantity: item.quantity };
    });

    let Model = {
      userId: 5,
      products: products,
    };

    this.service.createNewCart(Model).subscribe(
      (res) => {
        this.success = true;
      },
      (err) => {
        console.error(err);
      }
    );

    console.log(Model);
  }
}
