import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Project } from '../SharedComponents/models/project.model';

@Component({
  standalone: true,
  imports: [MatListModule, MatIcon],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css',
})
export class ProjectsListComponent {
  
  @Output() edit = new EventEmitter<void>();
    
  @Output() delete = new EventEmitter<void>();

  projects: Array<Project> = [];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ProjectsListComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { projects: Array<Project> }
  ) {
    this.projects = data.projects;
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  showInfo(project : Project)
  {

  }

  editInfo(project : Project)
  {
    const data = {project : project , status : 'edit'};
    this.edit.emit();
    this.bottomSheetRef.dismiss(data);
  }

  deleteInfo(project : Project)
  {
    const data = {project : project , status : 'delete'};
    this.delete.emit();
    this.bottomSheetRef.dismiss(data);
  }
}
