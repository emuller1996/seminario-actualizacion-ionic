import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent  implements OnInit {


  nameCategory:string='';

  constructor(
   
  ) { }

  ngOnInit() {}

  onSaveCategory(){

    console.log('onSaveCategory')
    /* this.http.post<Category>('http://localhost:3000/category',{name:this.nameCategory}).subscribe(
      {
        next : (data) => {
          console.log(data);
          alert('Registrado')
        },
        error: (err) => { console.log(err.message)}
      }
    ) */
  }

}
