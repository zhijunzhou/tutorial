import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ConfirmFormPage } from '../confirm-form/confirm-form';
import { DeviceService } from '../../services/DeviceService';
import { UploadService } from '../../services/UploadService';
import { ToastService } from '../../services/ToastService';
import { FormService } from '../../services/FormService';

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
    public toastService: ToastService,
    public formService: FormService,
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
      let attachment = document.getElementById('attachment');

      if (attachment) {
        attachment.click();
      }
    }
  }

  upload(event) {
    let target = event.target || event.srcElement;
    let files = target.files;
    let self = this;
    this.uploadService.upload(files, function(err, data) {
      if(err) {
        self.toastService.show('Something went wrong');
        return;
      } 
      self.formService.setIssue(data.info);
      self.imageUrl = self.uploadService.serviceServer + "/" + data.info.attachement.path;
    });
  }

  onSubmit() { 
    const ctrl_issueType = this.issueForm.controls['issueType'];
    const ctrl_priority = this.issueForm.controls['priority'];
    const ctrl_description = this.issueForm.controls['description'];
    const ctrl_email = this.issueForm.controls['iemail'];
    const ctrl_imageUrl = this.issueForm.controls['imageUrl'];

    if (ctrl_priority.valid && ctrl_description.valid
      && ctrl_email.valid && ctrl_issueType.valid) {    
        let issue = this.formService.getIssue();

        issue['description'] = ctrl_description.value;
        issue['iemail'] = ctrl_email.value;
        issue['issueType'] = ctrl_issueType.value;
        issue['priority'] = ctrl_priority.value;
        this.navCtrl.push(ConfirmFormPage);

    } else {
      this.toastService.show('Please complete all information!');
    }
  }

}
