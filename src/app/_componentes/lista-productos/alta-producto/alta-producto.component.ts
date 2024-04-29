import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ProductosService } from '../../../_servicio/productos_Servicio.service';
import { Producto } from '../../../_modelo/Producto';

@Component({
  selector: 'app-alta-producto',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule,RouterLink],
  templateUrl: './alta-producto.component.html',
  styleUrl: './alta-producto.component.css'
})
export class AltaProductoComponent {

  form:FormGroup;
  id:number = 0;
  edicion:boolean=false;

  constructor(
        private route:ActivatedRoute,
        private router: Router,
        private servicio: ProductosService
  ){this.form = new FormGroup({
    'idProducto': new FormControl(0),
    'nombreProducto': new FormControl(''),
    'precioUnitario': new FormControl(0),
    'unidadesStock':new FormControl(0),
    'idCategoria':new FormControl(0),

  });}

  ngOnInit(): void {
    

    this.route.params
      .subscribe(data => {
      this.id = data['id'];
      this.edicion= data['id'] != null;
      this.formaFormulario();

  });
}
formaFormulario() {
  if(this.edicion){
    this.servicio.listarUno(this.id)
      .subscribe(data => {
        this.form = new FormGroup({
          'idProducto': new FormControl(data.idProducto),
          'nombreProducto': new FormControl(data.nombreProducto),
          'precioUnitario': new FormControl(data.precioUnitario),
          'unidadesStock':new FormControl(data.unidadesStock),
          'idCategoria':new FormControl(data.idCategoria),
        });
      })
  }
}

operar(){
  let producto:Producto={
    'idProducto':this.form.value['idProducto'],
    'nombreProducto':this.form.value['nombreProducto'],
    'precioUnitario':this.form.value['precioUnitario'],
    'unidadesStock':this.form.value['unidadesStock'],
    'idCategoria':this.form.value['idCategoria']
  }

  if(this.edicion){
    this.servicio.actualizarProducto(producto).subscribe(()=>{
      this.servicio.obtenerTodos().subscribe(data=>{
        this.servicio.productoCambio.next(data);
      });
    });  window.location.reload();
    
  }else {
    this.servicio.insertarProducto(producto).subscribe(()=>{
      this.servicio.obtenerTodos().subscribe(data=>{
        this.servicio.productoCambio.next(data);
      });
    });
    window.location.reload();
    
  }
  this.router.navigate([''])
}

}
