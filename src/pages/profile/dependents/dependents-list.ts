import { Component } from '@angular/core';
import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'dependents-list',
  templateUrl: 'dependents-list.html'
})
export class DependentsListPage {
  dependentsList;

  constructor() {
    this.initializeItems();
  }

  initializeItems() {
    this.dependentsList = [{
      nome: 'Maria Clara',
      tipoParentesco: {
        codigo: 3,
        nome: 'Filho(a)'
      },
      dataNascimento: 1060041600000
    },
    {
      nome: 'Beatrice',
      tipoParentesco: {
        codigo: 3,
        nome: 'Filho(a)'
      },
      dataNascimento: 1159660800000
    },
    {
      nome: 'Joana Silva Marina',
      tipoParentesco: {
        codigo: 2,
        nome: 'Mãe'
      },
      dataNascimento: 1486080000000
    },
    {
      nome: 'José Marcelo',
      tipoParentesco: {
        codigo: 1,
        nome: 'Pai'
      },
      dataNascimento: 1159660800000
    }];
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
