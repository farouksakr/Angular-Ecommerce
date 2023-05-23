import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProduct() {
    return this.http.get(environment.baiseApi + 'products');
  }

  getAllCategories() {
    return this.http.get(environment.baiseApi + 'products/categories');
  }

  getProductByCategory(keyWord: any) {
    return this.http.get(environment.baiseApi + 'products/category/' + keyWord);
  }

  getProductById(id: any) {
    return this.http.get(environment.baiseApi + 'products/' + id);
  }
}
