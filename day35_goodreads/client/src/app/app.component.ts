import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    localStorage.setItem("currOffset", '0');
  }
  ngOnDestroy(): void {
      localStorage.clear()
  }
}
