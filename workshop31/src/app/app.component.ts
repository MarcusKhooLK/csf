import { Component } from '@angular/core';
import { Item } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workshop31';

  itemsInCart: Item[] = []

  onItemFormSubmitted(item: Item){
    console.info(`Adding item: Name: ${item.name}, UnitPrice: ${item.unitPrice}, Quantity: ${item.quantity} into cart`)
    this.itemsInCart = [...this.itemsInCart, item]
  }

  onItemRemoved(i: number) {
    const tmp: Item[] = [...this.itemsInCart]
    this.itemsInCart = tmp
    this.itemsInCart.splice(i, 1)
  }
}
