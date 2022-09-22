import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input()
  set value(n:number) {
    this._value = n
    console.info("setting value: ", this._value)
  }
  get value(): number {
    return this._value
  }

  @Input()
  set numList(n: number[]) {
    this._numList = n
    console.info("setting numList: ", this._numList)
    this._value = this._numList.reduce((acc, v)=>acc+v)
  }
  get numList(): number[] {
    return this._numList
  }

  _value : number = 0
  _numList: number[] = []

  constructor() { }

  ngOnInit(): void {
  }

  printNumList() {
    console.info(this._numList)
  }

}
