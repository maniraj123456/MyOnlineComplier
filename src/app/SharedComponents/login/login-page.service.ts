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

  getGenderOptions() {
    const genders:{ value: any; label: string }[] = [
      { value: 0, label: 'Male' },
      { value: 1, label: 'Female' },
      { value: 2, label: 'Other' }
    ]
    return genders;
  }

  createForm(): FormGroup {
    return  this.fb.group({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      gender: new FormControl(),
    });
  }
}
