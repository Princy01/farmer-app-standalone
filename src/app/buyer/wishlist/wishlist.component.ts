import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent {
  wishlistItems: any[] = [];
  cartItems: any[] = [];

  constructor(private router: Router, private toastController: ToastController) {
    const navData = this.router.getCurrentNavigation()?.extras.state;
    if (navData) {
      this.wishlistItems = navData['wishlistItems'] || [];
      this.cartItems = navData['cartItems'] || [];
    }

    // ✅ Add sample products if wishlist is empty
    if (this.wishlistItems.length === 0) {
      this.wishlistItems = [
        {
          id: 1,
          name: 'Fresh Tomatoes',
          hindiName: 'ताज़ा टमाटर',
          price: 50,
          image: 'assets/images/tomatoes.jpg',
        },
        {
          id: 2,
          name: 'Organic Potatoes',
          hindiName: 'जैविक आलू',
          price: 40,
          image: 'assets/images/potatoes.jpg',
        },
        {
          id: 3,
          name: 'Green Peas',
          hindiName: 'हरी मटर',
          price: 70,
          image: 'assets/images/peas.jpg',
        },
      ];
    }
  }

  async addToCart(item: any) {
    this.cartItems.push(item);
    this.wishlistItems = this.wishlistItems.filter((w) => w !== item);

    const toast = await this.toastController.create({
      message: `${item.name} added to cart`,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  async removeFromWishlist(item: any) {
    this.wishlistItems = this.wishlistItems.filter((w) => w !== item);

    const toast = await this.toastController.create({
      message: `${item.name} removed from wishlist`,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  goToCart() {
    this.router.navigate(['/cart'], { state: { cartItems: this.cartItems } });
  }
}
