import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User, AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AuthPage } from '../auth/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private usuario: User; 

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider) {
  	this.usuario = this.auth.getUserInfo();  
    console.log(this.usuario);
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(AuthPage);
    });
  }  
}
