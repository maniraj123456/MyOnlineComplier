import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from '../SharedComponents/components/dialog/dialog.component';
import { DialogWithInputComponent } from '../SharedComponents/components/dialog-with-input/dialog-with-input.component';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-heading',
  imports: [MatIconModule, MatButtonModule, MatBottomSheetModule],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.css',
})
export class HeadingComponent {

  @Input() projects: Array<{ projectID: number ,projectName: string , html : string , css : string ,js : string}> = []; 

  @Output() resetEvent = new EventEmitter<void>(); // Create an event emitter

  constructor(private dialog: MatDialog,private bottomSheet:MatBottomSheet) {}

  triggerReset() {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
        data: {
          title: 'Reset Project',
          message: 'Are you sure you want to reset this project?',
          confirmText: 'Reset',
          cancelText: 'Cancel',
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.resetEvent.emit(); // Emit event only when confirmed
        }
      });
  }

  triggerSave() {
    this.dialog.open(DialogWithInputComponent, {
      width: '50%',
      data: {
        title: 'Save Project',
        message: 'Are you sure you want to save this project?',
        confirmText: 'Save',
        cancelText: 'Cancel',
        control: new FormControl(''),
        label: 'Enter Project Name',
        type: 'text',
        errorMessage: 'Project Name is required',
      },
    });
  }

  triggerBottomsheet() {
    this.bottomSheet.open(BottomSheetComponent);
  }
}
