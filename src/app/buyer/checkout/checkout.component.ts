import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;
  selectedPaymentMethod: string = 'upi'; // Default payment method
  estimatedDelivery: string = '3-5 Business Days';
  trackingNumber: string = 'TRK123456789';
  orderPlaced: boolean = false; // Track if order is placed

  constructor(private router: Router) {
    const navData = this.router.getCurrentNavigation()?.extras.state;
    if (navData) {
      this.cartItems = navData['cartItems'] || [];
      this.totalPrice = navData['totalPrice'] || 0;
    }
  }

  confirmOrder() {
    this.orderPlaced = true; // Show order confirmation section
    console.log('Order Confirmed!', {
      items: this.cartItems,
      paymentMethod: this.selectedPaymentMethod,
      total: this.totalPrice,
    });

    // Implement order processing logic here
  }

  modifyOrder() {
    console.log('Modify Order Clicked');
    this.orderPlaced = false; // Allow modifying the order
  }
}
