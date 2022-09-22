import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  @Input()
  image = "/assets/dog1.jpg"
  @Input()
  title = "Goldie"
  addToCart = true
  fontSize = "1em"
  styleClass = "thumbnail1"

  @Output()
  clicked = new Subject<string>()

  constructor() { }

  ngOnInit(): void {
  }

  enter() {
    console.info("cursor is in the image")
    this.fontSize = "2em"
    this.addToCart = false
  }

  exit() {
    console.log("cursor outside the image")
    this.fontSize = "1em"
    this.addToCart = true
  }

  process() {
    console.log("clicked")
    // send notification out
    this.clicked.next(this.image);
  }

}
