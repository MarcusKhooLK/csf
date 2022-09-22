import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  style = {'red-font': false, 'blue-font': false}

  @Input()
  name:string = "fred"

  constructor() { 
    console.info("constructor: ", this.name)
  }

  ngOnInit(): void {
    console.info("ngOnInit ", this.name)
    
    if((this.name.length % 2) == 0) {
      this.style['red-font'] = true
    } else {
      this.style['blue-font'] = true
    }
  }

}
