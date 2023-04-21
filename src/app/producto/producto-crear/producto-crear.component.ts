import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { ProductoService } from 'src/app/services/producto.service';
import { ToastController } from '@ionic/angular';

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
    detalle: new FormControl('',[Validators.required])
  });

  constructor(private productoService: ProductoService,private toastController: ToastController) {}

  ngOnInit() {
    this.productoService
      .getAllCategory()
      .subscribe((data) => (this.listaCategoria = data));
  }

   onSaveProducto() {
    console.log('onSaveProducto');
    console.log(this.formProducto.value);
    
    this.productoService.saveProducto(Object.assign(this.formProducto.value,{fechaCreacion : new Date().toJSON() , estado : true  } )).subscribe({
      next:async (data) => {
        console.log(data);
        this.formProducto.reset();
        const toast = await this.toastController.create({
          message: 'Producto Registrado!',
          duration: 1500,
          position: 'top'
        });
    
        await toast.present();
      },
      error : (error) => { console.log(error.message)}
    });
  }
}
