import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    // Simulação de autenticação - Substitua por chamada real à API
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/login-adm']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}