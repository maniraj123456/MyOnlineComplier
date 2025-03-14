import { Component, OnInit } from '@angular/core';
import { LoginPageService } from './login-page.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { EmailInputComponent } from '../email/email.component';
import { PasswordInputComponent } from '../password/password.component';
import { DropdownFieldComponent } from '../dropdown/dropdown.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    InputFieldComponent,
    PasswordInputComponent,
    EmailInputComponent,
    DropdownFieldComponent,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
onGenderChange($event: any) {
throw new Error('Method not implemented.');
}
onSubmit() {
throw new Error('Method not implemented.');
}
  formGroup!: FormGroup<any>;
  genderOptions: { value: any; label: string }[] = [];

  constructor(private formService: LoginPageService, private fb: FormBuilder) {
    this.formService = new LoginPageService(this.fb); 
    this.formGroup = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
        });
  }

  ngOnInit() {
    this.genderOptions = this.formService.getGenderOptions();
  }
}
