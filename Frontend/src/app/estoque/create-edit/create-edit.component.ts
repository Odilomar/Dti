import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Produto } from 'src/app/interfaces/produto';
import { ApiService } from 'src/app/service/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  @Input() produtos: Produto =  {} as Produto;
  @Output() outputProduto: EventEmitter<Produto> = new EventEmitter();
  titulo: string;

  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.params.id !== undefined) {
      this.getItem(this.activatedRoute.snapshot.params.id);
    }
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.id === undefined) {
      this.titulo = 'Cadastro';
    } else {
      this.titulo = 'Edição';
    }
  }

  onSubmit() {
  if (this.activatedRoute.snapshot.params.id === undefined) {
    this.apiService.addItems(this.produtos)
    .subscribe(
      () => {this.router.navigateByUrl('/'); },
      () => {console.log('Falha ao adicionar'); }
    );
    this.outputProduto.emit(this.produtos);
  } else {
    this.apiService.atualizaItem(this.produtos)
    .subscribe(
      () => {this.router.navigateByUrl('/'); },
      () => {console.log('Falha ao atualizar'); }
    );
    this.outputProduto.emit(this.produtos);
  }
}

  getItem(id: number) {
    this.apiService.getItem(id)
    .subscribe((listaprodutos: Produto) => {
      this.produtos = listaprodutos;
    }, () => {
        console.log('Falha ao buscar produtos');
    });
  }
}
