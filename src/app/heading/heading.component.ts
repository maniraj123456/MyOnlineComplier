import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from '../SharedComponents/dialog/dialog.component';
import { DialogWithInputComponent } from '../SharedComponents/dialog-with-input/dialog-with-input.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-heading',
  imports: [MatIconModule],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.css'
})
export class HeadingComponent {
  
  @Output() resetEvent = new EventEmitter<void>(); // Create an event emitter

   constructor(private dialog: MatDialog) {}

  triggerReset() {
      this.dialog.open(DialogComponent, {
        width: '50%',
        data: {
          title: 'Reset Project',
          message: 'Are you sure you want to reset this project?',
          confirmText: 'Reset',
          cancelText: 'Cancel'
        }
      }).afterClosed().subscribe(result => {
        if (result === true) {
          this.resetEvent.emit(); // Emit event only when confirmed
        }
      });
  
  }

  triggerSave()
  {
    this.dialog.open(DialogWithInputComponent, {
      width: '50%', 
      data: {
        title: 'Save Project', 
        message: 'Are you sure you want to save this project?', 
        confirmText: 'Save', 
        cancelText: 'Cancel', 
        control: new FormControl(''), 
        label: 'Enter Project Name',
        type:  'text',
        errorMessage: 'Project Name is required'                        
      } 
    });
  }
}


