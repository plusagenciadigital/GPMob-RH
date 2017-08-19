import { Component, Injectable, ViewChild } from '@angular/core';
import { App, AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LiberacaoPage } from '../../pages/liberacao/liberacao';


// Dados do usuário
export class User {
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
		  			observer.complete();			      	
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
		    let http: Http;

		    var host = "http://hackathonapi.sefaz.al.gov.br/api/public/autenticar";		  	
		  	var parametros = {
		  		login: this.currentUser.login,
		  		idAutorizacao: this.currentUser.id_autorizacao,
		  		tokenApp: "64cfdcee98ea53c99741bb4d285ece934209f237"
		  	};

		  	var next = false;
			this.http.post(host, parametros, requestOptions)
			    .map(res => res.json())
			    .subscribe(
			      data => {		
			      	// 200 OK
			      	if(data.id_token) {
			      		// Token ok!! Uhuuuuuuuuuul
			      		this.currentUser.liberado = true;
			      		this.currentUser.token = data.id_token;
			      		next = true;
			      	}
			      },
			      err => {
			      	// Deu algum problema geral
			      	next = false;
			      }
			 );
		  	observer.next(next);			      		
		  	observer.complete();			      		

  		});		
	}  

  public getUserInfo(): User {
  	return this.currentUser;
  }

  constructor(public http: Http, public alertCtrl: AlertController, public app: App) {
    //console.log('Hello AuthServiceProvider Provider');
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


}
