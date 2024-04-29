import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet , ActivatedRoute} from '@angular/router';
import { ListaProductosComponent } from './_componentes/lista-productos/lista-productos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaProductosComponent,RouterOutlet,RouterLink,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Abril29Angular';
}
