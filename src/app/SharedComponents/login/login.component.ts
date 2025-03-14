import { Component, OnInit } from '@angular/core';
import { LoginPageService } from './login-page.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { EmailInputComponent } from '../email/email.component';
import { PasswordInputComponent } from '../password/password.component';

@Component({
  selector: 'app-login',
  imports: [InputFieldComponent, PasswordInputComponent, EmailInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup<any>;

  constructor(private formService: LoginPageService, private fb: FormBuilder) {}

  ngOnInit() {
    this.formService = new LoginPageService(this.fb);
    this.formGroup = this.formService.createForm();
    console.log(this.formGroup);
  }
}
