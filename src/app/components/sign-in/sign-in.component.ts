import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import {
  AuthService
} from "../../services/auth.service";
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent implements OnInit {

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

  navFrom = '';
  error: any;

  constructor(
    public authService: AuthService,
    public loaderService: LoaderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.navFrom = params['navFrom'] || 'dashboard');
  }

  get emailInputError() {
    if (this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (this.emailInput.hasError('required')) {
      return 'An Email is required.';
    }
  }
  
  get passwordInputError() {
    if (this.passwordInput.hasError('required')) {
      return 'A password is required.';
    }
  }

  loginEmail() {
    this.loaderService.setLoading(true);
    this.authService.SignIn(this.emailInput.value, this.passwordInput.value);
    this.loaderService.setLoading(false);
 }
}
