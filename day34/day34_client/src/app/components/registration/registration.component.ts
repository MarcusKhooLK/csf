import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { RegistrationData } from 'src/app/models';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Output()
  onNewRegistration = new Subject<RegistrationData>()

  form!: FormGroup
  
  constructor(private fb: FormBuilder, private registerSvc: RegistrationService) { }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.email])
    })
  }

  onRegister() {
    const data: RegistrationData = this.form.value as RegistrationData
    this.onNewRegistration.next(data)
  }

}
