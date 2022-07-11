import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {
  contatos: Contato[];

  constructor(
    public contatoService: ContatoService,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();
    this.contatoService.listar().then((json) => {
      this.contatos = <Contato[]>json;
      this.fecharLoader();
    });
  }

  exibirLoader() {
    this.loadingController
      .create({
        message: 'Carregando...',
      })
      .then((res) => {
        res.present();
      });
  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController
        .dismiss()
        .then()
        .catch((err) => {
          console.log('Erro: ', err);
        });
    }, 500);
  }

  async excluirContato(id: number) {
    this.contatoService.buscarPorId(id).then((json) => {
      const contato = <Contato>json;
      this.confirmarExclusao(contato);
    });
  }

  async confirmarExclusao(contato: Contato) {
    this.alertController
      .create({
        header: 'Confirma a exclusão?',
        message: contato.nome,
        buttons: [
          {
            text: 'Cancelar',
          },
          {
            text: 'Confirmar',
            cssClass: 'danger',
            handler: () => {
              this.contatoService
                .excluir(contato)
                .then(() => {
                  this.carregarLista();
                  this.exibirMensagem('Registro excluído com sucesso!');
                })
                .catch((err) => {
                  this.exibirMensagem('Erro ao excluir registro');
                });
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  async exibirMensagem(msg: string) {
    this.toastController
      .create({
        message: msg,
        duration: 1500,
      })
      .then((toast) => {
        toast.present();
      });
  }
}
