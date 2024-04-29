import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AltaProductoComponent } from './_componentes/lista-productos/alta-producto/alta-producto.component';
import { ListaProductosComponent } from './_componentes/lista-productos/lista-productos.component';

export const routes: Routes = [

    {path:"",component:AppComponent,children:[
    {path:'alta',component:AltaProductoComponent},
    {path:'edicion/:id',component:AltaProductoComponent}]},
    
];
