import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Import Models
import { Project } from '../../app/SharedComponents/models/project.model';
import { User } from '../SharedComponents/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl = 'https://localhost:7072/api';

  constructor(private http: HttpClient) {}

  // Headers (Optional: Use only if needed for authorization)
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /** ---------------------- USERS API ---------------------- **/

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Get user by ID
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  // ✅ Fixed: Get user by Email (Changed `email: number` → `email: string`)
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/email/${email}`);
  }

  // Create a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user, this.httpOptions);
  }

  /** ---------------------- PROJECTS API ---------------------- **/

  // Get all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  // Get a project by ID
  getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/project/${projectId}`);
  }

  // Get all projects for a specific user
  getUserProjects(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects/user/${userId}`);
  }

  // Create a new project
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project, this.httpOptions);
  }

  // Update an existing project
  updateProject(projectId: number, project: Project): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/projects/${projectId}`, project, this.httpOptions);
  }

  // Delete a project
  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${projectId}`);
  }
}

