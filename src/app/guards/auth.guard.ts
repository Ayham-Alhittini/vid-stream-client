import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService : AuthService, private toastr : ToastrService){}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.loadedUser.pipe(
      take(1),
      map(user => {
        if (user != null) {
          return true;
        }
        this.toastr.error("You Should Login");
        return false;
      })
    );
  }
  
}
