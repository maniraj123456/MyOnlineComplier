import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OutputComponent } from '../output/output.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HeadingComponent } from '../heading/heading.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DialogComponent } from '../SharedComponents/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../Services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../SharedComponents/models/project.model';

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

  isEdit: boolean = false;

  userName: string = '';

  userId!: number;

  projectID!: number;

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      (this.userName = params['userName']), (this.userId = params['userId']);
    });
  }

  resetEditor($data : {isEdit:boolean , project : any | null}) {
    if (this.isEdit && $data.project as Project) {
      this.htmlCode = $data.project?.html || '';
      this.cssCode = $data.project?.css || '';
      this.jsCode = $data.project?.js || '';
      this.projectID = $data.project?.projectId ?? 0;
    } else {
      this.htmlCode = '';
      this.cssCode = '';
      this.jsCode = '';
    }
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

  editEditor($data: { project: any; status: string }) {
    this.isEdit = true;
    this.htmlCode = $data.project.html;
    this.cssCode = $data.project.css;
    this.jsCode = $data.project.js;
    this.projectID = $data.project.projectId;
  }
}
