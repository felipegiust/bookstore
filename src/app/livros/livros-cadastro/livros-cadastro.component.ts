import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../livro.service';
import { Livro } from '../livro.model';
import { Autor } from '../../autores/autor.model';
import { AutorService } from '../../autores/autor.service';

@Component({
  selector: 'app-livros-cadastro',
  templateUrl: './livros-cadastro.component.html',
  styleUrls: ['./livros-cadastro.component.scss'],
})
export class LivrosCadastroComponent implements OnInit {

  autores: Autor[] = []

  livroId: number;
  livrosForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private livroService: LivroService,
    private autorService: AutorService,
    private router: Router,
  ) {
    let livro = {
      id: null,
      autor: null,
      titulo: '',
      isbn: 0,
      paginas: 0,
      preco: 0,
      imagem:''
    };
    this.initializaFormulario(livro);
    this.carregaAutores()
  }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.livroId = id;
      this.livroService
        .getLivro(id)
        .subscribe((livro) => {
          this.initializaFormulario(livro);
        }, erro => {
console.error(erro);
          this.toastController.create({
            message: `Não foi possivel resgatar livro`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        });
    }
  }

  compareWithAutores = (a1, a2) => a1.id === a2.id

  initializaFormulario(livro: Livro) {
    this.livrosForm = new FormGroup({
      titulo: new FormControl(livro.titulo, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      isbn: new FormControl(livro.isbn, [
        Validators.required,
        Validators.min(1),
      ]),
      paginas: new FormControl(livro.paginas, [
        Validators.required,
        Validators.min(1),
      ]),
      preco: new FormControl(livro.preco, [
        Validators.required,
        Validators.min(1),
      ]),
      imagem: new FormControl(livro.imagem),
      autor: new FormControl(livro.autor, Validators.required)
    })
  }

  carregaAutores() {
    this.autorService.getAutores().subscribe(autores => {
      this.autores = autores
    }, erro => {
      console.error(erro);
      this.toastController.create({
        message: `Não foi possível listar os autores`,
        duration: 5000,
        keyboardClose: true,
        color: 'danger'
      }).then(t => t.present());
    })
  }

  salvar() {
    const livro = { ...this.livrosForm.value, id: this.livroId }
    this.livroService.salvar(livro).subscribe(
      () => this.router.navigate(['livros']),
      (erro) => {
        console.error(erro);
        this.toastController.create({
          message: `Não foi possível salvar o livro ${livro.titulo}`,
          duration: 5000,
          keyboardClose: true,
          color: 'danger'
        }).then(t => t.present());
      }
    );
  }

  get titulo() {
    return this.livrosForm.get('titulo');
  }

  get isbn() {
    return this.livrosForm.get('isbn');
  }

  get paginas() {
    return this.livrosForm.get('paginas');
  }

  get preco() {
    return this.livrosForm.get('preco');
  }
  
  get autor() {
    return this.livrosForm.get('autor');
  }

}
