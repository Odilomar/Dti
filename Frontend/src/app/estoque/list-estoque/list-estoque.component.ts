import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Produto } from 'src/app/interfaces/produto';
import { faPlus, faTrashAlt, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-estoque',
  templateUrl: './list-estoque.component.html',
  styleUrls: ['./list-estoque.component.css']
})


export class ListEstoqueComponent implements OnInit {

   public produtos: Produto[];
   public faPlus = faPlus;
   public faTrashAlt = faTrashAlt;
   public faEdit = faEdit;
   public faSearch = faSearch;
   codigo = '';

  constructor(
    private router: Router, 
    private apiService: ApiService, 
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

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
      this.toastr.error('Falha ao remover o produto!');
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
      this.toastr.error('Falha ao buscar o produto!');
        // alert('Falha ao buscar produto');
    });
  } else {
    this.apiService.getItems()
    .subscribe((listaprodutos: Produto[]) => {
      this.produtos = listaprodutos;
    }, () => {
      this.toastr.error('Falha ao buscar o produto!');
        // console.log('Falha ao buscar produtos');
    });
  }

  }

  existemProdutos(): boolean {
    return this.produtos && this.produtos.length > 0;
  }
}
