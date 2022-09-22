import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { CaptureComponent } from './components/capture/capture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageService } from './services/image.service';

const appPath: Routes = [
  {path: '', component:CaptureComponent},
  {path: 'post', component:PostComponent},
  {path: '**', redirectTo:'/', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CaptureComponent,
  ],
  imports: [
    WebcamModule,
    BrowserModule,
    RouterModule.forRoot(appPath),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
