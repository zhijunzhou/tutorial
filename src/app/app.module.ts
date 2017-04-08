import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { IssueFormPage } from '../pages/issue-form/issue-form';
import { ConfirmFormPage } from '../pages/confirm-form/confirm-form';

import { DeviceService } from '../services/DeviceService';
import { UploadService } from '../services/UploadService';
import { FormService } from '../services/FormService';
import { ToastService } from '../services/ToastService';
import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    IssueFormPage,
    ConfirmFormPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    IssueFormPage,
    ConfirmFormPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    DeviceService,
    UploadService,
    FormService,
    ToastService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
