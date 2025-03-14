import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-email-input',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  imports: [    
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,  
      MatIconModule]
})
export class EmailInputComponent {
  @Input() control!: FormControl<any>;
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = 'This field is required';
}

