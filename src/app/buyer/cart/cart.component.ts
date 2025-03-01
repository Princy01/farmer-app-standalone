import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartForm: FormGroup;
  cartItems = [
    { name: 'Spinach', hindiName: 'पालक', image: 'assets/img/Spinach2.png', price: 40, quantity: 1 }, // 1 = 100g
    { name: 'Tomato', hindiName: 'टमाटर', image: 'assets/img/Tomato1.png', price: 30, quantity: 2 }, // 2 = 200g
  ];

  discount = 0;

  constructor(private router: Router, private fb: FormBuilder) {
    this.cartForm = this.fb.group({
      discountCode: [''],
      deliveryDate: ['']
    });
  }

  // ✅ Get Total Price After Changes
  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // ✅ Increase Quantity (Each Click Adds 100g)
  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
  }

  // ✅ Decrease Quantity (Minimum 100g)
  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

  // ✅ Remove Item from Cart
  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  // ✅ Apply Discount Code
  applyDiscount() {
    const validCodes: { [key: string]: number } = {
      'SAVE10': 10,
      'FRESH20': 20
    };

    const code = this.cartForm.get('discountCode')?.value;
    this.discount = validCodes[code] ? (this.getTotalPrice() * validCodes[code]) / 100 : 0;
  }

  // ✅ Checkout and Pass Data
  checkout() {
    this.router.navigate(['/checkout'], {
      state: {
        cartItems: this.cartItems,
        totalPrice: this.getTotalPrice() - this.discount,
        deliveryDate: this.cartForm.get('deliveryDate')?.value
      }
    });
  }
}
