import { Component } from '@angular/core';
import { User, AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { ModalController } from 'ionic-angular';
import { ReportError } from '../../modals/report';

@Component({
  selector: 'decrees',
  templateUrl: 'decrees.html',
  entryComponents: [ ReportError ]
})
export class DecreesPage {
  private usuario: User;
  decreesList;

  constructor(private auth: AuthServiceProvider, public modalCtrl: ModalController) {
    this.usuario = this.auth.getUserInfo();
    this.initializeItems();
  }

  initializeItems() {
    this.decreesList = this.usuario.decretos;
  }

  reportErrorModal() {
    let reportErrorModal = this.modalCtrl.create(ReportError);
    reportErrorModal.present();
  }

  getItems(ev: any) {
    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      console.log(this.decreesList);
      this.decreesList = this.decreesList.filter((item) => {
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
