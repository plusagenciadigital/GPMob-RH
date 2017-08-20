import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User, AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AuthPage } from '../auth/login';
import { OrdinancesPage } from '../profile/ordinances/ordinances';
import { DependentsListPage } from '../profile/dependents/dependents-list';
import { EndorsementsPage } from '../profile/endorsements/endorsements';
import { StockingPage } from '../profile/stocking/stocking';
import { LicensesPage } from '../profile/licenses/licenses';
import { DecreesPage } from '../profile/decrees/decrees';
import { DailyPage } from '../profile/daily/daily';
import { ProfilePage } from '../profile/profile';

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

  goToEndorsements() {
    this.navCtrl.push(EndorsementsPage);
  }    

  goToStocking() {
    this.navCtrl.push(StockingPage);
  }     

  goToLicenses() {
    this.navCtrl.push(LicensesPage);
  }     

  goToDecrees() {
    this.navCtrl.push(DecreesPage);
  }         

  goToDaily() {
    this.navCtrl.push(DailyPage);
  } 

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }              

}
