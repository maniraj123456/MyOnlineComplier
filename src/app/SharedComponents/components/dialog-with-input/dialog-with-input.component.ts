import { CommonModule } from '@angular/common';
import { Component, Inject, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-with-input.component.html',
  styleUrls: ['./dialog-with-input.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class DialogWithInputComponent {

  @Output() confirm = new EventEmitter<void>();

  @Output() cancel = new EventEmitter<void>();

  constructor(
    
    public dialogRef: MatDialogRef<DialogWithInputComponent>,

    @Inject(MAT_DIALOG_DATA)

    public data: {
      placeholder: string;
      title: string;
      message: string;
      confirmText?: string;
      cancelText?: string;

      control: FormControl<any>;
      label?: string;
      type: string | 'text';
      errorMessage?: string | 'This field is required';
    }
  ) {}

  onConfirm(): void {
    if(this.data.control.value !== ''){
      this.confirm.emit();
      this.dialogRef.close({value : this.data.control.value , confirm : true});
    }
    else{
      this.data.control.setErrors({required: true});
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.dialogRef.close({value : null , confirm : false});
  }
}
