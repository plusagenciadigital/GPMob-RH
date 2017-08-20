import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ProfilePersonal } from './modals/personal';
import { ProfileJobs } from './modals/jobs';
import { ProfileDocuments } from './modals/documents';
import { User, AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html',
  entryComponents: [ ProfilePersonal ]
})
export class ProfilePage {
 private usuario: User;

 
 constructor(public modalCtrl: ModalController, private auth: AuthServiceProvider) {
    this.usuario = this.auth.getUserInfo();
    //console.log(this.usuario.dadosPessoais);
    //console.log(this.usuario.dadosProfissionais);
    //console.log(this.usuario.documentos);
 }

  profileModalPersonal() {
    let profilePersonal = this.modalCtrl.create(ProfilePersonal, {dados: this.usuario.dadosPessoais});
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
