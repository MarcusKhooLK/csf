import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css']
})
export class CaptureComponent implements OnInit {

  trigger = new Subject<void>()
  triggerObs = this.trigger.asObservable()

  width!:number
  capturedImage = '/assets/placeholder.png'

  constructor(private router: Router, private imageSvc: ImageService) {}

  ngOnInit(): void {
      this.width = Math.floor(window.innerWidth / 3)
  }

  imageCaptured(image: WebcamImage) {
    console.info(">>>> image captured ", image)
    this.capturedImage = image.imageAsDataUrl
    this.imageSvc.image = image.imageAsDataUrl;
    this.router.navigate(['/post'])
  }

  onCaptureBtnClicked() {
    this.trigger.next();
  }
}
