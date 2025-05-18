import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../entities/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private baseUrl = 'http://localhost:8050/pizzatime/produtos';

  constructor(private http: HttpClient) {}

  findAllProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl);
  }

  adicionarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.baseUrl, produto);
  }

  atualizarProduto(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.baseUrl}/${id}`, produto);
  }

  apagarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}