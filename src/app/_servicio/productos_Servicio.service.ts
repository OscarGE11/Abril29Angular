import { Injectable } from '@angular/core';
import {entorno} from '../_modelo/Entorno';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Producto } from '../_modelo/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url:string = `${entorno.HOST}/productos`;
  productoCambio = new Subject<Producto[]>;
  constructor(private http:HttpClient) { }

  obtenerTodos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url);
  }
  listarUno(id:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  insertarProducto(p:Producto):Observable<Producto>{
    return this.http.post<Producto>(this.url,p);
  }
  borrarProducto(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }
  actualizarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.url,producto);
  }
  
}
