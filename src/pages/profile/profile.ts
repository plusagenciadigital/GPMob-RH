import { Component } from '@angular/core';
import { ModalController, AlertController } from 'ionic-angular';
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
 private idParaAnexo: number;

 constructor(public modalCtrl: ModalController, public alertCtrl: AlertController, private auth: AuthServiceProvider) {
    this.usuario = this.auth.getUserInfo();
 }

  profileModalPersonal() {
    let profilePersonal = this.modalCtrl.create(ProfilePersonal, {dados: this.usuario});
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

  updateProfile(arquivo = null) {
    let parametros = {descricao: "Clenisson", tipoDadoFichaFuncional: 2};
    this.auth.getUserApiRequest("http://hackathonapi.sefaz.al.gov.br/sfz_ficha_funcional_api/api/public/dadoFichaFuncional", "post", parametros)
    .subscribe(retorno => {
      this.idParaAnexo = retorno.id;
    },
    erro => {
      // Mensagem de erro
    }
    );
  }

  sendFile(file) {
    let id = this.idParaAnexo;
    let paramsAnexo = {anexo: file, id: id};
    this.auth.getUserApiRequest("http://hackathonapi.sefaz.al.gov.br/sfz_ficha_funcional_api/api/public/dadoFichaFuncional/anexo", "post", paramsAnexo)
    .subscribe(retorno => {
      // Alerta informando que o anexo foi enviado com sucesso.
    });
  }


  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
