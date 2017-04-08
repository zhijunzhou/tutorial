import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {

    constructor(public toastCtrl: ToastController) {
    }

    show(message, duration = 5000) {
        let toast = this.toastCtrl.create({
        message: message,
        duration: duration
      });
      toast.present();
    }
}