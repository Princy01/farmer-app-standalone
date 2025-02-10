import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  category: FormGroup;

  constructor(private fb: FormBuilder, private el: ElementRef, private categoryService: CategoryService) {
    this.category = this.fb.group({
      category_name: ['', [Validators.required, Validators.maxLength(255)]],
      super_cat_id: ['', [Validators.pattern("^[0-9]*$")]],
      created_at: [{ value: new Date().toISOString(), disabled: true }],
      updated_at: [{ value: new Date().toISOString(), disabled: true }],
      col1: [''],
      col2: [''],
      remarks: ['']
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.category.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  submitForm() {
    if (this.category.valid) {
      console.log('Form Submitted:', this.category.value);
      this.categoryService.createCategory(this.category.value).subscribe(
        {
          next: data =>{
            console.log('Data:', data);
            this.category.reset();
          },
          error: error => {
            console.error('Error:', error);
          }
        }
      )
    } else {
      const firstInvalid = this.el.nativeElement.querySelector('.invalid');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
