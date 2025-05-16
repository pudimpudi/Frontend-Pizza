import { Component, OnInit } from '@angular/core';
import { Produto } from '../../entities/produto';

@Component({
  selector: 'app-read-all',
  standalone: false,
  templateUrl: './read-all.component.html',
  styleUrl: './read-all.component.css'
})
export class ReadAllComponent implements OnInit{
  list: Produto[] = [];
  constructor() { }

  ngOnInit(): void { }
  
}
