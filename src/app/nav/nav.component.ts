import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  constructor(
      public authService : AuthService,
      private router : Router,
      private toastr : ToastrService  ) { }

  userSub : Subscription;

  ngOnInit(): void {
    this.userSub = this.authService.loadedUser.subscribe({
      error : res => {
        console.log(res);
      }
    });
  }


  login(authForm : NgForm)
  {
    this.authService.login(authForm.value).subscribe({
      next : () => this.router.navigateByUrl("/streaming-hub"),
      error : errorMsg => {
        console.log(errorMsg);
        for(const element of errorMsg) {
          this.toastr.error(element);
        }
      }
    });
  }


  goToUpload() {
    this.router.navigateByUrl("/my-streams?upload=true");
  }

  logout()
  {
    this.authService.logout();
    this.router.navigateByUrl("/");
  }
  
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
