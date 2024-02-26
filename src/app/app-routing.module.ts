import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { IsGuestGuard } from './guards/is-guest.guard';

const routes: Routes = [
  {path : '', component : HomeComponent, canActivate: [IsGuestGuard]},
  {path : 'home', component : HomeComponent, canActivate: [IsGuestGuard]},
  {path : '', 
    runGuardsAndResolvers : 'always',
    canActivate : [AuthGuard],
    children : [
      
    ]
  },
  {path : '**', component : NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
