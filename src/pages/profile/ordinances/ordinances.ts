import { Component } from '@angular/core';
import { User, AuthServiceProvider } from '../../../providers/auth-service/auth-service';


@Component({
  selector: 'ordinances',
  templateUrl: 'ordinances.html'
})
export class OrdinancesPage {
  ordinancesList;
  private usuario: User;

  constructor(private auth: AuthServiceProvider) {
    this.usuario = this.auth.getUserInfo();
    this.initializeItems();
  }

  initializeItems() {
    // Busca as portarias do usuário
    var portarias = this.usuario.dados.grupos[1].dados;
    this.ordinancesList = portarias;
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
