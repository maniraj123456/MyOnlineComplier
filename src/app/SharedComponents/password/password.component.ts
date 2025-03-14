import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-password-input',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,  
    MatIconModule
  ],
})
export class PasswordInputComponent {
    @Input() control!: FormControl<any>;
    @Input() label!: string;
    @Input() type: string = 'password';
    @Input() placeholder: string = '';
    @Input() errorMessage: string = 'This field is required';
    @Input() hidePassword: boolean = true;
}
