import { Component } from '@angular/core';
import { User, AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { ModalController } from 'ionic-angular';
import { ReportError } from '../../modals/report';

@Component({
  selector: 'daily',
  templateUrl: 'daily.html',
  entryComponents: [ ReportError ]
})
export class DailyPage {
  private usuario: User;
  dailyList;

  constructor(public modalCtrl: ModalController, private auth: AuthServiceProvider) {
    this.usuario = this.auth.getUserInfo();
    this.initializeItems();
  }

  initializeItems() {
    this.dailyList = this.usuario.portarias["Diárias"] != undefined ? this.usuario.portarias["Diárias"] : [];   
  }

  reportErrorModal() {
    let reportErrorModal = this.modalCtrl.create(ReportError);
    reportErrorModal.present();
  }

  getItems(ev: any) {
    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      console.log(this.dailyList);
      this.dailyList = this.dailyList.filter((item) => {
        return (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
