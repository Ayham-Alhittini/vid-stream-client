import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/home/register/register.component';
import { SharedModule } from './modules/shared.module';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ServerErrorComponent } from './components/error/server-error/server-error.component';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { TextInputComponent } from './components/text-input/text-input.component';
import { StreamingHubComponent } from './components/streaming-hub/streaming-hub.component';
import { VideoCardComponent } from './components/streaming-hub/video-card/video-card.component';
import { PlyrVideoComponent } from './components/plyr-video/plyr-video.component';
import { MyStreamsComponent } from './components/my-streams/my-streams.component';
import { VideoCardListItemComponent } from './components/video-card-list-item/video-card-list-item.component';
import { VideoUploadComponent } from './components/my-streams/video-upload/video-upload.component';
import { EditVideoComponent } from './components/my-streams/edit-video/edit-video.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { NavSearchComponent } from './components/nav/nav-search/nav-search.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TextInputComponent,
    StreamingHubComponent,
    VideoCardComponent,
    PlyrVideoComponent,
    MyStreamsComponent,
    VideoCardListItemComponent,
    VideoUploadComponent,
    EditVideoComponent,
    ProfileComponent,
    ChangePasswordComponent,
    NavSearchComponent,
    SearchResultComponent,
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
