import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Dados do usuário
export class User {
	client_secret: string;
	client_id: number;

	constructor(client_id: number, client_secret: string) {
		this.client_id = client_id;
		this.client_secret = client_secret;
	}
}


@Injectable()
export class AuthServiceProvider {
  currentUser: User;

  public login(email, password, loadingToDismiss) {
  	if(email === null || password === null) {
  		return Observable.throw("Por favor, informe seus dados.");
  	} else {
	    // Pegue o token
	    var headers = new Headers();
	    headers.append("Accept", "application/json");
	    headers.append("Content-Type", "application/json");
	    headers.append("Authorization", "application/json");
	    let options = new RequestOptions({headers: headers});  
	    		
  		return Observable.create(observer => {
		 	// Host 
		    var host = "";
		    //var host = "www.linnoplus.com";

		    let postParams = {
		      login: email,
		      senha: password
		    }   

		    // Tenta fazer o login na Linnoplus
			this.http.post("http://"+ host +"/api/v1/login", postParams, options)
			    .map(res => res.json())
			    .subscribe(
			      data => {
			      	if(data.retorno) {
		  				this.currentUser = new User(data.cod, data.token);
		  				observer.next(true);
		  				observer.complete();
		  			} else {
		  				this.erro("Credenciais inválidas.");
			        	loadingToDismiss.dismiss();
		  			}
			      },
			      err => {
			        this.erro("Houve um problema com a autenticação.");
			      }
			 );
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
