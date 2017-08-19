import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'login',
  templateUrl: 'login.html',
})

export class AuthPage {
  public loading: Loading;
  public codigo: string;

  constructor(
  	public navCtrl: NavController, 
  	private auth: AuthServiceProvider, 
  	private alertCtrl: AlertController,
	  private loadingCtrl: LoadingController,
  	public navParams: NavParams) {
  }

  public login() {
    this.showLoading();
    console.log(this.auth);
    this.auth.login(this.codigo, this.loading).subscribe(allowed => {
      if (allowed) {        
        this.navCtrl.setRoot(HomePage);
      } else {
        this.showError("Não foi possível efetuar o login. Verifique suas credenciais.");
      }
    },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }  

}
