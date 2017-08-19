import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ProfilePersonal } from './modals/personal';
import { ProfileJobs } from './modals/jobs';
import { ProfileDocuments } from './modals/documents';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html',
  entryComponents: [ ProfilePersonal ]
})
export class ProfilePage {
 constructor(public modalCtrl: ModalController) {}

  profileModalPersonal() {
    let profilePersonal = this.modalCtrl.create(ProfilePersonal);
    profilePersonal.present();
  }
  profileModalJobs() {
    let profileJobs = this.modalCtrl.create(ProfileJobs);
    profileJobs.present();
  }
  profileModalDocuments() {
    let profileDocuments = this.modalCtrl.create(ProfileDocuments);
    profileDocuments.present();
  }
}
