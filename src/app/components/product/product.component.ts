import { Component, Input } from '@angular/core';
import { Product } from 'src/app/home/models/product.model';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input()
  product?: Product;

}
