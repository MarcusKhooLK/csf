import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Registration } from 'src/app/models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regForm!: FormGroup

  @Output()
  onNewRegistration = new Subject<Registration>()

  @Input()
  registration!: Registration

  // initialize service FormBuilder is similar to autowired in springboot
  // private means giving access to class (this.fb)
  // public allows access to outside classes
  constructor(private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      // default value as argument
      name: this.fb.control(this.registration?.name, [Validators.required, Validators.minLength(3)]),
      email: this.fb.control(this.registration?.email, [Validators.required, Validators.email]),
      gender: this.fb.control(this.registration?.gender),
      newsletter: this.fb.control(this.registration?.newsletter)
    })
  }

  processForm() {
    console.info("Submit button clicked")
    //console.info(">>>> form: ", this.regForm.value)
    //console.info(">>>> name:", this.regForm.value.name)
    // casting
    const reg1: Registration = this.regForm.value as Registration
    /*
    const reg2: Registration = {
      name: this.regForm.value.name,
      email:this.regForm.value.email,
      gender: this.regForm.value.gender,
      newsletter:this.regForm.value.newsletter
    }*/
    this.onNewRegistration.next(reg1)
  }

}
