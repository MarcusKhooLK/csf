import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { LineItem, Order } from 'src/app/models';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-purchaseorder',
  templateUrl: './purchaseorder.component.html',
  styleUrls: ['./purchaseorder.component.css']
})
export class PurchaseorderComponent implements OnInit {

  	@Input()
	order!: Order

	@Output()
	onNewOrder = new Subject<Order>()

	_order!: Order
	orderForm!: FormGroup
	lineItemsArray!: FormArray

  constructor(private fb: FormBuilder) { }

	ngOnInit(): void { 
		this.orderForm = this.createOrder(this.order)
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.info('>>>> changes: ', changes)
		console.info('>>>> orderForm.dirty: ', this.orderForm?.dirty)
		if (this.orderForm?.dirty && !confirm(`You have not saved your current edit. Discard?`)) {
			this.order = this._order
			return
		}

		this.orderForm = this.createOrder(this.order)
		this._order = this.order
	}

	addItem() {
		this.lineItemsArray.push(this.createLineItem())
	}
	removeItem(idx: number) {
		this.lineItemsArray.removeAt(idx)
	}

	processOrder() {
		const order: Order = this.orderForm.value as Order
		if (!!this.order?.orderId) {
			order.orderId = this.order.orderId
			// @ts-ignore
			this.order = null
			this._order = this.order
		}
		this.orderForm = this.createOrder()
		this.onNewOrder.next(order)
	}

	private createOrder(order?: Order): FormGroup {
		this.lineItemsArray = this.createLineItems(order?.lineItems || [])
		return this.fb.group({
			name: this.fb.control<string>(order?.name || ''),
			mobile: this.fb.control<string>(order?.mobile || ''),
			lineItems: this.lineItemsArray
		})
	}
	private createLineItems(lis: LineItem[] = []): FormArray {
		return this.fb.array(lis.map(li => this.createLineItem(li)))
	}
	private createLineItem(li?: LineItem): FormGroup {
		return this.fb.group({
			// @ts-ignore
			item: this.fb.control<string>(li?.item || ''),
			quantity: this.fb.control<number>(li?.quantity || 1),
		})
	}
}
