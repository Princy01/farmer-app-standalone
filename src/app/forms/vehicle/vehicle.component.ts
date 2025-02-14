import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent {
  vehicle: FormGroup;
  makes = [{ id: 1, name: 'Toyota' }, { id: 2, name: 'Honda' }];
  models = [{ id: 1, name: 'Corolla' }, { id: 2, name: 'Civic' }];
  engines = [{ id: 1, name: 'Petrol' }, { id: 2, name: 'Diesel' }];

  constructor(private fb: FormBuilder, private el: ElementRef, private vehicleService: VehicleService, private navCtrl: NavController) {
    this.vehicle = this.fb.group({
      vehicle_name: ['', [Validators.required, Validators.maxLength(255)]],
      vehicle_manufacture_year: ['', [Validators.required, Validators.pattern("^[0-9]{4}$")]],
      vehicle_warranty: [''],
      vehicle_make: ['', Validators.required],
      vehicle_model: ['', Validators.required],
      vehicle_registration_no: ['', Validators.required],
      vehicle_engine_type: ['', Validators.required],
      vehicle_purchase_date: ['', Validators.required],
      vehicle_color: [''],
      vehicle_insurance_id: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.vehicle.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  submitForm() {
    if (this.vehicle.valid) {
      console.log('Vehicle Data:', this.vehicle.value);
      this.vehicleService.createVehicle(this.vehicle.value).subscribe({
        next: data => {
          console.log('Data:', data);
          this.vehicle.reset();

        this.navCtrl.navigateBack('/admin/driver', {
          queryParams: { vehicle_id: data.vehicle_id }
        });
      },
        error: error => {
          console.error('Error:', error);
        }
      });
    } else {
      const firstInvalid = this.el.nativeElement.querySelector('.invalid');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
