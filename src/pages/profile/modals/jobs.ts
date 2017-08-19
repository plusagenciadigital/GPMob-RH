import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'profile-jobs',
  templateUrl: './jobs.html'
})
export class ProfileJobs {
  constructor(public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
