import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartCount!:number
  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  emptyCart(): void {
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.00
    };
    this.productService.setCart(cart);
    this.router.navigate(['/home']);
  }

  removeFromCart(product: {
    product: Product,
    quantity: number
  }): void {

    let index = this.products.indexOf(product)

    const prod = this.products[index]

    if(prod.quantity > 1){
      prod.quantity = prod.quantity - 1
    } 
    else if(prod.quantity === 1){
      this.products.splice(index,1);
    }

    let cart = {
      cartCount: this.cartCount - 1,
      products: this.products,
      totalPrice: this.totalPrice - prod.product.price
    };
    this.productService.setCart(cart);
  }
}
