import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service'; // Asegúrate de importar el servicio
import { Router } from '@angular/router'; // Si necesitas hacer navegación
import { environment } from '../../environments/environment'; // Importamos el archivo de entorno

@Component({
  selector: 'app-home',
  standalone: false,  // Si estás usando componentes Standalone
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Propiedades para almacenar los productos
  products: any[] = [];
  loading: boolean = true;  // Para mostrar un loader mientras se cargan los productos
  error: string = '';  // Para manejar errores

  constructor(private productsService: ProductsService, private router: Router) {}

  // Método que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.fetchProducts();
  }

  // Método para obtener los productos del backend
  fetchProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false; // Desactivar el loader
        // Verificamos las URLs de las imágenes
        this.products.forEach((product) => {
          const imageUrl = this.imageUrl + product.image_url;
          console.log('Ruta completa de la imagen para el producto', product.name, ':', imageUrl);
        });
      },
      error: (err) => {
        this.error = 'Hubo un error al cargar los productos';
        this.loading = false; // Desactivar el loader
      }
    });
  }

  // Método opcional si deseas manejar la navegación a la página del detalle de producto
  goToProductDetail(productId: number): void {
    this.router.navigate([`/product/${productId}`]); // Asegúrate de que la ruta esté configurada
  }

  // Getter para la URL base de las imágenes, tomada de environment.ts
  get imageUrl() {
    return environment.imageUrl;  // Usamos el valor de `imageUrl` del entorno
  }

}
