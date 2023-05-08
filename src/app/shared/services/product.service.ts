import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryApiResponse, ProductApiResponse, ProductPaginatedApiResponse } from "../models/product.model";
import { BehaviorSubject, Subject, merge, switchMap, tap } from "rxjs";
import { API_ROOT } from "src/app/app.constants";


@Injectable({ providedIn: "root" })
export class ProductService {

  private PRODUCTS_ENDPOINT = `${API_ROOT}/products`
  private CATEGORIES_ENDPOINT = `${this.PRODUCTS_ENDPOINT}/categories`
  private PRODUCTS_UNDER_CATEGORY_ENDPOINT = `${this.PRODUCTS_ENDPOINT}/category`

  private categorySubject = new Subject<string>()

  private productSubject = new BehaviorSubject<string>("")

  private categorySelectedAction$ = this.categorySubject.asObservable()

  private productSelectedAction$ = this.productSubject.asObservable()

  constructor(private http: HttpClient) { }

  // Observables
  products$ = merge(
    this.http.get<ProductPaginatedApiResponse>(this.PRODUCTS_ENDPOINT),
    this.categorySelectedAction$.pipe(
      tap(category => console.log(`Loading Products under: ${category}`)),
      switchMap(category =>
        category === "Showing All" ?
          this.http.get<ProductPaginatedApiResponse>(this.PRODUCTS_ENDPOINT) :
          this.http.get<ProductPaginatedApiResponse>(`${this.PRODUCTS_UNDER_CATEGORY_ENDPOINT}/${category}`)
      )
    )
  )

  product$ = this.productSelectedAction$.pipe(
    tap(productId => console.log(`Loading Product: ${productId}`)),
    switchMap(productId => this.http.get<ProductApiResponse>(`${this.PRODUCTS_ENDPOINT}/${productId}`))
  )

  categories$ = this.http.get<CategoryApiResponse>(this.CATEGORIES_ENDPOINT)

  // Actions
  selectedCategory = (categoryId: string) => this.categorySubject.next(categoryId)

  selectedProduct = (productId: string) => this.productSubject.next(productId)

}
