import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'workshop30';

  firstClicked = true;
  number = 0;
  selectedNumbers: number[] = []
  selectedNumberText!:string

  ngOnInit(): void {
    this.reset();
  }

  onImageClicked(n: number) {
    console.log(">>>>>> selected: ", n)
    this.selectedNumbers.push(n)
    this.selectedNumberText = this.selectedNumbers.join(", ")
  }

  reset() {
    this.number =  Math.floor(Math.random() * 31);
    this.selectedNumberText = "No selection yet"
  }
}
