import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.scss'],
})
export class ProductoCrearComponent implements OnInit {
  listaCategoria: Category[] = [];

  formProducto = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    costo: new FormControl('', [Validators.required]),
    existencias: new FormControl('', [Validators.required]),
    categoriaId: new FormControl(1, [Validators.required]),
    detalle: new FormControl('',[Validators.required]),
    fechaCreacion: new FormControl(new Date().toJSON()),
    estado: new FormControl(true),
  });

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService
      .getAllCategory()
      .subscribe((data) => (this.listaCategoria = data));
  }

  onSaveProducto() {
    console.log('onSaveProducto');
    console.log(this.formProducto.value);
    this.productoService.saveProducto(this.formProducto.value).subscribe({
      next: (data) => {
        console.log(data);
        this.formProducto.reset();
      },
      error : (error) => { console.log(error.message)}
    });
  }
}
