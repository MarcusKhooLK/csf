import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegistrationData, RegistrationResponse } from './models';
import { RegistrationService } from './services/registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  sub$!: Subscription

  constructor(private registrationSvc: RegistrationService) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.sub$.unsubscribe()
  }

  processNewRegistration(data: RegistrationData) {
    console.info(">>>>> new registration: ", data)
    this.registrationSvc.newRegistration(data)
                  .then(result=> {
                    console.info(">>>> result: ", result)
                    alert(`Your registration id is ${result.message}`)
                  })
                  .catch(error => {
                    console.error(">>>> error: ", error)
                    alert(`Your registration id is ${JSON.stringify(error)}`)
                  })
  }
}
