import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class FormService {

    public issueList: Array<any>;

    public issue: Object;

    constructor() {
        this.issueList = [];
        this.issue = {
            id:'',
            issueType: '',
            priority: '',
            description: '',
            iemail: '',
        }
    }

    getIssue() {
        return this.issue;
    }

    setIssue(issue) {
        this.issue = Object.assign({}, issue);
    }

    getIssueList() {
        return this.issueList;
    }

    setIssueList(issueList) {
        [...this.issueList] = [...issueList];
    }

    setAttachment(attachment) {
        this.issue['attachment'] = attachment;
    }

}