import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductApiResponse } from "../models/product.model";
import { Subject, merge, switchMap, tap } from "rxjs";
import { API_ROOT } from "src/app/app.constants";


@Injectable({ providedIn: "root" })
export class ProductService {

  private PRODUCTS_ENDPOINT = `${API_ROOT}/products`
  private CATEGORIES_ENDPOINT = `${this.PRODUCTS_ENDPOINT}/categories`
  private PRODUCTS_UNDER_CATEGORY_ENDPOINT = `${this.PRODUCTS_ENDPOINT}/category`

  private categorySubject = new Subject<string>()

  private categorySelectedAction$ = this.categorySubject.asObservable()

  constructor(private http: HttpClient) { }

  products$ = merge(
    this.http.get<ProductApiResponse>(this.PRODUCTS_ENDPOINT),
    this.categorySelectedAction$.pipe(
      tap(category => console.log(category)),
      switchMap(category =>
        category === "Showing All" ?
          this.http.get<ProductApiResponse>(this.PRODUCTS_ENDPOINT) :
          this.http.get<ProductApiResponse>(`${this.PRODUCTS_UNDER_CATEGORY_ENDPOINT}/${category}`)
      )
    )
  )

  categories$ = this.http.get<string[]>(this.CATEGORIES_ENDPOINT)

  selectedCategoryChanged = (categoryId: string) => this.categorySubject.next(categoryId)

}
