import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider, User } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the LiberacaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liberacao',
  templateUrl: 'liberacao.html',
})
export class LiberacaoPage {
  public usuario: User;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public auth: AuthServiceProvider) {
  	this.usuario = this.auth.getUserInfo();
  }

  public liberacaoFeita () {
  	// Verifica se o usuário realmente fez a liberação
  	this.auth.getAuthorization().subscribe(
  		autorizacao => {
  			console.log(autorizacao);
  		},
  		error => {
  			console.log(error);
  		},
  		complete => {
	    	if (this.usuario.liberado) {
	        	this.navCtrl.setRoot(HomePage);    		
	     	}  			
  		}
  	);
  }



}
