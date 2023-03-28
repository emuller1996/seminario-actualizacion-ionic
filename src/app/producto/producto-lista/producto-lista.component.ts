import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Producto } from 'src/app/models/product.models';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.scss'],
})
export class ProductoListaComponent implements OnInit {
  listaProducto: Producto[] = [];
  isLoading: boolean = true;
  nombreSearc = new FormControl('');

  constructor(private productoService: ProductoService) {}
  ionViewDidEnter(){
    this.isLoading = true;

    this.productoService.getAllProductos().subscribe({
      next: (data) => {
        console.log(data);
        this.listaProducto = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error.message);
      },
    });

  }
  ngOnInit() {

  }

  onSearchProductByName() {
    console.log(this.nombreSearc.value);
    this.productoService
      .getAllProductosXNombre(
        this.nombreSearc.value ? this.nombreSearc.value : ''
      )
      .subscribe({
        next: (data) => {
          this.listaProducto = data;
        },
      });
  }
}
