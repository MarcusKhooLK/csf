import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Item } from 'src/app/models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  itemForm!: FormGroup

  @Output()
  onItemFormSubmit = new Subject<Item>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      unitPrice: this.fb.control<number>(0.1, [Validators.required, Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$')]),
      quantity: this.fb.control<number>(1, [Validators.required, Validators.min(1)])
    })
  }

  processItemForm() {
    console.info("Item form: ", this.itemForm.value)
    const item: Item = {
      name: this.itemForm.value.name,
      unitPrice: this.itemForm.value.unitPrice,
      quantity: this.itemForm.value.quantity
    }
    this.onItemFormSubmit.next(item);
    this.itemForm.reset()
  }

}
