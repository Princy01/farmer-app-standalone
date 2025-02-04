import { Routes } from '@angular/router';

export const routes: Routes = [
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
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
