import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IssueFormPage } from '../issue-form/issue-form';
import { DeviceService } from '../../services/DeviceService';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  isMobile = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public devService: DeviceService) {    
    this.isMobile = devService.isMobile();
  }

  start(event) {
    this.navCtrl.push(IssueFormPage);
  }

}
