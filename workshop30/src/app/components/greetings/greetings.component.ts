import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.css']
})
export class GreetingsComponent implements OnInit {

  @Input()
  name!: string

  constructor() {
    console.info("constructor: ", this.name)
  }

  ngOnInit(): void {
    console.info("ngOnInit: ", this.name)
  }

}
