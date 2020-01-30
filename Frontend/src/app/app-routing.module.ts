import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEstoqueComponent } from './estoque/list-estoque/list-estoque.component';
import { CreateEditComponent } from './estoque/create-edit/create-edit.component';


const routes: Routes = [
  { path: '', component: ListEstoqueComponent},
  { path: 'produtos/criar', component: CreateEditComponent },
  { path: 'produtos/criar/:id', component: CreateEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


