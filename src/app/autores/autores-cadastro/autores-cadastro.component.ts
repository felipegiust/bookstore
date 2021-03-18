import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Genero } from '../autor.enum';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';

@Component({
  selector: 'app-autores-cadastro',
  templateUrl: './autores-cadastro.component.html',
  styleUrls: ['./autores-cadastro.component.scss'],
})
export class AutoresCadastroComponent implements OnInit {

  autor: Autor;

  constructor(
    private activatedRoute: ActivatedRoute,
    private autoService: AutorService
  ) {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.autor = this.autoService.getAutor(id);
    } else {
      this.autor = {
        id: null,
        nome: '',
        dataNascimento: null,
        genero: Genero.FEMININO,
      }
    }
  }

  ngOnInit() { }

}
