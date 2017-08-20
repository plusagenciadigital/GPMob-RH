import { Component } from '@angular/core';
import { ViewController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'upload',
  templateUrl: './upload.html'
})
export class UploadModal {
<<<<<<< HEAD
  private idParaAnexo: number;
  public base64File: string;
  public auth;

  constructor(public viewCtrl: ViewController, 
  	public params: NavParams,     
  	public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private camera: Camera) {
  	this.auth = params.get("auth");
  	this.idParaAnexo = params.get("idParaAnexo");
  }

  request() {
    let loader = this.loadingCtrl.create({
      content: "Enviando solicitacão..."
    });
    const toast = this.toastCtrl.create({
      message: "Sua solicitação foi enviada com sucesso",
      showCloseButton: true,
      closeButtonText: 'Fechar'
    });

    loader.present();

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = imageData;
      console.log(base64Image);
    }, (err) => {
      // Handle error
    });

    setTimeout(() => {
      loader.dismiss();
    }, 1000)
    setTimeout(() => {
      this.viewCtrl.dismiss();
      toast.present();
    }, 1500);
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
