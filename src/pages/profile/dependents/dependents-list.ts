import { Component } from '@angular/core';
import { ItemSliding } from 'ionic-angular';
import { User, AuthServiceProvider } from '../../../providers/auth-service/auth-service';


@Component({
  selector: 'dependents-list',
  templateUrl: 'dependents-list.html'
})
export class DependentsListPage {
  private usuario: User;
  dependentsList;

  constructor(private auth: AuthServiceProvider) {
    this.usuario = this.auth.getUserInfo();
    this.initializeItems();
  }

  initializeItems() {
    var dependentes = this.usuario.dados.dependentes;
    this.dependentsList = dependentes; 
  }

  delete(item: ItemSliding) {
    console.log(item);
    item.close();
  }

  getItems(ev: any) {
    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      console.log(this.dependentsList);
      this.dependentsList = this.dependentsList.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
