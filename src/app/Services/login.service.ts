import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    
    return this.fb.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
    });

  }
}
