import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
    // Simulate login logic (e.g., store token)
  }

  logout() {
    this.isLoggedIn = false;
    // Simulate logout logic (e.g., clear token)
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
