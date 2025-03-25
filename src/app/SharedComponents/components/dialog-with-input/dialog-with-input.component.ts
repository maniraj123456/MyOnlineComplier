import { CommonModule } from '@angular/common';
import { Component, Inject, EventEmitter, Output, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-with-input.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class DialogWithInputComponent {

  @Output() confirm = new EventEmitter<void>();

  @Output() cancel = new EventEmitter<void>();

  isLoading:boolean = false;

  constructor(
    
    public dialogRef: MatDialogRef<DialogWithInputComponent>,

    @Inject(MAT_DIALOG_DATA)

    public data: {
      placeholder: string;
      title: string;
      message: string;
      confirmText?: string;
      cancelText?: string;
      isInput: boolean;
      control: FormControl<any>;
      label?: string;
      type: string | 'text';
      errorMessage?: string | 'This field is required';
    },

    private cdr: ChangeDetectorRef
  ) {}

  onConfirm(): void {
  if (this.data.isInput) {
    if (this.data.control.value !== '') {
      this.showSpinner();
      setInterval(()=>{
        this.confirm.emit();
        this.dialogRef.close({ value: this.data.control.value, confirm: true });
      },1000);
    } else {
      this.data.control.setErrors({ required: true });
    }
  } else {
    this.showSpinner();
    setInterval(()=>{
      this.confirm.emit()
      this.dialogRef.close({ value: null, confirm: true });
    },1000);
  }
}


  onCancel(): void {
    this.cancel.emit();
    this.dialogRef.close({value : null , confirm : false});
  }

  private showSpinner() {
    this.isLoading = true;
    this.cdr.detectChanges(); 

    setTimeout(() => {
      console.log('close spinner');
      this.isLoading = false;
      this.cdr.detectChanges(); 
    }, 1000);
  }
  
}
