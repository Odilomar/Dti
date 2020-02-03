import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Produto } from 'src/app/interfaces/produto';
import { faPlus, faTrashAlt, faEdit, faSearch, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-estoque',
  templateUrl: './list-estoque.component.html',
  styleUrls: ['./list-estoque.component.css']
})


export class ListEstoqueComponent implements OnInit {

   public lstProdutos: Produto[];
   public produtos: Produto[];
   public counMaxPage: number;
   public currentPage: number;
   public codigo = '';

   public faPlus = faPlus;
   public faTrashAlt = faTrashAlt;
   public faEdit = faEdit;
   public faSearch = faSearch;
   public faChevronRight = faChevronRight
   public faChevronLeft = faChevronLeft;
   

  constructor(
    private router: Router, 
    private apiService: ApiService, 
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.counMaxPage = 0;
    this.currentPage = 1;
    this.getListaProdutos();
  }

  getListaProdutos() {
    this.apiService.getItems()
    .subscribe((listaprodutos: Produto[]) => {
      this.lstProdutos = listaprodutos;
      this.changePage();
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
      this.lstProdutos[0] = listaprodutos;
      this.changePage();
    }, () => {
      this.toastr.error('Falha ao buscar o produto!');
        // alert('Falha ao buscar produto');
    });
  } else {
    this.apiService.getItems()
    .subscribe((listaprodutos: Produto[]) => {
      this.lstProdutos = listaprodutos;
      this.changePage();
    }, () => {
      this.toastr.error('Falha ao buscar o produto!');
        // console.log('Falha ao buscar produtos');
    });
  }

  }

  existemProdutos(): boolean {
    return this.lstProdutos && this.lstProdutos.length > 0;
  }

  public changePage(pageNumber: number = 1){
    pageNumber = pageNumber <= 0 ? 1 : pageNumber;

    pageNumber = this.counMaxPage > 0 && pageNumber > this.counMaxPage ? this.counMaxPage : pageNumber;
    
    this.counMaxPage = Math.ceil(this.lstProdutos.length/10);
    this.currentPage = pageNumber;

    let initialIndex = (10*(this.currentPage-1));
    let finalIndex = (10*this.currentPage);

    this.produtos = [];

    for (let index = initialIndex; index < finalIndex; index++) {
      if(index < this.lstProdutos.length){
        this.produtos.push(this.lstProdutos[index]);
      }    
    }
  }
}
