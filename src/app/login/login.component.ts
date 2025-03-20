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
      this.apiService.getUserByEmail(this.formGroup.value.email).subscribe((data) => {
        console.log(data);
        if(data.password === this.formGroup.value.password) {
          this.router.navigate(['/editor']);
        }
      });
    }
  }
}
