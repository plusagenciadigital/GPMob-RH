import { Component } from '@angular/core';
import { ViewController, LoadingController, ToastController } from 'ionic-angular';

@Component({
  selector: 'report',
  templateUrl: './report.html'
})
export class ReportError {
  constructor(
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
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
