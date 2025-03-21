import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmailInputComponent } from '../SharedComponents/components/email/email.component';
import { PasswordInputComponent } from '../SharedComponents/components/password/password.component';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { User } from '../SharedComponents/models/user.model';

@Component({
  selector: 'app-login',
  imports: [
    PasswordInputComponent,
    EmailInputComponent,
    MatButtonModule,
    ReactiveFormsModule
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
    private router: Router,
    private apiService: ApiService
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
      this.apiService.getUserByEmail(this.formGroup.value.email).subscribe((data : User | Error) => {
        console.log(data);
        if(!this.isUser(data) && data.message == "no users")
        {
          alert('NO register users, please sign up');
          this.formGroup.reset();
          this.router.navigate(['/signup']);
        }
        if(!this.isUser(data) && data.message == "invalid email")
        {
          alert('Invalid email');
          this.formGroup.reset();
        }
        else if(this.isUser(data) && data.password === this.formGroup.value.password && data.email === this.formGroup.value.email) {
          this.router.navigate(['/editor'], {
              queryParams: { userId: data.userId , userName : data.fullName}
          });
        }
        else
        {
          alert('Invalid email or password');
          this.formGroup.reset();
        }  
      });
    }
  }

  private isUser(data: User | Error): data is User {
    return (data as User).password !== undefined && (data as User).email !== undefined;
  }
}
