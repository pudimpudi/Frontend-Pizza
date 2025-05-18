import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../entities/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario-read',
  standalone: false,
  templateUrl: './usuario-read.component.html',
  styleUrl: './usuario-read.component.css'
})
export class UsuarioReadComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  novoFuncionario: Funcionario = {
    nome: '',
    cargo: '',
    email: '',
    cpf: '',
    senha: ''
  };

  funcionarioEditando: Funcionario | null = null;
  cargos: string[] = ['Administrador', 'Funcionario'];
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  modoEdicao: boolean = false;

  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    // Cálculo do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) {
      return false;
    }

    // Cálculo do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  }

  ngOnInit(): void {
    this.listarFuncionarios();
  }

  constructor(private funcionarioService: FuncionarioService) {
    this.listarFuncionarios();
  }

  listarFuncionarios(): void {
    this.funcionarioService.findAllFuncionarios().subscribe({
      next: (dados) => {
        // garante que sera um array
        this.funcionarios = dados || [];
        // mostra mensagem quando nao houver funcionarios:
        if (this.funcionarios.length === 0) {
          this.mensagemSucesso = 'Nenhum funcionario cadastrado ainda.';
        } else {
          this.mensagemSucesso = '';
        }
      },
      error: (erro) => {
        // se a API retornar 404 ou outro erro
        if (erro.status === 404) {
          this.funcionarios = [];
          this.mensagemSucesso = 'Nenhum funcionario cadastrado ainda.';
        } else {
          console.error('Erro ao carregar funcionarios:', erro);
          this.mensagemErro = 'Erro ao carregar funcionarios. Tente novamente mais tarde.';
        }
      }
    });
  }

  adicionarFuncionario(formFuncionario: NgForm): void {
    // verifica se o formulário é válido
    if (formFuncionario.invalid) {
      this.mensagemErro = 'Por favor, preencha todos os campos corretamente.';
      this.mensagemSucesso = '';
      return;
    }

    // verifica se o cpf é valido
    const cpfLimpo = this.novoFuncionario.cpf.replace(/\D/g, '');
    if (!this.validarCPF(cpfLimpo)) {
      this.mensagemErro = 'CPF inválido. Por favor, insira um CPF válido.';
      this.mensagemSucesso = '';
      return;
    }

    // limpa mensagens anteriores
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    // chama o serviço para adicionar
    this.funcionarioService.adicionarFuncionario(this.novoFuncionario).subscribe({
      next: (funcionarioAdicionado) => {
        this.mensagemSucesso = `Funcionario "${funcionarioAdicionado.nome}" adicionado com sucesso!`;

        // atualiza a lista
        this.listarFuncionarios();

        // reseta o formulário
        this.resetarForm(formFuncionario);

        // rolagem automática para a tabela
        setTimeout(() => {
          const tabela = document.querySelector('.tabela-container');
          tabela?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      },
      error: (erro) => {
        console.error('Erro ao adicionar funcionario:', erro);
        this.mensagemErro = 'Erro ao adicionar funcionario. Tente novamente mais tarde.';
      }
    });
  }

  private resetarForm(formFuncionario: NgForm): void {
    formFuncionario.resetForm();
    this.novoFuncionario = {
      nome: '',
      cargo: '',
      email: '',
      cpf: '',
      senha: ''
    };
  }

  editarFuncionario(funcionario: Funcionario): void {
    this.funcionarioEditando = { ...funcionario };
    this.modoEdicao = true;
  }

  cancelarEdicao(): void {
    this.funcionarioEditando = null;
    this.modoEdicao = false;
    this.mensagemErro = '';
    this.mensagemSucesso = '';
  }

  salvarEdicao(): void {
    if (!this.funcionarioEditando || !this.funcionarioEditando.id) return;

    const cpfLimpo = this.funcionarioEditando.cpf.replace(/\D/g, '');
    if (!this.validarCPF(cpfLimpo)) {
      this.mensagemErro = 'CPF inválido. Por favor, insira um CPF válido.';
      return;
    }

    this.funcionarioService.atualizarFuncionario(this.funcionarioEditando.id, this.funcionarioEditando).subscribe({
      next: (funcionarioAtualizado) => {
        this.mensagemSucesso = 'Funcionario atualizado com sucesso!';
        this.mensagemErro = '';
        this.modoEdicao = false;
        this.funcionarioEditando = null;
        this.listarFuncionarios();
      },
      error: (erro) => {
        console.error('Erro ao atualizar funcionario:', erro);
        this.mensagemErro = 'Erro ao atualizar funcionario. Verifique os dados e tente novamente.';
        this.mensagemSucesso = '';
      }
    });
  }

  excluirFuncionario(id: number | undefined): void {
    if (!id) return;
    if (confirm('Tem certeza que deseja excluir o funcionario?')) {
      this.funcionarioService.apagarFuncionario(id).subscribe({
        next: () => {
          this.mensagemSucesso = 'Funcionario excluido com sucesso!';
          this.mensagemErro = '';
          this.listarFuncionarios();
        },
        error: (error) => {
          console.error('Erro ao excluir funcionario:', error);
          this.mensagemErro = 'Erro ao excluir funcionario. Tente novamente mais tarde.';
          this.mensagemSucesso = '';
        }
      });
    }
  }
}
