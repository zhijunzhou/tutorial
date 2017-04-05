import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class UploadService {

    constructor(private http: Http) {
    }

    upload(files) {
        var headers = new Headers();
        var formParams = new FormData();

        headers.set('Content-Type', 'multipart/form-data');

        if(files && files.length > 0) {
            formParams.append('file',files[0]);
        }
        
        return this.http.post(
            'http://localhost:8080/v2/upload', formParams)
            .map(res => res.json())
            .subscribe(
                data => { console.log(data); },
                err => { console.log(err); }
            );
    }
}