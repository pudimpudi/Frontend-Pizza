import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Funcionario } from '../entities/funcionario';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8050/pizzatime/login';
  private loggedInUser: Funcionario | null = null;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}

  login(cpf: string, senha: string): Observable<any> {
    const cpfNumerico = cpf.replace(/\D/g, '');
    return this.http.get(`${this.apiUrl}/${cpfNumerico}/${senha}`).pipe(
      tap((response: any) => {
        if (response.success && response.funcionario) {
          this.loggedInUser = {
            id: response.funcionario.id,
            nome: response.funcionario.nome,
            email: response.funcionario.email,
            cargo: response.funcionario.cargo,
            cpf: cpfNumerico
          } as Funcionario;
          this.storageService.setItem('currentUser', JSON.stringify(this.loggedInUser));
        }
      })
    );
  }

  logout(): void {
    this.loggedInUser = null;
    this.storageService.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getCurrentUser(): Funcionario | null {
    if (!this.loggedInUser) {
      const user = this.storageService.getItem('currentUser');
      this.loggedInUser = user ? JSON.parse(user) : null;
    }
    return this.loggedInUser;
  }
}