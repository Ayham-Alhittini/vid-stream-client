import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<void>();
  registerForm: FormGroup;

  constructor(private accountService : AuthService, private toastr : ToastrService, private fb: FormBuilder,
    private router : Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      userName : ['', [
        Validators.required,
        this.validateUserName()
      ]],
      knownAs : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password : ['', 
        [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.validatePasswordStrength()]
      ],
      confirmPassword : ['', [Validators.required, this.matchValues()]]
    });

    // this.registerForm?.controls['password'].valueChanges.subscribe({
    //   next : () => {
    //     this.registerForm?.controls['confirmPassword'].updateValueAndValidity();
    //   }
    // });
  }

  register() {
    
    console.log(this.registerForm.value);
    
    this.accountService.register(this.registerForm.value).subscribe({
      next : () => {
        this.router.navigateByUrl("/");
      },
      error : error => {
        console.log(error);
      }
    });
  }

  onCancel() {
    this.cancelRegister.emit();
  }


  // Validations

  matchValues() : ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === this.registerForm?.controls['password'].value ? null : {notMatching : true};
    }
  }


  validateUserName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      
      if (!control.value) 
        return null;

      const pattern = /^(?:\d+[a-zA-Z\d]|(?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){1,38})$/;
      const valid = pattern.test(control.value);
      return valid ? null : {invalidUsername : true};
    };
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
