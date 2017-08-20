import { Component } from '@angular/core';
import { ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'upload',
  templateUrl: './upload.html'
})
export class UploadModal {
  constructor(
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private camera: Camera
  ) {}

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
      let base64Image = 'data:image/jpeg;base64,' + imageData;
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
}
