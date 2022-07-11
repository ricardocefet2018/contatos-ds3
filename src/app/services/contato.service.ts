import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  url = 'https://api-app-contatos.herokuapp.com/api/contatos/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  async salvar(contato: Contato) {
    if (contato.id == null) {
      try {
        let json = await this.httpClient
          .post(this.url, JSON.stringify(contato), this.httpOptions)
          .toPromise();
        return json;
      } catch (err) {
        return err;
      }
    } else {
      try {
        let json = await this.httpClient
          .put(this.url, JSON.stringify(contato), this.httpOptions)
          .toPromise();
        return json;
      } catch (err) {
        return err;
      }
    }
  }

  async excluir(contato: Contato) {
    let urlAux = this.url + contato.id;
    try {
      return await this.httpClient.delete(urlAux).toPromise();
    } catch (err) {
      return false;
    }
  }

  async listar() {
    try {
      return await this.httpClient.get(this.url).toPromise();
    } catch (err) {
      return err;
    }
  }

  async buscarPorId(id: number) {
    let urlAux = this.url + id;
    try {
      return await this.httpClient.get(urlAux).toPromise();
    } catch (err) {
      return err;
    }
  }

  async verificarCpf(cpf: string) {
    let urlAux = this.url + cpf + '/exists';
    try {
      return await this.httpClient.get(urlAux).toPromise();
    } catch (err) {
      return err;
    }
  }
}
