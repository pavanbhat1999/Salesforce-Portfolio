import { LightningElement,wire,api } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

export default class LifeCycleHookParent extends LightningElement {
    childVisible=false;
    // @wire(getRecord, { recordId: '0015i00000MOzeKAAT', fields: [ACCOUNT_NAME_FIELD] })
    // recwire;
    showHide(){
        this.childVisible=!this.childVisible;
        console.log(this.recwire);
    }
    constructor(){
        super();
        console.log('Constructor called parent');
    }
    connectedCallback(){
        console.log('Connected callback parent');
        console.log(this.recwire);
    }
    renderedCallback(){
        console.log('Rendered callback parent');
        console.log(this.recwire);
    }
    disconnectedCallback(){
        console.log('disconnected callback parent');
    }
    errorCallback(){
        console.log('Error callback parent');
    }
}