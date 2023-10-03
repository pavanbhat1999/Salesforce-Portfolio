import { LightningElement,wire,api } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

export default class LifeCycleHookChild extends LightningElement {
    @wire(getRecord, { recordId: '0015i00000MOzeKAAT', fields: [ACCOUNT_NAME_FIELD] })
    recwire;
    constructor(){
        super();
        console.log('constructor called child');
    }
    renderedCallback(){
        console.log('Rendered callback child');
        console.log(this.recwire);
    }
    connectedCallback(){
        console.log('Connected Callback child');
        console.log(this.recwire);
    }
}