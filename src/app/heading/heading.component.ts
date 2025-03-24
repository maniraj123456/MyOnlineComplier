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
  @Input() isEdit: boolean = false;

  @Input() htmlCode: string = '';

  @Input() cssCode: string = '';

  @Input() jsCode: string = '';

  @Input() userId!: number;

  @Input() userName: string = '';

  @Input() projectId!: number;

  @Output() resetEvent = new EventEmitter<{
    isEdit: boolean;
    project: Project | null;
  }>();

  @Output() editEvent = new EventEmitter<{
    project: Project;
    status: string;
  }>();

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
    this.getProjects();
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
        console.log(result);
        if (this.isEdit && result) {
          this.apiService
            .getProject(this.projectId)
            .subscribe((projectDetails) => {
              this.htmlCode = projectDetails.html;
              this.cssCode = projectDetails.css;
              this.jsCode = projectDetails.js;
              this.resetEvent.emit({
                isEdit: this.isEdit,
                project: projectDetails,
              });
            });
        } else {
          if (result === true) {
            this.resetEvent.emit({ isEdit: this.isEdit, project: null }); // Emit event only when confirmed
          }
        }
      });
  }

  triggerSave() {
    if (this.isEdit) {
      this.dialog
        .open(DialogWithInputComponent, {
          width: '50%',
          data: {
            title: 'Save Project',
            message: 'Are you sure you want to save this changes?',
            confirmText: 'Save',
            cancelText: 'Cancel',
            isInput: false,
            control: new FormControl(''),
            label: 'Enter Project Name',
            type: 'text',
            errorMessage: 'Project Name is required',
          },
        })
        .afterClosed()
        .subscribe((data) => {
          /* updating a project */
          if (data.confirm) {
            let projectName: string = '';
            this.apiService
              .getProject(this.projectId)
              .subscribe((projectDetails) => {
                projectName = projectDetails.projectName;
                const queryParam = {
                  projectID: this.projectId,
                  html: this.htmlCode,
                  css: this.cssCode,
                  js: this.jsCode,
                  projectName: projectName,
                  userId: this.userId,
                };
                this.apiService
                  .updateProject(this.projectId, queryParam)
                  .subscribe(
                    (data) => {
                      console.log(data);
                      this.isEdit = false;
                      this.resetEvent.emit({
                        isEdit: this.isEdit,
                        project: null,
                      });
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
              });
          }
        });
    } else {
      if (this.htmlCode === '' && this.cssCode === '' && this.jsCode === '') {
        alert('html , css , js all are empty');
      } else {
        this.dialog
          .open(DialogWithInputComponent, {
            width: '50%',
            data: {
              title: 'Save Project',
              message: 'Are you sure you want to save this project?',
              confirmText: 'Save',
              cancelText: 'Cancel',
              isInput: true,
              control: new FormControl(''),
              label: 'Enter Project Name',
              type: 'text',
              errorMessage: 'Project Name is required',
            },
          })
          .afterClosed()
          .subscribe((data) => {
            /* creating a project */
            console.log(data);
            if (
              data.confirm &&
              (this.htmlCode !== '' ||
                this.cssCode !== '' ||
                this.jsCode !== '')
            ) {
              const query = {
                projectID: 0,
                html: this.htmlCode,
                css: this.cssCode,
                js: this.jsCode,
                userId: this.userId,
                projectName: data.value,
              };
              console.log(query);
              this.apiService.createProject(query).subscribe((data) => {
                console.log(data);
              });
            }
          });
      }
    }
  }

  triggerBottomsheet() {
    this.getProjects();
    this.bottomSheet
      .open(ProjectsListComponent, {
        data: { projects: this.projects },
      })
      .afterDismissed()
      .subscribe((data) => {
        if (data.project) {
          if (data.status === 'edit') {
            this.isEdit = true;
            this.projectId = data.project.projectId;
            this.editEvent.emit({ project: data.project, status: 'edit' });
          }
          if (data.status === 'delete') {
            console.log('delete', data);
            /* trigger delete api */
            console.log(data.project.projectId);
            this.apiService
              .deleteProject(data.project.projectId)
              .subscribe((data) => {
                this.getProjects();
              });
          }
        }
      });
  }

  private getProjects() {
    this.apiService.getUserProjects(this.userId).subscribe(
      (data: Project[]) => {
        this.projects = data;
      },
      (error: any) => {
        this.projects = [];
      }
    );
  }
}
