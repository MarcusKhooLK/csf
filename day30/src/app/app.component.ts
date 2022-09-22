import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day30';

  image = '/assets/dog0.jpg';
  count = 0

  onImageClicked($event: string) {
    console.log(">>>>>> app component: image clicked", $event)
    this.image = $event
    this.count++
  }
}
