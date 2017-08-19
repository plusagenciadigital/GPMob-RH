import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'profile-personal',
  templateUrl: './personal.html'
})
export class ProfilePersonal {
  constructor(public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
