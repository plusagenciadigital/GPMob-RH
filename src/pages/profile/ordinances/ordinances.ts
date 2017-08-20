import { Component } from '@angular/core';
import { User, AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { ModalController } from 'ionic-angular';
import { ReportError } from '../../modals/report';


@Component({
  selector: 'ordinances',
  templateUrl: 'ordinances.html',
  entryComponents: [ ReportError ]
})
export class OrdinancesPage {
  ordinancesList;
  private usuario: User;

  constructor(private auth: AuthServiceProvider, public modalCtrl: ModalController) {
    this.usuario = this.auth.getUserInfo();
    this.initializeItems();
  }

  initializeItems() {
    // Busca as portarias do usuário
    var portarias = Array();
    var portariasUsuario = this.usuario.portarias;
    var tiposDePortarias = ["Assessoramentos", "Chefias", "Penalidades", "Designação para compor Comissão", "Plantão", "Apostilamento de Quinquênios", "Abono Permanência"];
    
    for (var index in tiposDePortarias) {
      var nomeTipo = tiposDePortarias[index];
      console.log(portariasUsuario[nomeTipo]);
      if(portariasUsuario[nomeTipo] != undefined) {
        for(var pIndex in portariasUsuario[nomeTipo]) {
          portarias.push(portariasUsuario[nomeTipo][pIndex]);
        }
      }    
    }

    console.log(portarias);
    this.ordinancesList = portarias;
  }

  reportErrorModal() {
    let reportErrorModal = this.modalCtrl.create(ReportError);
    reportErrorModal.present();
  }

  getItems(ev: any) {
    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      console.log(this.ordinancesList);
      this.ordinancesList = this.ordinancesList.filter((item) => {
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
