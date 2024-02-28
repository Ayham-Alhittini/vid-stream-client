import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { IsGuestGuard } from './guards/is-guest.guard';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { StreamingHubComponent } from './streaming-hub/streaming-hub.component';
import { PlyrVideoComponent } from './plyr-video/plyr-video.component';
import { VideoResolver } from './resolvers/video.resolver';
import { MyStreamsComponent } from './my-streams/my-streams.component';

const routes: Routes = [
  {path : '', component : HomeComponent, canActivate: [IsGuestGuard]},
  {path : 'home', component : HomeComponent, canActivate: [IsGuestGuard]},
  {path : '', 
    runGuardsAndResolvers : 'always',
    canActivate : [AuthGuard],
    children : [
      {path: 'streaming-hub', component: StreamingHubComponent},
      {path: 'watch', component: PlyrVideoComponent, resolve: { video: VideoResolver }},
      {path: 'my-streams', component: MyStreamsComponent}
    ]
  },
  {path: 'server-error', component: ServerErrorComponent},
  {path : '**', component : NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
