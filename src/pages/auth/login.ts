import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'login',
  templateUrl: 'login.html',
})

export class AuthPage {
  public loading: Loading;
  public login: string;

  constructor(
  	public navCtrl: NavController, 
  	private auth: AuthServiceProvider, 
  	private alertCtrl: AlertController,
	  private loadingCtrl: LoadingController,
  	public navParams: NavParams) {
  }

  public efetuarLogin() {
    this.showLoading();
    console.log(this.auth);
    this.auth.efetuarLogin(this.login, this.loading).subscribe(loginEfetuado => {
      if (loginEfetuado) {
        // Deu tudo certo com o login: leva pra Home        
        this.navCtrl.setRoot(HomePage);
      } else {
        this.showError("Não foi possível efetuar o login");
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
