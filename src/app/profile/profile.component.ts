import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { User } from '../Models/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User;
  knownAs = '';

  constructor(private accountService : AuthService, private toastr : ToastrService) { }

  ngOnInit(): void {

    this.accountService.loadedUser.pipe(take(1)).subscribe({
      next: user => {
        this.user = user;
        this.knownAs = user.knownAs;
      }
    })
  }

  updateProfile() {
    this.accountService.updateProfile(this.knownAs).subscribe(() => {
      this.accountService.setCurrentUser({...this.user, knownAs: this.knownAs});
      this.toastr.success('Profile updated successfully');
    });
  }
  
}
