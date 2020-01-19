import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Produto } from 'src/app/interfaces/produto';


@Component({
  selector: 'app-list-estoque',
  templateUrl: './list-estoque.component.html',
  styleUrls: ['./list-estoque.component.css']
})


export class ListEstoqueComponent implements OnInit {

   public produtos: Produto[];
   codigo = '';

  constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getListaProdutos();
  }

  getListaProdutos() {
    this.apiService.getItems()
    .subscribe((listaprodutos: Produto[]) => {
      this.produtos = listaprodutos;
    }, () => {
        console.log('Falha ao buscar produtos');
    });
  }

  deletaProduto(id: number) {
    this.apiService.deletaItem(id)
    .subscribe(() => {
      this.getListaProdutos();
    }, () => {
        console.log('Falha ao deletar produtos');
    });
  }

  getItem(codigo: any) {
    const cont = codigo.length;
    if (cont !== 0) {
    this.apiService.getItem(codigo)
    .subscribe((listaprodutos: Produto) => {
      this.produtos = [];
      this.produtos[0] = listaprodutos;
    }, () => {
        alert('Falha ao buscar produto');
    });
  } else {
    this.apiService.getItems()
    .subscribe((listaprodutos: Produto[]) => {
      this.produtos = listaprodutos;
    }, () => {
        console.log('Falha ao buscar produtos');
    });
  }

  }

  existemProdutos(): boolean {
    return this.produtos && this.produtos.length > 0;
  }
}
