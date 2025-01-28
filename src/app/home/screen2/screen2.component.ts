import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Screen3Component } from '../screen3/screen3.component';

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, Screen3Component]
})
export class Screen2Component {
  filterOptions = [
    { name: 'All', value: 'all' },
    { name: 'Bulk', value: 'bulk' },
    { name: 'Others', value: 'others' },
    { name: 'Desc / Asc Price', value: 'price' },
    { name: 'Create My Own List', value: 'custom' },
    { name: 'Item Wise', value: 'itemwise' },
  ];

  selectedFilter = 'all';

  showScreen3 = false;

  // Example data
  orders = [
    { id: 1, items: 'Carrot 25 kg (@Rs10), Carrot2 (@Rs15)', total: 500 },
    { id: 2, items: 'Spinach 25 kg (@Rs10), Carrot2 (@Rs15)', total: 750 },
    { id: 3, items: 'Onion 20 kg + Potato 15 kg', total: 1000 },
    { id: 4, items: 'Tomato 10 kg (@Rs20)', total: 200 },
  ];

  filteredOrders = [...this.orders];

  applyFilter(filter: string) {
    this.selectedFilter = filter;

    switch (filter) {
      case 'all':
        this.filteredOrders = [...this.orders];
        break;

      case 'bulk':
        this.filteredOrders = this.orders.filter(order => order.total > 750);
        break;

      case 'others':
        this.filteredOrders = this.orders.filter(order => order.total <= 750);
        break;

      case 'price':
        this.filteredOrders = [...this.orders].sort((a, b) => a.total - b.total); // Ascending by default
        break;

      case 'custom':
        // Custom logic for selecting a manual list (simulate selected items for now)
        this.filteredOrders = [
          { id: 3, items: 'Onion 20 kg + Potato 15 kg', total: 1000 },
        ];
        break;

    }
  }
  constructor(){}
  loadScreen3(event: any) {
    setTimeout(() => {
      this.showScreen3 = true;
      console.log(this.showScreen3,event)
      // event.target.complete();
    }, 1000);
  }
}
