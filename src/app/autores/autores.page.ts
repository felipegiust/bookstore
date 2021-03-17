import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Autor } from './autor.model';
import { AutorService } from './autor.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.page.html',
  styleUrls: ['./autores.page.scss'],
})
export class AutoresPage implements OnInit {

  autores: Autor[];


  constructor(
    private alertController: AlertController,
    private autoService: AutorService
  ) {
    this.listar();
  }

  ngOnInit() {
  }

  listar() {
    this.autores = this.autoService.getAutores();
  }
  confirmarExclusao(autor: Autor) {
    this.alertController.create({
      header: 'Confirmação de exclusão',
      message: 'Deja exlcuir o autor ' + autor.nome + ' ?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.excluir(autor)
          }
        },
        {
          text:'Não',
        }

      ]
    }).then(alert => alert.present());

  }
  private excluir(autor: Autor) {
    this.autoService.excluir(autor.id);
    this.listar();
  }
 
}
