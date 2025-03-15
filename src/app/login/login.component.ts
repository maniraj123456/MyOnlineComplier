import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmailInputComponent } from '../SharedComponents/email/email.component';
import { PasswordInputComponent } from '../SharedComponents/password/password.component';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    PasswordInputComponent,
    EmailInputComponent,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  
  gender: string = '';
  formGroup!: FormGroup<any>;
  genderOptions: { value: any; label: string }[] = [];

  constructor(
    private formService: LoginService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.formService = new LoginService(this.fb);

    this.formGroup = this.formService.createForm();
  }


  onSignin() {
      this.router.navigate(['/signup']);
  }

  onLogin()
  {
    if(this.formGroup.valid) {
      console.log('Form submitted successfully');
      this.router.navigate(['/signup']);
    }
  }
}
