import { ChangeDetectorRef, Component } from '@angular/core';
import { InputFieldComponent } from '../SharedComponents/input-field/input-field.component';
import { PasswordInputComponent } from '../SharedComponents/password/password.component';
import { EmailInputComponent } from '../SharedComponents/email/email.component';
import { DropdownFieldComponent } from '../SharedComponents/dropdown/dropdown.component';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SigninPageService } from '../Services/signin-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    InputFieldComponent,
    PasswordInputComponent,
    EmailInputComponent,
    DropdownFieldComponent,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  gender: string = '';
  formGroup!: FormGroup<any>;
  genderOptions: { value: any; label: string }[] = [];

  constructor(
    private formService: SigninPageService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.formService = new SigninPageService(this.fb);

    this.formGroup = this.formService.createForm();
  }

  ngOnInit() {
    this.genderOptions = this.formService.getGenderOptions();
  }

  onGenderChange($event: any) {
    console.log($event);
  }
  onSubmit() {
    this.gender =
      this.genderOptions[this.formGroup.controls['gender'].value].label;
    if (this.formGroup.valid && this.gender !== '') {
      this.router.navigate(['/login']);
      console.log('Form submitted successfully');
    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
