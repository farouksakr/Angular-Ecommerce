import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  product: any = {};
  loading: boolean = false;

  constructor( private activatedRoute: ActivatedRoute, private service: ProductsService ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    this.loading = true
    this.service.getProductById(this.id).subscribe(res=> {
    this.loading = false
      this.product =  res;
    }, error => {
      this.loading = false
      alert(error)
    })
  }
}
