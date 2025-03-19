import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OutputComponent } from '../output/output.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HeadingComponent } from '../heading/heading.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DialogComponent } from '../SharedComponents/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    FormsModule,
    OutputComponent,
    HeadingComponent,
  ],
})
export class EditorComponent {
  htmlCode: string = '';
  cssCode: string = '';
  jsCode: string = '';

  items: { option: string; values: string[] }[] = [
    { option: 'option1', values: ['value1', 'value2', 'value3'] },
    { option: 'option2', values: ['value4', 'value5', 'value6'] },
  ];

  constructor(private dialog: MatDialog) {}

  generateOutput() {
    // Trigger output rendering in child component
  }

  resetEditor() {
    this.htmlCode = '';
    this.cssCode = '';
    this.jsCode = '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Item',
        message: 'Are you sure you want to delete this item?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Confirmed!');
      } else {
        console.log('Cancelled!');
      }
    });
  }
}
