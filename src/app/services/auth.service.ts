import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, tap} from 'rxjs';
import { User } from '../Models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  private baseUrl = "http://host.docker.internal:9081/api/auth";

  loadedUser = new BehaviorSubject<User>(null);

  login(model : any)
  {
    return this.http.post<User>(this.baseUrl + "/login", model).pipe(
      tap(
        res => {
          this.setCurrentUser(res);
        },
      )
    );
  }


  updateProfile(knownAs: string) {
    return this.http.put(this.baseUrl + "/update-profile?knownAs=" + knownAs, null);
  }

  changePassword(model: any) {
    return this.http.put(this.baseUrl + '/change-password', model);
  }


  autoLogin()
  {
    const user = localStorage.getItem('user');

    if (user) {
      this.loadedUser.next(JSON.parse(user));
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.loadedUser.next(null);
    window.location.href = '/';
  }


  register(model : any) {
    return this.http.post<User>(this.baseUrl + "/register", model).pipe(
      tap(
        res => {
          this.setCurrentUser(res);
        },
      )
    );
  }

  setCurrentUser(user : User) {
    this.loadedUser.next(user);
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }


}
