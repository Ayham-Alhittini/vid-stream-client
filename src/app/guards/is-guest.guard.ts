import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsGuestGuard implements CanActivate {
  constructor(private accountService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.accountService.loadedUser.pipe(
        take(1),
        map(user => {
          if (user == null) {
            return true;
          }
          //redirect
          this.router.navigateByUrl('/members');
          return false;
        })
      );
  }
  
}
