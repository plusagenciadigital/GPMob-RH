import { Component } from '@angular/core';
import { User, AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { ModalController } from 'ionic-angular';
import { ReportError } from '../../modals/report';

@Component({
  selector: 'licenses',
  templateUrl: 'licenses.html',
  entryComponents: [ ReportError ]
})
export class LicensesPage {
  private usuario: User;
  licensesList;

  constructor(public modalCtrl: ModalController, private auth: AuthServiceProvider) {
    this.usuario = this.auth.getUserInfo();
    this.initializeItems();
  }

  initializeItems() {
    this.licensesList = this.usuario.licencas;
  }

  reportErrorModal() {
    let reportErrorModal = this.modalCtrl.create(ReportError);
    reportErrorModal.present();
  }

  getItems(ev: any) {
    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      console.log(this.licensesList);
      this.licensesList = this.licensesList.filter((item) => {
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
