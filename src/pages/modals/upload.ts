import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'upload',
  templateUrl: './upload.html'
})
export class UploadModal {
  private idParaAnexo: number;
  public base64File: string;
  public auth;

  constructor(public viewCtrl: ViewController, public params: NavParams) {
  	this.auth = params.get("auth");
  	this.idParaAnexo = params.get("idParaAnexo");
  }

  request() {
    console.log('clicked!');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64File = imageData;
    }, (err) => {
        console.log(err);
    });
  }


  sendFile() {
    let id = this.idParaAnexo;
    let paramsAnexo = {anexo: this.base64File, id: id};
    this.auth.getUserApiRequest("http://hackathonapi.sefaz.al.gov.br/sfz_ficha_funcional_api/api/public/dadoFichaFuncional/anexo", "post", paramsAnexo)
    .subscribe(retorno => {
    	// Sucesso: requisição feita, anexo enviado
	    this.viewCtrl.dismiss();    
    });
  }  
}
