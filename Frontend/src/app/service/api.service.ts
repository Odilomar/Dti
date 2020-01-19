import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../interfaces/produto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Produto[]> {
    const url = `${environment.estoqueApiUrl}/Produtos/`;
    return this.http.get<Produto[]>(url);
  }

  getItem(id: number): Observable<Produto> {
    const url = `${environment.estoqueApiUrl}/Produtos/${id}`;
    return this.http.get<Produto>(url);
  }

  addItems(produtos: Produto): Observable<Produto> {
    const url = `${environment.estoqueApiUrl}/Produtos/`;
    return this.http.post<Produto>(url, produtos);
  }

  atualizaItem(produto: Produto): Observable<Produto> {
    const url = `${environment.estoqueApiUrl}/Produtos/${produto.Id}`;
    return this.http.put<Produto>(url, produto);
  }

  deletaItem(id: number): Observable<Produto> {
    const url = `${environment.estoqueApiUrl}/Produtos/${id}`;
    return this.http.delete<Produto>(url);
  }

}
