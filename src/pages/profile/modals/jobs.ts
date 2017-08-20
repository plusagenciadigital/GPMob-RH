import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'profile-jobs',
  templateUrl: './jobs.html'
})
export class ProfileJobs {
  public dados;

  constructor(public viewCtrl: ViewController, public params: NavParams) {
    this.dados = params.get('dados')
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
