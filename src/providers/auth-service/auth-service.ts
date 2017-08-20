import { Injectable } from '@angular/core';
import { App, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Dados do usuário
export class User {
	public dados: any;
	public login: string;
	public token: string;
	public id_autorizacao: number;
	public url_autorizacao: string;
	public liberado: boolean;

	constructor(login: string, liberado: boolean, id_autorizacao: number, url_autorizacao: string) {
		this.login = login;
		this.liberado = liberado;
		this.id_autorizacao = id_autorizacao;
		this.url_autorizacao = url_autorizacao;
	}
}

@Injectable()
export class AuthServiceProvider {
  public currentUser: User;

  public efetuarLogin(login, loadingToDismiss) {
  	if(login === null) {
  		return Observable.throw("Por favor, informe seu login.");
  	} else {
	    // Solicite o token
	    var headers = new Headers();
	    headers.append("Content-Type", "application/json");
	    let requestOptions = new RequestOptions({headers: headers});

  		// Requisição para solicitação de acesso
  		return Observable.create(observer => {
		 	// Host
		    var host = "http://hackathonapi.sefaz.al.gov.br/sfz-habilitacao-aplicativo-api/api/public/autorizacao-aplicativo/solicitar";
		  	var parametros = {
		  		login: login, // desmistificando: parâmetro que vai pro post = parâmetro que vem do método.
		  		nomeDispositivo: "PLUS-GPMOB",
		  		tokenApp: "64cfdcee98ea53c99741bb4d285ece934209f237"
		  	};

			this.http.post(host, parametros, requestOptions)
			    .map(res => res.json())
			    .subscribe(
			      data => {
			      	// 200 OK - {idAutorizacao: number, urlAutorizacao: string}
			      	this.currentUser = new User(login, false, data.idAutorizacao, data.urlAutorizacao);
		  			observer.next(true);
			      },
			      err => {
			      	var retorno = JSON.parse(err._body);
			        this.erro(retorno.mensagem);
			      }
			 );

			 loadingToDismiss.dismiss();
  		});
  	}
  }

  public getAuthorization() {
  		// Requisição para token de autorização
  		// Neste ponto o usuário já foi localizado no sistema pelo seu login =)
  		return Observable.create(observer => {
		 	// Host
		    var headers = new Headers();
		    headers.append("Content-Type", "application/json");
		    let requestOptions = new RequestOptions({headers: headers});
		    // let http: Http;

		    var host = "http://hackathonapi.sefaz.al.gov.br/api/public/autenticar";
		  	var parametros = {
		  		login: this.currentUser.login,
		  		idAutorizacao: this.currentUser.id_autorizacao,
		  		tokenApp: "64cfdcee98ea53c99741bb4d285ece934209f237"
		  	};

		  	var avancar = false;
			this.http.post(host, parametros, requestOptions)
			    .map(res => res.json())
			    .subscribe(
			      data => {
			      	// 200 OK
			      		this.currentUser.liberado = true;
			      		this.currentUser.token = data.id_token;
			      		avancar = true;

			      		// Já pode pegar as informações do funcionário logado
			      		this.getUserApiRequest("http://hackathonapi.sefaz.al.gov.br/sfz_ficha_funcional_api/api/public/fichaFuncional")
						.subscribe(dadosUsuario => {
							this.currentUser.dados = dadosUsuario;
						});

						// Armazenamento em local storage para persistência
			      		window.localStorage.setItem("user", JSON.stringify(this.currentUser));
			      },
			      err => {
			      	// Deu algum problema
			      	avancar = false;
			      }
			 );
		  	observer.next(avancar);
		  	observer.complete();

  		});
  }

  public getUserInfo(): User {
  	return this.currentUser;
  }

  public getLocalUser() {
  	var localUser = window.localStorage.getItem("user");
  	if (localUser) {
  		this.currentUser = JSON.parse(localUser);
  		return true;
  	}
  	return false;
  }

  // Padrão para fazer requisições para as API's
  public getUserApiRequest(host, method = "get", parametros = {}) {
	var headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Authorization", "Bearer " + this.currentUser.token);
	let requestOptions = new RequestOptions({headers: headers});

  		// Requisição para solicitação de acesso
  	var req: any;
  	return Observable.create(observer => {
  		if (method == "get") {
  			req = this.http.get(host, requestOptions);
  		} else {
  			req = this.http.post(host, parametros, requestOptions);
  		}

		// Requisição padrão
		req.map(res => res.json())
		.subscribe(
			data => {
				// 20x
			    observer.next(data);
			    observer.complete();
			},
			err => {
			    this.erro(err.mensagem);
			}
		);
	});
  }

  // Constructor do AuthServiceProvider
  constructor(public http: Http, public alertCtrl: AlertController, public app: App) {

  }

  erro(mensagem) {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

  navegar(destino, parametros = {}) {
	this.app.getRootNav().setRoot(destino, parametros);
  }

  public logout() {
    return Observable.create(observer => {
	  window.localStorage.clear();
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
   }

}
