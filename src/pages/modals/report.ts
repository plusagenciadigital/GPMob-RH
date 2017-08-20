import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'report',
  templateUrl: './report.html'
})
export class ReportError {
  constructor(public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
