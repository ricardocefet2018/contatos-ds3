import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  url = 'https://viacep.com.br/ws/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  async obterEndereco(cep: string) {
    let urlAux = this.url + cep + '/json';
    try {
      return await this.httpClient.get(urlAux).toPromise();
    } catch (err) {
      return err;
    }
  }
}
