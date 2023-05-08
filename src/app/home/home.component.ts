import { Component, OnInit } from '@angular/core';
import { EMPTY_STRING } from '../app.constants';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title: string = EMPTY_STRING

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.title = "Our Products"
  }

  products$ = this.productService.products$;
  categories$ = this.productService.categories$;

  categoryChanged = (event: any) => this.productService.selectedCategoryChanged(event.target?.value)

}
