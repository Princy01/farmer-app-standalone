import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'screen4',
    loadComponent: () => import('./screen4/screen4.component').then((m) => m.Screen4Component),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then((m) => m.AdminPage),
    children: [
      {
        path: 'driver',
        loadComponent: () => import('./forms/driver/driver.component').then((m) => m.DriverComponent),
      },
      {
        path: 'states',
        loadComponent: () => import('./forms/state/state.component').then((m) => m.StateComponent),
      },
      {
        path: 'category',
        loadComponent: () => import('./forms/category/category.component').then((m) => m.CategoryComponent),
      },
      {
        path: 'location',
        loadComponent: () => import('./forms/location/location.component').then((m) => m.LocationComponent),
      },
      {
        path: 'vehicle',
        loadComponent: () => import('./forms/vehicle/vehicle.component').then((m) => m.VehicleComponent),
      },
      {
        path: 'mandi',
        loadComponent: () => import('./forms/mandi/mandi.component').then((m) => m.MandiComponent),
      },
      {
        path: 'product',
        loadComponent: () => import('./forms/product/product.component').then((m) => m.ProductComponent),
      },
      {
        path: 'violation',
        loadComponent: () => import('./forms/violation/violation.component').then((m) => m.ViolationComponent),
      }
    ]
  },
  {
    path: 'buyer',
    loadComponent: () => import('./buyer/buyer.page').then((m) => m.BuyerPage),
    children: [
      {
        path: 'buyer-home',
        loadComponent: () => import('./buyer/buyer-home/buyer-home.component').then((m) => m.BuyerHomeComponent),
      },
      {
        path: 'category/:categoryName',
        loadComponent: () => import('./buyer/category/category.component').then((m) => m.CategoryPageComponent),
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./buyer/wishlist/wishlist.component').then((m) => m.WishlistComponent),
      },
      {
        path: 'cart',
        loadComponent: () => import('./buyer/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'checkout',
        loadComponent: () => import('./buyer/checkout/checkout.component').then((m) => m.CheckoutComponent)
      }
    ]
  }
];
