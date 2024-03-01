import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { IsGuestGuard } from './guards/is-guest.guard';
import { ServerErrorComponent } from './components/error/server-error/server-error.component';
import { StreamingHubComponent } from './components/streaming-hub/streaming-hub.component';
import { PlyrVideoComponent } from './components/plyr-video/plyr-video.component';
import { VideoResolver } from './resolvers/video.resolver';
import { MyStreamsComponent } from './components/my-streams/my-streams.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

const routes: Routes = [
  {path : '', component : HomeComponent, canActivate: [IsGuestGuard]},
  {path : 'home', component : HomeComponent, canActivate: [IsGuestGuard]},
  {path : '', 
    runGuardsAndResolvers : 'always',
    canActivate : [AuthGuard],
    children : [
      {path: 'streaming-hub', component: StreamingHubComponent},
      {path: 'watch', component: PlyrVideoComponent, resolve: { video: VideoResolver }},
      {path: 'my-streams', component: MyStreamsComponent},
      {path: 'my-profile', component: ProfileComponent},
      {path: 'results', component: SearchResultComponent},
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
