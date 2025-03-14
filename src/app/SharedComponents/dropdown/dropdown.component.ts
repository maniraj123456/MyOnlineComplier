import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,  
    MatIconModule,
    MatOptionModule
  ]
})
export class DropdownFieldComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() options: { value: any; label: string }[] = [];
  @Input() errorMessage: string = 'This field is required';
}

