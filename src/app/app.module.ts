import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './modules/shared.module';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { TextInputComponent } from './forms/text-input/text-input.component';
import { DatePickerComponent } from './forms/date-picker/date-picker.component';
import { StreamingHubComponent } from './streaming-hub/streaming-hub.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { PlyrVideoComponent } from './plyr-video/plyr-video.component';
import { MyStreamsComponent } from './my-streams/my-streams.component';
import { VideoCardListItemComponent } from './video-card-list-item/video-card-list-item.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TextInputComponent,
    DatePickerComponent,
    StreamingHubComponent,
    VideoCardComponent,
    PlyrVideoComponent,
    MyStreamsComponent,
    VideoCardListItemComponent,
    VideoUploadComponent,
    EditVideoComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi : true},
    {provide : HTTP_INTERCEPTORS, useClass : JwtInterceptor, multi : true},
    {provide : HTTP_INTERCEPTORS, useClass : LoadingInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
