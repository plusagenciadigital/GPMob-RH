import { Component } from '@angular/core';
import { User, AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { ModalController } from 'ionic-angular';
import { ReportError } from '../../modals/report';

@Component({
  selector: 'stocking',
  templateUrl: 'stocking.html',
  entryComponents: [ ReportError ]
})
export class StockingPage {
  private usuario: User;
  stockingList;

  constructor(public modalCtrl: ModalController, private auth: AuthServiceProvider) {
    this.usuario = this.auth.currentUser;
    this.initializeItems();
  }

  initializeItems() {    
    this.stockingList = this.usuario.portarias["Lotação"] != undefined ? this.usuario.portarias["Lotação"] : [];
  }

  reportErrorModal() {
    let reportErrorModal = this.modalCtrl.create(ReportError);
    reportErrorModal.present();
  }

  getItems(ev: any) {
    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      console.log(this.stockingList);
      this.stockingList = this.stockingList.filter((item) => {
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
