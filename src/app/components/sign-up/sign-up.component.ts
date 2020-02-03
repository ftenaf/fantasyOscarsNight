import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from "../../services/auth.service";
import {
  Validators,
  FormControl,
  FormGroup
} from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signinForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(6)])
  });

  hide = true;

  get emailInput() {
    return this.signinForm.get('email');
  }
  get passwordInput() {
    return this.signinForm.get('password');
  }

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  get EmailInputError() {
    if (this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (this.emailInput.hasError('required')) {
      return 'An Email is required.';
    }
  }
  get PasswordInputError() {
    if (this.passwordInput.hasError('required')) {
      return 'A password is required.';
    }
  }
}
