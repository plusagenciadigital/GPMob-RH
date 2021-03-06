import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { AuthPage } from '../pages/auth/login';
import { ProfilePage } from '../pages/profile/profile';
import { ProfilePersonal } from '../pages/profile/modals/personal';
import { ProfileJobs } from '../pages/profile/modals/jobs';
import { ProfileDocuments } from '../pages/profile/modals/documents';
import { DependentsPage } from '../pages/profile/dependents/dependents';
import { DependentsListPage } from '../pages/profile/dependents/dependents-list';
import { OrdinancesPage } from '../pages/profile/ordinances/ordinances';
import { EndorsementsPage } from '../pages/profile/endorsements/endorsements';
import { StockingPage } from '../pages/profile/stocking/stocking';
import { LicensesPage } from '../pages/profile/licenses/licenses';
import { DecreesPage } from '../pages/profile/decrees/decrees';
import { DailyPage } from '../pages/profile/daily/daily';
import { ReportError } from '../pages/modals/report';
import { UploadModal } from '../pages/modals/upload';
import { HomePage } from '../pages/home/home';
import { LiberacaoPage } from '../pages/liberacao/liberacao';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

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
    EndorsementsPage,
    StockingPage,
    LicensesPage,
    DecreesPage,
    DailyPage,
    ReportError,
    UploadModal,
    HomePage,
    LiberacaoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
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
    EndorsementsPage,
    StockingPage,
    LicensesPage,
    DecreesPage,
    DailyPage,
    ReportError,
    UploadModal,
    HomePage,
    LiberacaoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
