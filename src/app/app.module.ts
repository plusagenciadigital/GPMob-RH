import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AuthPage } from '../pages/auth/login';
import { ProfilePage } from '../pages/profile/profile';
import { ProfilePersonal } from '../pages/profile/modals/personal';
import { ProfileJobs } from '../pages/profile/modals/jobs';
import { ProfileDocuments } from '../pages/profile/modals/documents';
import { DependentsPage } from '../pages/profile/dependents/dependents';
import { DependentsListPage } from '../pages/profile/dependents/dependents-list';
import { OrdinancesPage } from '../pages/profile/ordinances/ordinances';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    ProfilePage,
    ProfilePersonal,
    ProfileJobs,
    ProfileDocuments,
    DependentsPage,
    DependentsListPage,
    OrdinancesPage,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    ProfilePage,
    ProfilePersonal,
    ProfileJobs,
    ProfileDocuments,
    DependentsPage,
    DependentsListPage,
    OrdinancesPage,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
