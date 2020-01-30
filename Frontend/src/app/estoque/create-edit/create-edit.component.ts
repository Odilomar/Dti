import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Produto } from 'src/app/interfaces/produto';
import { ApiService } from 'src/app/service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  @Input() produtos: Produto = {} as Produto;
  @Output() outputProduto: EventEmitter<Produto> = new EventEmitter();
  titulo: string;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
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
    if(this.checkForm()){
      if (this.activatedRoute.snapshot.params.id === undefined) {
        this.apiService.addItems(this.produtos)
          .subscribe(
            () => { this.router.navigateByUrl('/'); this.toastr.success("Produto cadastrado com sucesso!"); },
            () => { this.toastr.error('Falha ao adicionar'); }
          );
        this.outputProduto.emit(this.produtos);
      } else {
        this.apiService.atualizaItem(this.produtos)
          .subscribe(
            () => { this.router.navigateByUrl('/'); this.toastr.success("Produto atualizado com sucesso!");},
            () => { this.toastr.error('Falha ao atualizar'); }
          );
        this.outputProduto.emit(this.produtos);
      }
    }
    else{
      console.log(this.produtos);
      this.toastr.error("Preencha os campos corretamente antes de salvar");
    }    
  }

  private checkForm(){
    if(this.produtos.Nome.length <= 0 || this.produtos.Nome == '' || this.produtos.QuantidadeItens <= 0 || this.produtos.ValorUnitario <= 0 ) return false;

    return true;
  }

  getItem(id: number) {
    this.apiService.getItem(id)
      .subscribe((listaprodutos: Produto) => {
        this.produtos = listaprodutos;
        this.toastr.info("Produto recuperado", "O produto está disponível para edição");
      }, () => {
        this.toastr.error('Falha ao buscar produtos');
      });
  }

  public voltarListagem(){
    this.router.navigate(['']);
  }
}
