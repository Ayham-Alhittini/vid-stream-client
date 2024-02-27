import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.accountService.loadedUser.pipe(take(1)).subscribe({
      next : user => {
        if (user) {
          request = request.clone({
            setHeaders : {
              Authorization : `Bearer ${user.token}`
            }
          })
        }
      }
    });
    return next.handle(request);
  }
}
