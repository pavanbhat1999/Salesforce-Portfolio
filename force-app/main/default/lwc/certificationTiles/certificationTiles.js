import { LightningElement, wire } from 'lwc';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import getCertificationsList from '@salesforce/apex/CertificationListFetch.getAllCertifications';

export default class CertificationTiles extends LightningElement {


    certList;
    @wire(getCertificationsList) wiredEvents({ error, data }) {
        if (data) {
            this.certList = data;
        } else if (error) {
            this.error = error;
        }
    }
}