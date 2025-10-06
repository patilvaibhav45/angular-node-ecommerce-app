import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id: number;
  product: any;
  quantity: number;
  showcaseImages: any[] = [];
  loading = false;

  constructor(
    private _route: ActivatedRoute,
    private _product: ProductService,
    private _cart: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._route.paramMap
      .pipe(
        map((param: any) => {
          return param.params.id;
        })
      )
      .subscribe((productId) => {
        this.id = parseInt(productId);
        this._product.getSingleProduct(productId).subscribe((product) => {
          console.log(product);
          this.product = product;
          if (product.quantity === 0) this.quantity = 0;
          else this.quantity = 1;

          if (product.images) {
            this.showcaseImages = product.images.split(';');
          }
          this.loading = false;
        });
      });
  }

  addToCart(): void {
    this._cart.addProduct({
      id: this.id,
      price: this.product.price,
      quantity: this.quantity,
      image: this.product.image,
      title: this.product.title,
      maxQuantity: this.product.quantity,
    });
  }
}
