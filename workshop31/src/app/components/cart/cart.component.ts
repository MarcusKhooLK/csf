import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from 'src/app/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input()
  set itemsInCart(c: Item[]) {
    this._itemsInCart = c
    this.calculateTotal()
  }

  _itemsInCart: Item[] = []
  total: number = 0.0

  @Output()
  onItemRemoved = new Subject<number>()

  ngOnInit(): void {
  }

  onRemoveItem(i:number) {
    console.info("removing item index: ", i)
    this.onItemRemoved.next(i)
  }

  private calculateTotal() {
    this.total = 0
    // 'in' get index
    // for(let i in this._itemsInCart){
    //   this.total += i.quantity * i.unitPrice
    // }

    // 'of' get the value
    for(let i of this._itemsInCart){
      this.total += i.quantity * i.unitPrice
    }
  }

}
