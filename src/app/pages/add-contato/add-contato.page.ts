import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Contato } from 'src/app/models/contato';
import { CepService } from 'src/app/services/cep.service';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-add-contato',
  templateUrl: './add-contato.page.html',
  styleUrls: ['./add-contato.page.scss'],
})
export class AddContatoPage implements OnInit {
  contato: Contato;
  formGroup: FormGroup;

  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController,
    private cepService: CepService,
    private contatoService: ContatoService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
        ]),
      ],
      celular: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.contato = new Contato();
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.contatoService.buscarPorId(parseInt(id)).then((json) => {
        this.contato = <Contato>json;

        for (const key in this.contato) {
          if (key == 'dataNascimento') {
            let data = new Date(this.contato[key]);
            let dataFormada = `${data.getDate()}/${
              data.getMonth() + 1
            }/${data.getFullYear()}`;
            this.formGroup.get(key).setValue(dataFormada);
          } else {
            if (key != 'id') {
              this.formGroup.get(key).setValue(this.contato[key]);
            }
          }
        }
      });
    }
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

  async preencherEndereco() {
    this.cepService
      .obterEndereco(this.formGroup.value.cep)
      .then((json) => {
        this.formGroup.get('rua').setValue(json['logradouro']);
        this.formGroup.get('bairro').setValue(json['bairro']);
        this.formGroup.get('cidade').setValue(json['localidade']);
        this.formGroup.get('estado').setValue(json['uf']);
      })
      .catch((err) => {
        this.exibirMensagem('CEP inválido! Erro: ' + err.message);
        console.log('CEP inválido! Erro: ' + err.message);
      });
  }

  async submitForm() {
    for (const key in this.formGroup.value) {
      if (key == 'dataNascimento') {
        this.contato[key] = new Date(this.formGroup.value[key]);
      } else {
        this.contato[key] = this.formGroup.value[key];
      }
    }

    this.contatoService
      .salvar(this.contato)
      .then((json) => {
        this.exibirMensagem('Registro salvo com sucesso');
        this.navController.navigateBack('/contato');
      })
      .catch((err) => {
        this.exibirMensagem('Erro ao salvar contato' + err.message);
      });
  }
}
