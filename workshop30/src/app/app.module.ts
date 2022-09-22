import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RandomNumberComponent } from './components/random-number/random-number.component';
import { GreetingsComponent } from './components/greetings/greetings.component';

@NgModule({
  declarations: [
    AppComponent,
    RandomNumberComponent,
    GreetingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
