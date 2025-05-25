// produtocard.component.ts
import { Component, Input } from '@angular/core';
import { Produto } from '../../entities/produto';

@Component({
  selector: 'app-produtocard',
  standalone: false,
  templateUrl: './produtocard.component.html',
  styleUrls: ['./produtocard.component.css']
})
export class ProdutocardComponent {
  @Input() produto!: Produto;
}