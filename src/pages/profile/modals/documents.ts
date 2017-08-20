import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'profile-documents',
  templateUrl: './documents.html'
})
export class ProfileDocuments {
  public dados;

  constructor(public viewCtrl: ViewController, public params: NavParams) {
    this.dados = params.get('dados')
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
