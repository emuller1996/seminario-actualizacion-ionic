import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category.model';
import { ProductoService } from 'src/app/services/producto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  listCategories: Category[] = [];

  formCategory = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  });
  constructor(
    private productoService: ProductoService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getAllCAtegory();
  }

  getAllCAtegory() {
    this.productoService.getAllCategory().subscribe((data) => {
      this.listCategories = data;
      console.log(data);
    });
  }

  async onSaveCategory() {
    console.log('onSaveCategory');
    console.log(this.formCategory.value);

    this.productoService.saveCategory(this.formCategory.value).subscribe({
      next: (data) => {
        console.log(data);
        this.formCategory.reset();
        this.getAllCAtegory();
        this.presentToast('top')
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Categoria Creada',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
