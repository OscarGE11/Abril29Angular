import { Component, OnInit } from '@angular/core';
import { Producto } from '../../_modelo/Producto';
import { ProductosService } from '../../_servicio/productos_Servicio.service';
import { RouterModule } from '@angular/router';
import { AltaProductoComponent } from './alta-producto/alta-producto.component';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [RouterModule,AltaProductoComponent,RouterModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})

export class ListaProductosComponent implements OnInit{
 
  listaProductos:Producto[]=[];
  constructor(private productosServicio:ProductosService){}

  

  ngOnInit():void {
    this.productosServicio.obtenerTodos().subscribe(datos=>this.listaProductos=datos);
  }

  borrarProducto(id:number){
    this.productosServicio.borrarProducto(id).subscribe(()=>{

      this.productosServicio.obtenerTodos().subscribe(data=>this.productosServicio.productoCambio.next(data))
      window.location.reload();
    });
   
  }
  

}
