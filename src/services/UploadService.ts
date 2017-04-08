import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class UploadService {

    serviceServer = 'http://localhost:8080';
    uploadUrl = this.serviceServer + "/v2/upload";

    constructor(private http: Http) {
    }

    upload(files, cb) {
        let headers = new Headers();
        var formParams = new FormData();

        headers.set('Content-Type', 'multipart/form-data');

        if(files && files.length > 0) {
            formParams.append('file',files[0]);
        }
        
        return this.http.post(
            this.uploadUrl, formParams)
            .map(res => res.json())
            .subscribe(
                data => { cb(null, data)},
                err => { cb(err); }
            );
    }
}