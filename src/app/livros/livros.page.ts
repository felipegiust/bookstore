import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AutorService } from '../autores/autor.service';
import { Livro } from './livro.model';
import { LivroService } from './livro.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.page.html',
  styleUrls: ['./livros.page.scss'],
})
export class LivrosPage implements OnInit {
  livros: Livro[];

  constructor(
    private alertController: AlertController,
    private autorService: AutorService,
    private livroService: LivroService,
    private toastController: ToastController,
  ) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.listar();
  }

  listar() {
    this.livroService.getLivros().subscribe(
      (dados)=>{
        this.livros = dados;
      },
    (erro)=>{
      console.error(erro);
    });
  }

  confirmarExclusao(livro: Livro) {

    this.alertController.create({
      header: 'Confirmação de exclusão', 
      message: `Deseja excluir o livro ${livro.titulo}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(livro)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());

    
  }
  
  excluir(livro: Livro) {
    this.livroService.excluir(livro.id).subscribe(
      ()=>{
        this.listar();
      },
      (erro)=>{
        this.toastController.create({
          message:`Não foi possivel excluir o livro ${livro.titulo}`,
          color:'danger',
          duration: 5000,
          keyboardClose: true,
        }).then(t => t.present());
      }
    );
  }

}
