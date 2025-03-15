import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-email-input',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  imports: [    
      CommonModule,
      ReactiveFormsModule,
      MatInputModule,
      MatInput,
      MatIconModule]
})
export class EmailInputComponent {
  
  @Input() control!: FormControl<any>;
  
  @Input() label!: string;
  
  @Input() type: string = 'email';
  
  @Input() placeholder: string = '';
  
  @Input() errorMessage: string = 'This field is required';

  @Input() required: boolean = false;

  @Input() disabled: boolean = false;
  
  @Input() readonly: boolean = false;

  @Input() prefixIcon: string = 'email';

  @Input() suffixIcon: string = '';

  @Input() autofocus: boolean = false;
}

