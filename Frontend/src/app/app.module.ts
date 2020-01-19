import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEstoqueComponent } from './estoque/list-estoque/list-estoque.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateEditComponent } from './estoque/create-edit/create-edit.component';
import {FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListEstoqueComponent,
    CreateEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
