import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderDB } from 'src/app/models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

	@Input()
	ordersDB!: OrderDB

	@Output()
	onEdit = new Subject<string>()

	constructor() { }

	ngOnInit(): void { }

	edit(key: string) {
		this.onEdit.next(key)
	}
}
