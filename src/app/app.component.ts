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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AuthPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#062b6b');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
