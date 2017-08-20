import { Component } from '@angular/core';

@Component({
  selector: 'stocking',
  templateUrl: 'stocking.html'
})
export class StockingPage {
  stockingList;

  constructor() {
    this.initializeItems();
  }

  initializeItems() {
    this.stockingList = [{
      descricao: 'Item 1 - O CARGO GTR-5 FOI EXTINTO PELA LEI DELEGADA N° 44, DE 08/04/2011, PUBLICADA NO DOE DE 09/04/2011. CONFORME Decreto n° 11.824, de 15/04/2011, O Governador do Estado de Alagoas, no uso das atribuições que lhe confere o inciso XIV do art. 107 da Constituição Estadual, RESOLVE nomear Margarida Maria Ferreira Fontan, portadora do CPF n° 208.173.474-53',
      dataInclusao: 1060041600000
    },
    {
      descricao: 'Item 2 - O CARGO GTR-5 FOI EXTINTO PELA LEI DELEGADA N° 44, DE 08/04/2011, PUBLICADA NO DOE DE 09/04/2011. CONFORME Decreto n° 11.824, de 15/04/2011, O Governador do Estado de Alagoas, no uso das atribuições que lhe confere o inciso XIV do art. 107 da Constituição Estadual, RESOLVE nomear Margarida Maria Ferreira Fontan, portadora do CPF n° 208.173.474-53',
      dataInclusao: 1060041600000
    },
    {
      descricao: 'Item 3 - O CARGO GTR-5 FOI EXTINTO PELA LEI DELEGADA N° 44, DE 08/04/2011, PUBLICADA NO DOE DE 09/04/2011. CONFORME Decreto n° 11.824, de 15/04/2011, O Governador do Estado de Alagoas, no uso das atribuições que lhe confere o inciso XIV do art. 107 da Constituição Estadual, RESOLVE nomear Margarida Maria Ferreira Fontan, portadora do CPF n° 208.173.474-53',
      dataInclusao: 1060041600000
    },
    {
      descricao: 'Item 4 - O CARGO GTR-5 FOI EXTINTO PELA LEI DELEGADA N° 44, DE 08/04/2011, PUBLICADA NO DOE DE 09/04/2011. CONFORME Decreto n° 11.824, de 15/04/2011, O Governador do Estado de Alagoas, no uso das atribuições que lhe confere o inciso XIV do art. 107 da Constituição Estadual, RESOLVE nomear Margarida Maria Ferreira Fontan, portadora do CPF n° 208.173.474-53',
      dataInclusao: 1060041600000
    }];
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
