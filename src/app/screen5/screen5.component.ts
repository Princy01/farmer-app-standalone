import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-screen5',
  templateUrl: './screen5.component.html',
  styleUrls: ['./screen5.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class Screen5Component {
  ordersSummary = [
    { orderNumber: 1, qtySold: 500, amount: 15000 },
    { orderNumber: 2, qtySold: 600, amount: 18000 },
    { orderNumber: 3, qtySold: 450, amount: 13500 },
    { orderNumber: 4, qtySold: 700, amount: 21000 },
    { orderNumber: 5, qtySold: 550, amount: 16500 },
    // Add more summary data here
  ];

  selectedDetails: any = null;

  viewOrderDetails(order: any) {
    this.selectedDetails = order;
    console.log('Viewing details for:', order);
  }
}
