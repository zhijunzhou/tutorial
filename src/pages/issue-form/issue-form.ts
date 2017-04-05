import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ConfirmFormPage } from '../confirm-form/confirm-form';
import { DeviceService } from '../../services/DeviceService';
import { UploadService } from '../../services/UploadService';


@Component({
  selector: 'page-issue-form',
  templateUrl: 'issue-form.html'
})
export class IssueFormPage {
  isMobile = false;
  issueForm: FormGroup;

  issueType: any;
  priority: any;
  description: any;
  iemail: any;
  imageUrl: any;

  static validateExt(c: FormControl) : {[key: string]: boolean}{
    let extension = ['png', 'jpeg', 'gif'];
    return extension.indexOf(c.value) ? null : {valid : false};
  };

  constructor(
    private camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    public devService: DeviceService,
    public uploadService: UploadService,
    public toastCtrl: ToastController,
    public builder: FormBuilder) {
    this.isMobile = devService.isMobile();

    this.issueForm = builder.group({
      issueType: ['', Validators.required],
      priority: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      iemail: ['', Validators.required],
    });

    this.description = this.issueForm.controls['description'];
    this.iemail = this.issueForm.controls['iemail'];
    this.issueType = this.issueForm.controls['issueType'];
    this.priority = this.issueForm.controls['priority'];
    this.imageUrl = this.issueForm.controls['imageUrl'];
  }

  takePic() {
    const options = {
      qulity: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
    }

    if (this.isMobile) {
      this.camera.getPicture(options).then((iamgeData) => {
        let base64Image = 'data:image/jpeg;base63,' + ImageData;
        console.log(base64Image);
      }, (err) => {
        // handle error
      });
    } else {
      var attachment = document.getElementById('attachment');

      if (attachment) {
        attachment.click();
      }
    }
  }

  upload(event) {
    let target = event.target || event.srcElement;
    let files = target.files;
    this.uploadService.upload(files);
  }

  onSubmit() { 
    console.log(this.issueForm.value);
    const ctrl_issueType = this.issueForm.controls['issueType'];
    const ctrl_priority = this.issueForm.controls['priority'];
    const ctrl_description = this.issueForm.controls['description'];
    const ctrl_email = this.issueForm.controls['iemail'];
    const ctrl_imageUrl = this.issueForm.controls['imageUrl'];

    if (ctrl_imageUrl.valid && ctrl_description.valid
      && ctrl_email.valid && ctrl_issueType.valid
      && ctrl_priority.valid) {    
        this.navCtrl.push(ConfirmFormPage);
    } else {
      let toast = this.toastCtrl.create({
        message: 'Please complete all information!',
        duration: 5000
      });
      toast.present();
    }
  }

}
