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
export class LoginPageService {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return  this.fb.group({
      name: new FormControl('given name', [
        Validators.required,
        Validators.minLength(5),
      ]) as FormControl,
      email: new FormControl('sample@gmail.com', [
        Validators.required,
        Validators.email,
      ]) as FormControl,
      password: new FormControl('sample', [
        Validators.required,
        Validators.minLength(6),
      ]) as FormControl,
    });
  }
}
