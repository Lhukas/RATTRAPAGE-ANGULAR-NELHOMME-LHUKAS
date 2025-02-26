
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from 'src/app/services/product.service';
import { BrandService, Brand } from 'src/app/services/brand.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  brandName: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router,private brandService: BrandService,) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProducts().subscribe((products) => {
      this.product = products.find(p => p.id == productId) || null;
      if (this.product) {
        this.getBrandName(this.product.brandId);
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  getBrandName(brandId: number | undefined): void {
    this.brandService.getBrands().subscribe((brands) => {
      const brand = brands.find(b => b.id == brandId);
      this.brandName = brand ? brand.name : 'Marque inconnue';
    });
  }

}
