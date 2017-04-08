import { Component } from '@angular/core';
import { FormService } from '../../services/FormService';
import { UploadService } from '../../services/UploadService';

@Component({
  selector: 'page-confirm-form',
  templateUrl: 'confirm-form.html'
})
export class ConfirmFormPage {

  issue = {};
  imgUrl = "../../assets/images/p3_blessing.png";

  constructor(public formService: FormService,
    public uploadService: UploadService) {
    this.issue = formService.getIssue();
    // this.issue.attachement.path
    this.imgUrl = uploadService.serviceServer + "/" + this.issue["attachement"]["path"];
  }

  toNext(event) {
    // save to backend db
  }

}
