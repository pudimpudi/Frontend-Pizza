import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../entities/funcionario';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
    private baseUrl = 'http://localhost:8050/pizzatime/funcionarios';

    constructor(private http: HttpClient) { }

    findAllFuncionarios(): Observable<Funcionario[]> {
        return this.http.get<Funcionario[]>(this.baseUrl);
    }

    adicionarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
        return this.http.post<Funcionario>(this.baseUrl, funcionario);
    }

    atualizarFuncionario(id: number, funcionario: Funcionario): Observable<Funcionario> {
        return this.http.put<Funcionario>(`${this.baseUrl}/${id}`, funcionario);
    }

    apagarFuncionario(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

}