import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  product: FormGroup;

  constructor(private fb: FormBuilder, private el: ElementRef, private productService: ProductService) {
    this.product = this.fb.group({
      product_id: [{ value: '', disabled: true }],
      category_id: ['', Validators.required],
      product_name: ['', [Validators.required, Validators.maxLength(100)]],
      status: [1, Validators.required]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.product.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  submitForm() {
    if (this.product.valid) {
      console.log('Form Submitted:', this.product.value);
      this.productService.createProduct(this.product.value).subscribe({
        next: (data) => {
          console.log('Data:', data);
          this.product.reset();
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    } else {
      const firstInvalid = this.el.nativeElement.querySelector('.invalid');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
