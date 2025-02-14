import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {AuthService} from '../../services/auth/auth.service';
import {UserStoargeService} from '../../services/storage/user-stoarge.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private notification: NzNotificationService,
              private router: Router,
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm() {
    if (this.validateForm.valid) {
      this.authService.login(this.validateForm.get(['userName'])!.value, this.validateForm.get(['password'])!.value)
        .subscribe(res => {
          console.log(res);
          if (UserStoargeService.isClientLoggedIn()) {
            this.router.navigateByUrl('client/dashboard');
          } else if (UserStoargeService.isCompanyLoggedIn()) {
            this.router.navigateByUrl('company/dashboard');
          }
        }, error => {
          this.notification
            .error(
              'ERROR',
              `Bad credentials`,
              {nzDuration: 5000}
            );
        });
    } else {
      for (const i in this.validateForm.controls) {
        if (this.validateForm.controls.hasOwnProperty(i)) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }

}
