import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from '../SharedComponents/components/dialog/dialog.component';
import { DialogWithInputComponent } from '../SharedComponents/components/dialog-with-input/dialog-with-input.component';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { ProjectsListComponent } from '../projects-list/projects-list.component';
import { ApiService } from '../Services/api.service';
import { Project } from '../SharedComponents/models/project.model';

@Component({
  selector: 'app-heading',
  imports: [MatIconModule, MatButtonModule, MatBottomSheetModule],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.css',
})
export class HeadingComponent {
  @Input() htmlCode: string = '';

  @Input() cssCode: string = '';

  @Input() jsCode: string = '';

  @Input() userId!: number;

  @Input() userName: string = '';

  @Output() resetEvent = new EventEmitter<void>();

  projects: Array<{
    projectID: number;
    projectName: string;
    html: string;
    css: string;
    js: string;
  }> = [];

  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getUserProjects(this.userId).subscribe(
      (data: Project[]) => {
        this.projects = data;
      },
      (error: any) => {
        this.projects = [];
      }
    );
  }

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
    this.dialog
      .open(DialogWithInputComponent, {
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
      })
      .afterClosed()
      .subscribe((data) => {
        if (
          data.confirm &&
          this.htmlCode !== '' &&
          this.cssCode !== '' &&
          this.jsCode !== ''
        ) {
          const query = {
            projectID : 0,
            html: this.htmlCode,
            css: this.cssCode,
            js: this.jsCode,
            userId: this.userId,
            projectName: data.value,
          };
          this.apiService.createProject(query).subscribe(data => {
              console.log(data)
          });
        } else {
        }
      });
  }

  triggerBottomsheet() {
    this.bottomSheet
      .open(ProjectsListComponent, {
        data: { projects: this.projects },
      })
      .afterDismissed()
      .subscribe((data) => {
        if (data.project) {
          if (data.status === 'edit') {
            console.log('edit');
          }
          if (data.status === 'delete') {
            console.log('delete');
            /* trigger delete api */
          }
        }
      });
  }
}
