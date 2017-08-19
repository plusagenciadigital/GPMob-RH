import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider, User } from '../../providers/auth-service/auth-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthServiceProvider) {
  	this.usuario = this.auth.getUserInfo();
  }



}
