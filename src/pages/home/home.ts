import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AuthPage } from '../auth/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider) {
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(AuthPage);
    });
  }  
}
