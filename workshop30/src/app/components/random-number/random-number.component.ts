import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-random-number',
  templateUrl: './random-number.component.html',
  styleUrls: ['./random-number.component.css']
})
export class RandomNumberComponent implements OnInit {

  @Input()
  public set numberGenerated(v : number) {
    console.info("set ", v)
    this._numberGenerated = v;
    this.updateImage(v)
  }
  public get numberGenerated() : number {
    return this._numberGenerated
  }
  private _numberGenerated = 0

  numberImage!:string

  isMouseOver = false;

  @Output()
  onNumberClicked = new Subject<number>();

  constructor() { }

  ngOnInit(): void {
    this.updateImage(this._numberGenerated)
  }

  nextClicked() {
    this._numberGenerated++
    this._numberGenerated %= 31
    
    this.updateImage(this._numberGenerated);
  }

  onImagedClicked() {
    console.log("image clicked")
    this.onNumberClicked.next(this._numberGenerated);
  }

  prevClicked() {
    this._numberGenerated--
    if(this._numberGenerated < 0)
      this._numberGenerated = 30

    this.updateImage(this._numberGenerated)
  }

  onMouseEnter(){
    console.log("Mouse enter")
    this.isMouseOver = true;
  }

  onMouseExit() {
    console.log("Mouse exit")
    this.isMouseOver = false;
  }

  private updateImage(n: number) {
    console.info(`number >>>> ${n}`)
    this.numberImage = `/assets/numbers/number${this._numberGenerated}.jpg`;
  }
}
