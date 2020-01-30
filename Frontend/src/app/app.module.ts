import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEstoqueComponent } from './estoque/list-estoque/list-estoque.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateEditComponent } from './estoque/create-edit/create-edit.component';
import { FormsModule } from '@angular/forms';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    FormsModule,
    CurrencyMaskModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
