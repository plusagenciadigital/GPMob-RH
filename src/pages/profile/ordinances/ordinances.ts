import { Component } from '@angular/core';

@Component({
  selector: 'ordinances',
  templateUrl: 'ordinances.html'
})
export class OrdinancesPage {
  ordinancesList;

  constructor() {
    this.initializeItems();
  }

  initializeItems() {
    this.ordinancesList = [{
      descricao: 'Item 1 - The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.',
      dataInclusao: 1060041600000
    },
    {
      descricao: 'Item 2 - The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.',
      dataInclusao: 1060041600000
    },
    {
      descricao: 'Item 3 - The British use the term Neto "header", but the American term "head-shot" the English simply refuse to adopt.',
      dataInclusao: 1060041600000
    },
    {
      descricao: 'Item 4 - The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.',
      dataInclusao: 1060041600000
    }];
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
