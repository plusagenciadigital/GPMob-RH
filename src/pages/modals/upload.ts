import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'upload',
  templateUrl: './upload.html'
})
export class UploadModal {
  private idParaAnexo: number;

  constructor(public viewCtrl: ViewController, public params: NavParams) {
  	this.idParaAnexo = params.get("idParaAnexo");
  }

  request() {
    console.log('clicked!');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  sendFile(file) {
    let id = this.idParaAnexo;
    let paramsAnexo = {anexo: file, id: id};
    this.auth.getUserApiRequest("http://hackathonapi.sefaz.al.gov.br/sfz_ficha_funcional_api/api/public/dadoFichaFuncional/anexo", "post", paramsAnexo)
    .subscribe(retorno => {
    	// Sucesso: requisição feita
	    this.viewCtrl.dismiss();    
    });
  }  
}
