import { Component } from '@angular/core';
import { ViewController, ModalController, NavParams } from 'ionic-angular';
import { UploadModal } from '../../modals/upload';

@Component({
  selector: 'profile-personal',
  templateUrl: './personal.html'
})
export class ProfilePersonal {
  public alterarPerfil: Object = {nome: '', endereco: ''};
  constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, public params: NavParams) {
    this.usuario = params.get("dados");
  }

  uploadModal(id) {
    let uploadModal = this.modalCtrl.create(UploadModal, {idParaAnexo: id});
    uploadModal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  updateProfile(arquivo = null) {
    let parametros = {descricao: this.alterarPerfil.nome, tipoDadoFichaFuncional: 1};
    this.auth.getUserApiRequest("http://hackathonapi.sefaz.al.gov.br/sfz_ficha_funcional_api/api/public/dadoFichaFuncional", "post", parametros)
    .subscribe(retorno => {
      // Deu certo. Chame o modal de upload de anexo e vamos tentar utilizá-lo.
      this.uploadModal(retorno.id);
    },
    );    
  }

}
