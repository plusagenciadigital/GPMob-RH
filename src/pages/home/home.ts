import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User, AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AuthPage } from '../auth/login';
import { OrdinancesPage } from '../profile/ordinances/ordinances';
import { DependentsListPage } from '../profile/dependents/dependents-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private usuario: User; 

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider) {
  	this.usuario = this.auth.getUserInfo();  
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(AuthPage);
    });
  }  

  // Navegação
  goToOrdinances() {
    this.navCtrl.push(OrdinancesPage);
  }

  goToDependents() {
    this.navCtrl.push(DependentsListPage);
  }  
}
