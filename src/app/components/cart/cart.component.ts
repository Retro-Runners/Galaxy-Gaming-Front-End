import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartCount!: number;
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
        this.cartCount = cart.cartCount;
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

  removeFromCart(product: Product): void {

    let inCart = true;
    
    const index = this.cartProducts.indexOf(product)

    this.products.forEach(
      (element) => {
        if(element.product == product && index > -1 && element.quantity > 1 && this.cartCount > 0 && inCart == true){
          --element.quantity;
          let cart = {
            cartCount: this.cartCount - 1,
            products: this.products,
            totalPrice: this.totalPrice - product.price
          };
          this.productService.setCart(cart);
          return;
        };
        if(element.product == product && index > -1 && element.quantity <= 1 && this.cartCount > 0 && inCart == true){
          this.products.splice(index,1);
          let cart = {
            cartCount: this.cartCount - 1,
            products: this.products,
            totalPrice: this.totalPrice - product.price
          };
          this.productService.setCart(cart);
          inCart = false;
          return;
        };

      }
    );
      
  }

}
