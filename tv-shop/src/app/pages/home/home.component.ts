import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from 'src/app/services/product.service';
import { BrandService, Brand } from 'src/app/services/brand.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  brands: Brand[] = [];

  constructor(private productService: ProductService, private router: Router, private brandService: BrandService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
    this.brandService.getBrands().subscribe((data) => {
      this.brands = data;
    });
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  getBrandName(brandId: number | undefined): string {
    const brand = this.brands.find(b => b.id == brandId);
    return brand ? brand.name : 'Marque inconnue';
  }

}

