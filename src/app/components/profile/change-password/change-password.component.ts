import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;

  constructor(private accountService : AuthService, private toastr : ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword : ['', 
        [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.validatePasswordStrength()]
      ],
      confirmNewPassword : ['', [Validators.required, this.matchValues()]]
    });

    this.changePasswordForm?.controls['newPassword'].valueChanges.subscribe({
      next : () => {
        this.changePasswordForm?.controls['confirmNewPassword'].updateValueAndValidity();
      }
    });
  }


  submit() {
    console.log(this.changePasswordForm.value);
    
    this.accountService.changePassword(this.changePasswordForm.value).subscribe(() => {
      this.toastr.success("Password changed successfully.");
      this.changePasswordForm.reset();
    });
    
  }


  // Validations

  matchValues() : ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === this.changePasswordForm?.controls['newPassword'].value ? null : {notMatching : true};
    }
  }


  validatePasswordStrength(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      if (!control.value) 
        return null;

      const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      const valid = strongPattern.test(control.value);
      return valid ? null : {weakPassword : true};
    };
  }
}
