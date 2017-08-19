import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Dados da solicitação
export class Solicitacao {
	login: string; 
	id_autorizacao: number;
	url_autorizacao: string;

	constructor(login, id, url) {
		this.login = login;
		this.id_autorizacao = id;
		this.url_autorizacao = url;
	}

	public getAuthorization(): boolean {
  		// Requisição para token de autorização
  		// Neste ponto o usuário já foi localizado no sistema pelo seu login =)
  		return Observable.create(observer => {
		 	// Host 
		    var headers = new Headers();
		    headers.append("Content-Type", "application/json");	    
		    let requestOptions = new RequestOptions({headers: headers}); 
		    let http: Http;

		    var host = "http://hackathonapi.sefaz.al.gov.br/api/public/autenticar";		  	
		  	var parametros = {
		  		login: this.login,
		  		idAutorizacao: this.id_autorizacao,
		  		tokenApp: "64cfdcee98ea53c99741bb4d285ece934209f237"
		  	};

			this.http.post(host, parametros, requestOptions)
			    .map(res => res.json())
			    .subscribe(
			      data => {		
			      	// 200 OK - {idAutorizacao: number, urlAutorizacao: string}
			      	console.log(data);
			      	return true;
			      },
			      err => {
			        console.log(err);
					return false;
			      }
			 );
  		});		
	}
}

// Dados do usuário
export class User {
	login: string;	

	constructor(login: string) {
		this.login = login;
	}
}

@Injectable()
export class AuthServiceProvider {
  public currentUser: User;
  public solicitacao: Solicitacao;

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
			      	let solicitacao = new Solicitacao(login, data.idAutorizacao, data.urlAutorizacao);
			      	if (solicitacao.getAuthorization()) {
			      		this.erro("Logou com sucesso!");
			      	}
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

  public getUserInfo(): User {
  	return this.currentUser;
  }

  constructor(public http: Http, public alertCtrl: AlertController) {
    console.log('Hello AuthServiceProvider Provider');
  }

  erro(mensagem) {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();      
  }


}
