import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent {
  driver: FormGroup;

  constructor(private fb: FormBuilder, private el: ElementRef, private driverService: DriverService) {
    this.driver = this.fb.group({
      driver_name: ['', [Validators.required, Validators.maxLength(255)]],
      driver_age: ['', [Validators.required, Validators.min(18), Validators.pattern("^[0-9]*$")]],
      driver_license: ['', [Validators.required, Validators.maxLength(50)]],
      driver_number: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(15)]],
      driver_address: ['', [Validators.required, Validators.maxLength(255)]],
      driver_status: ['', Validators.required],
      date_of_joining: ['', Validators.required],
      experience_years: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      vehicle_id: ['', Validators.required],
      license_expiry_date: ['', Validators.required],
      emergency_contact: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(15)]],
      assigned_route_id: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      d_o_b: ['', Validators.required],
      violation: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.driver.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }


  submitForm() {
    if (this.driver.valid) {
      console.log('Form Submitted:', this.driver.value);
      this.driverService.createDriver(this.driver.value).subscribe(
        {
          next: data =>{
            console.log('Data:', data);
            this.driver.reset();
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
