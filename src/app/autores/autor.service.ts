import { Injectable } from '@angular/core';
import { Genero } from './autor.enum';
import { Autor } from './autor.model';

@Injectable({
  providedIn: 'root'
})

export class AutorService {
  
  
  private autores : Autor[];


  constructor() { 

    this.autores=[
      {
        id:1,
        nome: 'David Flanagan',
        dataNascimento: new Date(1980, 11, 13),
        genero: Genero.MASCULINO,
      },
      {
        id:2,
        nome: 'Douglas Cockford',
        dataNascimento: new Date(1975, 5, 17),
        genero: Genero.MASCULINO,
      },
      {
        id:3,
        nome: 'Martin Fowler',
        dataNascimento: new Date(1960, 5, 17),
        genero: Genero.MASCULINO
      }
    ];
  }

  public getAutores() : Autor[]{
    return this.autores;

  }

  excluir(id: number) {
    this.autores=this.autores.filter(a => a.id !== id);
  }
  
  getAutor(id: number) : Autor{    
    return this.autores.find(a => a.id === id);
  }
}
