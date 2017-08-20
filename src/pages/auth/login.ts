import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LiberacaoPage } from '../../pages/liberacao/liberacao';
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
      this.appInitialized();

      // Se já pegou o usuário logado
      if (this.auth.getLocalUser()) {
        this.navCtrl.setRoot(HomePage);
      }
  }

  public efetuarLogin() {
    this.showLoading();
    this.auth.efetuarLogin(this.login, this.loading).subscribe(loginEfetuado => {
      if (loginEfetuado) {
        // Deu tudo certo com o login: leva pra Home
        this.auth.getAuthorization().subscribe(autorizacaoConcedida => {
          if (autorizacaoConcedida) {
          } else {
            this.navCtrl.setRoot(LiberacaoPage);
          }
        });

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
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  appInitialized() {
    setTimeout(() => {
      var loader = document.getElementsByClassName('login')[0];
      loader.classList.add('in');
    }, 3000);
  }

}
