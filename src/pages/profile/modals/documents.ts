import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'profile-documents',
  templateUrl: './documents.html'
})
export class ProfileDocuments {
  constructor(public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
