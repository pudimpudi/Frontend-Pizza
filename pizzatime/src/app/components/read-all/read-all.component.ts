import { Component, OnInit } from '@angular/core';
import { Produto } from '../../entities/produto';
import { ProdutoService } from '../../services/produto.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-read-all',
  standalone: false,
  templateUrl: './read-all.component.html',
  styleUrl: './read-all.component.css'
})
export class ReadAllComponent implements OnInit {
  produtos: Produto[] = [];
  novoProduto: Produto = {
    nome: '',
    descricao: '',
    preco: 0,
    categoria: ''
  };
  produtoEditando: Produto | null = null;
  categorias: string[] = ['Salgada', 'Combo', 'Bebida', 'Doce'];
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  modoEdicao: boolean = false;

  ngOnInit(): void {
    this.listarProdutos();
  }

  constructor(private produtoService: ProdutoService) {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.produtoService.findAllProdutos().subscribe({
      next: (dados) => {
        
        this.produtos = dados || [];

        
        if (this.produtos.length === 0) {
          this.mensagemSucesso = 'Nenhum produto cadastrado ainda.';
        } else {
          this.mensagemSucesso = '';
        }
      },
      error: (erro) => {
        
        if (erro.status === 404) {
          this.produtos = [];
          this.mensagemSucesso = 'Nenhum produto cadastrado ainda.';
        } else {
          console.error('Erro ao carregar produtos:', erro);
          this.mensagemErro = 'Erro ao carregar produtos. Tente novamente mais tarde.';
        }
      }
    });
  }

  adicionarProdutos(formProduto: NgForm): void {

    if (formProduto.invalid) {
      this.mensagemErro = 'Por favor, preencha todos os campos corretamente.';
      this.mensagemSucesso = '';
      return;
    }

    if (this.novoProduto.preco <= 0) {
      this.mensagemErro = 'O preço deve ser maior que zero.';
      this.mensagemSucesso = '';
      return;
    }

    this.mensagemErro = '';
    this.mensagemSucesso = '';

    this.produtoService.adicionarProduto(this.novoProduto).subscribe({
      next: (produtoAdicionado) => {
        this.mensagemSucesso = `Produto "${produtoAdicionado.nome}" adicionado com sucesso!`;

        this.listarProdutos();

        this.resetarForm(formProduto);

        setTimeout(() => {
          const tabela = document.querySelector('.tabela-container');
          tabela?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      },
      error: (erro) => {
        console.error('Erro ao adicionar produto:', erro);
        this.mensagemErro = erro.error?.message || 'Erro ao adicionar produto. Tente novamente.';
      }
    });
  }

  private resetarForm(formProduto: NgForm): void {
    formProduto.resetForm();
    this.novoProduto = {
      nome: '',
      descricao: '',
      preco: 0,
      categoria: ''
    };
  }

  editarProduto(produto: Produto): void {
    this.produtoEditando = { ...produto };
    this.modoEdicao = true;
  }

  cancelarEdicao(): void {
    this.produtoEditando = null;
    this.modoEdicao = false;
    this.mensagemErro = '';
    this.mensagemSucesso = '';
  }

  salvarEdicao(): void {
    if (!this.produtoEditando || !this.produtoEditando.id) return;

    this.produtoService.atualizarProduto(this.produtoEditando.id, this.produtoEditando).subscribe({
      next: (produtoAtualizado) => {
        this.mensagemSucesso = 'Produto atualizado com sucesso!';
        this.mensagemErro = '';
        this.modoEdicao = false;
        this.produtoEditando = null;
        this.listarProdutos();
      },
      error: (erro) => {
        console.error('Erro ao atualizar produto:', erro);
        this.mensagemErro = 'Erro ao atualizar produto. Verifique os dados e tente novamente.';
        this.mensagemSucesso = '';
      }
    });
  }


  excluirProduto(id: number | undefined): void {
    if (!id) return;
    if (confirm('Tem certeza que deseja excluir o produto?')) {
      this.produtoService.apagarProduto(id).subscribe({
        next: () => {
          this.mensagemSucesso = 'Produto excluido com sucesso!';
          this.mensagemErro = '';
          this.listarProdutos();
        },
        error: (error) => {
          console.error('Erro ao excluir produto:', error);
          this.mensagemErro = 'Erro ao excluir produto. Tente novamente mais tarde.';
          this.mensagemSucesso = '';
        }
      });
    }
  }
}