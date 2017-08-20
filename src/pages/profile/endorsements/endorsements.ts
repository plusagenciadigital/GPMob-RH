import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ReportError } from '../../modals/report';
import { User, AuthServiceProvider } from '../../../providers/auth-service/auth-service';

@Component({
  selector: 'endorsements',
  templateUrl: 'endorsements.html',
  entryComponents: [ ReportError ]
})
export class EndorsementsPage {
  private usuario: User;
  endorsementsList;

  constructor(private auth: AuthServiceProvider, public modalCtrl: ModalController) {
    this.usuario = this.auth.getUserInfo();
    this.initializeItems();
  }

  initializeItems() {
    var averbacoes = this.usuario.averbacoes;
    this.endorsementsList = averbacoes;
  }

  reportErrorModal() {
    let reportErrorModal = this.modalCtrl.create(ReportError);
    reportErrorModal.present();
  }

  getItems(ev: any) {
    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      console.log(this.endorsementsList);
      this.endorsementsList = this.endorsementsList.filter((item) => {
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
