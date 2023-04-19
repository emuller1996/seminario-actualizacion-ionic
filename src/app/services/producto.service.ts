import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Producto } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  URL_BASE: String = 'http://15.228.232.99:3000';

  constructor(private http: HttpClient) {}

  saveCategory(category: object) {
    console.log('Sevice');
    console.log(category);
    return this.http.post<Category>(`${this.URL_BASE}/categorias`, category);
  }

  getAllCategory() {
    return this.http.get<Category[]>(`${this.URL_BASE}/categorias`);
  }

  saveProducto(producto: object) {
    return this.http.post<Producto>(`${this.URL_BASE}/productos`, producto);
  }

  getAllProductos() {
    var filterObject = {
      order: 'nombre',
      include: [{ relation: 'CATEGORIA' }]};
    const filter = JSON.stringify(filterObject);
    var str =new URLSearchParams(filter).toString();
    str = str.substring(0, str.length - 1);



    return this.http.get<Producto[]>(
      `${this.URL_BASE}/productos?filter=${str}`
    );
  }

  getAllProductosXNombre(nombre: string) {
    var filterObject = {
      order: 'nombre',
      include: [{ relation: 'CATEGORIA' }],
      where:{nombre: { like : `%${nombre}%`}}
    };
    const filter = JSON.stringify(filterObject);
    var str =new URLSearchParams(filter).toString();
    str = str.substring(0, str.length - 1);

    return this.http.get<Producto[]>(
      `${this.URL_BASE}/productos?filter=${str}`
    );
  }


}
