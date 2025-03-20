import { CommonModule } from '@angular/common';
import { Component, Inject, EventEmitter, Output } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  imports:[
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class DialogComponent {
  
  @Output() confirm = new EventEmitter<void>();
  
  @Output() cancel = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; confirmText?: string; cancelText?: string }
  ) {}

  onConfirm(): void {
    this.confirm.emit();
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.cancel.emit();
    this.dialogRef.close(false);
  }
}

