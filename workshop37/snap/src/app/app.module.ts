import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {WebcamModule} from 'ngx-webcam';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { CameraService } from './services/camera.service';
import { SnapComponent } from './components/snap/snap.component';
import { ShareComponent } from './components/share/share.component';

const appRoutes: Routes = [
  {path:'', component:SnapComponent},
  {path:'share', component:ShareComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    SnapComponent,
    ShareComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    MaterialModule,
    WebcamModule
  ],
  providers: [ CameraService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
