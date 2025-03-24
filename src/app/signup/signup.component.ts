import { ChangeDetectorRef, Component } from '@angular/core';
import { InputFieldComponent } from '../SharedComponents/components/input-field/input-field.component';
import { PasswordInputComponent } from '../SharedComponents/components/password/password.component';
import { EmailInputComponent } from '../SharedComponents/components/email/email.component';
import { DropdownFieldComponent } from '../SharedComponents/components/dropdown/dropdown.component';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SigninPageService } from '../Services/signin-page.service';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { User } from '../SharedComponents/models/user.model';

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
    private router: Router,
    private apiService: ApiService
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
      const query = {
        userId : 0,
        fullName: this.formGroup.controls['name'].value,
        email: this.formGroup.controls['email'].value,
        gender: this.formGroup.controls['gender'].value,
        password: this.formGroup.controls['password'].value,
      };  
      console.log(query);
      this.apiService.createUser(query).subscribe((data : User | Error) => {
        if(this.isUser(data) && data.userId > 0)
        {
          alert('user has been created successfully');
          this.router.navigate(['/login']);
        }
        else if(!this.isUser(data) && data.message === 'User with this email already exists.')
        {
          alert('User with this email already exists.')
        }
      });
      
      console.log('Form submitted successfully');
    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  private isUser(data: User | Error): data is User {
    return (data as User).password !== undefined && (data as User).email !== undefined;
  }
}
