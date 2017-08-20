import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProfilePage } from '../pages/profile/profile';
import { DependentsPage } from '../pages/profile/dependents/dependents';
import { DependentsListPage } from '../pages/profile/dependents/dependents-list';
import { OrdinancesPage } from '../pages/profile/ordinances/ordinances';
import { EndorsementsPage } from '../pages/profile/endorsements/endorsements';
import { StockingPage } from '../pages/profile/stocking/stocking';
import { LicensesPage } from '../pages/profile/licenses/licenses';
import { DecreesPage } from '../pages/profile/decrees/decrees';
import { DailyPage } from '../pages/profile/daily/daily';
import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/login';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AuthPage; //HomePage

  /*
  AuthPage
  HomePage
  ProfilePage
  */

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard',          component: HomePage },
      { title: 'Meu cadastro',       component: ProfilePage },
      { title: 'Editar Dependentes', component: DependentsPage },
      { title: 'Dependentes',        component: DependentsListPage },
      { title: 'Portarias',          component: OrdinancesPage },
      { title: 'Averbações',         component: EndorsementsPage },
      { title: 'Lotação',            component: StockingPage },
      { title: 'Licenças',           component: LicensesPage },
      { title: 'Decretos',           component: DecreesPage },
      { title: 'Diárias',            component: DailyPage },
      { title: 'List',               component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
