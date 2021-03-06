import { Component } from '@angular/core';
import { ViewController, ModalController, NavParams } from 'ionic-angular';
import { UploadModal } from '../../modals/upload';

@Component({
  selector: 'profile-jobs',
  templateUrl: './jobs.html'
})
export class ProfileJobs {
  public dados;

  constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, public params: NavParams) {
    this.dados = params.get('dados')
  }

  uploadModal() {
    let uploadModal = this.modalCtrl.create(UploadModal);
    uploadModal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
