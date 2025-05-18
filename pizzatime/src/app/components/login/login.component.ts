import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    cpf: '',
    senha: ''
  };

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.login(this.credentials.cpf, this.credentials.senha).subscribe({
      next: (response) => {
        this.router.navigate(['/produtos']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.errorMessage = 'CPF ou senha incorretos';
      }
    });
  }
}