import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Dados do usuário
export class User {
	codigo: string;
	caceal: number;
	cnpj: string; 
	digitoCaceal: number;
	razaoSocial: string;
	nomeFantasia: string;
	endereco: string;
	numeroTelefone: string; 
	descricaoSituacaoCadastral: string; 
	naturezaJuridica: string;
	tipoContribuinte: string;	

	constructor(codigo: string) {
		this.codigo = codigo;
	}
}


@Injectable()
export class AuthServiceProvider {
  public currentUser: User;

  public login(codigo, loadingToDismiss) {
  	if(codigo === null) {
  		return Observable.throw("Por favor, informe seu código de contibuinte.");
  	} else {
	    // Pegue o token
	    var headers = new Headers();
	    headers.append("Content-Type", "application/json");
	    // estático por enquanto..
	    headers.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNDg0NTgwMCIsImF1dGgiOiJST0xFX0VNSV9FWFRSQVRPLFJPTEVfUkVMX0RFTlVOX0VTUE9OVEFORUEsUk9MRV9FTUlfQ1AsUk9MRV9SRUxfT01JU1NBTyIsImlkQ29uZXhhbyI6IkYxQ0VENTUwNEMwQkMyRjhCRjM4MjBCMEE2NjJGRTA2IiwibnVtUGVzc29hIjo5MzkxOSwiaW5kU3RhdHVzIjoiQSIsImlkQXBsaWNhdGl2byI6MjksImlkQXV0b3JpemFjYW8iOjU5LCJleHAiOjE1MTg5MTIwMDB9.5CNocTB8hoX6VZWWgDwgmg5QChtpg7PlYfKLGgNyOvjPznUY5bpVK0fZ6V_8lU_7NplMRd4XCJdtUgqHi6H7-w");
	    
	    let options = new RequestOptions({headers: headers});  
	    console.log(options);
	    		
  		return Observable.create(observer => {
		 	// Host 
		    var host = "http://hackathonapi.sefaz.al.gov.br/sfz_cadastro_api/api/public/contribuinte/obterContribuinte/" + codigo;
		   
			this.http.get(host, options)
			    .map(res => res.json())
			    .subscribe(
			      data => {
			      	// 200 OK
			      	if(data != '') {
			      		// Me refatora, por favor!!
		  				this.currentUser = new User(codigo);
		  				this.currentUser.caceal = data.caceal;
		  				this.currentUser.cnpj = data.cnpj;
		  				this.currentUser.digitoCaceal = data.digitoCaceal;
		  				this.currentUser.razaoSocial = data.razaoSocial;
		  				this.currentUser.nomeFantasia = data.nomeFantasia;
		  				this.currentUser.endereco = data.endereco;
		  				this.currentUser.numeroTelefone = data.numeroTelefone;
		  				this.currentUser.descricaoSituacaoCadastral = data.descricaoSituacaoCadastral;
		  				this.currentUser.naturezaJuridica = data.naturezaJuridica;
		  				this.currentUser.tipoContribuinte = data.tipoContribuinte;	
		  			} else {
		  				this.erro("Login inválido.");
			        	loadingToDismiss.dismiss();
		  			}
			      },
			      err => {
			        this.erro("Não foi possível acessar a aplicação: " + err.error);
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
