import { Injectable } from '@angular/core';
import { Project } from '../SharedComponents/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects: Array<Project> = [];

  constructor() {
    this.projects = [
      {
        projectID: 1,
        projectName: 'Project 1',
        html: '<h1>Hello World</h1>',
        css: 'h1 { color: red; }',
        js: 'console.log("Hello World");',
      },
      {
        projectID: 2,
        projectName: 'Project 2',
        html: '<h1>Hello World</h1>',
        css: 'h1 { color: red; }',
        js: 'console.log("Hello World");',
      },
      {
        projectID: 3,
        projectName: 'Project 3',
        html: '<h1>Hello World</h1>',
        css: 'h1 { color: red; }',
        js: 'console.log("Hello World");',
      },
      {
        projectID: 4,
        projectName: 'Project 4',
        html: '<h1>Hello World</h1>',
        css: 'h1 { color: red; }',
        js: 'console.log("Hello World");',
      },
      {
        projectID: 5,
        projectName: 'Project 5',
        html: '<h1>Hello World</h1>',
        css: 'h1 { color: red; }',
        js: 'console.log("Hello World");',
      },
      {
        projectID: 6,
        projectName: 'Project 6',
        html: '<h1>Hello World</h1>',
        css: 'h1 { color: red; }',
        js: 'console.log("Hello World");',
      },
    ];
  }

  getProjects() {
    return this.projects;
  }
}
