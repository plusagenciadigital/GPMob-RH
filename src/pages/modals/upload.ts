import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'upload',
  templateUrl: './upload.html'
})
export class UploadModal {
  constructor(public viewCtrl: ViewController) {}

  request() {
    console.log('clicked!');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
