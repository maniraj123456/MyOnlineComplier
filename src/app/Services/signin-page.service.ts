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
export class SigninPageService {
  
  constructor(private fb: FormBuilder) {}

  getGenderOptions() {
    const genders: { value: any; label: string }[] = [
      { value: 0, label: 'Male' },
      { value: 1, label: 'Female' },
      { value: 2, label: 'Other' },
    ];
    return genders;
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }
}
