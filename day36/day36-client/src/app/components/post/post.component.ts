import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  form!: FormGroup
  imageUrl: string = "/assets/placeholder.png"
  
  constructor(private fb: FormBuilder, 
    private imageService: ImageService, 
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.createForm();
    if(!this.imageService.image) {
      this.router.navigate(["/"])
      return
    }
    this.imageUrl = this.imageService.image;
    console.info(">>> imageUrl: ", this.imageUrl)
  }

  private createForm() : FormGroup {
    return this.fb.group({
      title: this.fb.control('', [Validators.required])
    })
  }

  onPost() {
    //const post: Post = this.form.value as Post
    const title = this.form.get('title')?.value
    console.info(">>> title: ", title)
    this.imageService.upload(title)
              .then(result=>{
                console.info(">>>> result: ", result)
                this.router.navigate(['/'])
              })
              .catch(error => {
                console.error(">>>> error ", error)
              })
  }

}
