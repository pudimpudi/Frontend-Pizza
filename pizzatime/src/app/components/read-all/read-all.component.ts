import { Component, OnInit } from '@angular/core';
import { Produto } from '../../entities/produto';
import { ProdutoService } from '../../components/services/produto.service';

@Component({
  selector: 'app-read-all',
  standalone: false,
  templateUrl: './read-all.component.html',
  styleUrl: './read-all.component.css'
})
export class ReadAllComponent implements OnInit{
  produtos: Produto[] = [];
  novoProduto: Produto = {
    nome: '',
    descricao: '',
    preco: 0,
    categoria: ''
  };

  ngOnInit(): void {
    this.listarProdutos();
  }

  constructor(private produtoService: ProdutoService) {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.produtoService.findAllProdutos().subscribe((dados) => {
      this.produtos = dados;
    });
  }

  adicionarProdutos(): void {
    
  }

  editarProduto(produto: Produto): void {
    // implemente a lógica de edição aqui
    console.log('Editar:', produto);
  }

  excluirProduto(id: number | undefined): void {
    if (!id) return;
    this.produtoService.apagarProduto(id).subscribe(() => {
      this.listarProdutos();
    });
  }
}