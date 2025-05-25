import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../entities/produto';

@Component({
  selector: 'app-landing-page',
  standalone:false,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  pizzasSalgadas: Produto[] = [];
  pizzasDoces: Produto[] = [];
  bebidas: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.findAllProdutos().subscribe({
      next: (produtos) => {
        this.pizzasSalgadas = produtos.filter(p => p.categoria.toLowerCase().includes('salgada'));
        this.pizzasDoces = produtos.filter(p => p.categoria.toLowerCase().includes('doce'));
        this.bebidas = produtos.filter(p => p.categoria.toLowerCase().includes('bebida'));
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
      }
    });
  }
}