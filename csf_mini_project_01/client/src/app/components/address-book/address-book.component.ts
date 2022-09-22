import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models';
import { AddressBookService } from 'src/app/services/address-book.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {

  form!: FormGroup
  toShowContacts: boolean = false

  contacts: Contact[] = []

  constructor(private fb: FormBuilder, private addBookSvc: AddressBookService) { }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  private createForm() : FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      mobile: this.fb.control<string>('', [Validators.required])
    })
  }

  onAddContact() {
    const data: Contact = this.form.value as Contact
    this.addBookSvc.addNewContact(data)
    .then(response => {
      alert(`${JSON.stringify(response)}`)
      this.form.reset()
      this.showContacts()
    })
    .catch(error => {
      alert(`Error: ${JSON.stringify(error)}`)
    })
  }

  updateContacts() {
    this.addBookSvc.getContacts()
    .then(result => {
      this.contacts = result
    })
    .catch(error => {
      alert(`Error: ${JSON.stringify(error)}`)
    })
  }

  showContacts() {
    this.updateContacts()
    this.toShowContacts = true
  }

  showForm() {
    this.toShowContacts = false
  }

  onRemoveContact(idx: number) {
    const c: Contact = this.contacts[idx]
    this.addBookSvc.removeContact(c)
    .then(result => {
      alert(`${JSON.stringify(result)}`)
      this.contacts.splice(idx, 1)
    })
    .catch(error => {
      alert(`Error: ${JSON.stringify(error)}`)
    })
  }
}
