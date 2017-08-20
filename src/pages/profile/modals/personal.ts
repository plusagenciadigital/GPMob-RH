import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';
import { UploadModal } from '../../modals/upload';

@Component({
  selector: 'profile-personal',
  templateUrl: './personal.html'
})
export class ProfilePersonal {
  constructor(public viewCtrl: ViewController, public modalCtrl: ModalController) {}

  uploadModal() {
    let uploadModal = this.modalCtrl.create(UploadModal);
    uploadModal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
