import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-num-display',
  templateUrl: './num-display.component.html',
  styleUrls: ['./num-display.component.css']
})
export class NumDisplayComponent implements OnInit {

  num!: number

  constructor(private activatedRoute: ActivatedRoute, private title: Title) { }

  ngOnInit(): void {
    console.info(">>>> NumDisplayComponent OnInit")
    this.num = this.activatedRoute.snapshot.params['num']
    this.title.setTitle(`Number ${this.num}`)
  }

}
