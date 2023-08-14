import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import ToastContainer from 'lightning/toastContainer';

export default class CustomToast extends LightningElement {
    connectedCallback() { 
        const toastContainer = ToastContainer.instance();
        toastContainer.maxShown = 3;
        toastContainer.toastPosition = 'top-right';
    }
  showError() {
        const evt = new ShowToastEvent({
            title: 'Salesforce Toast',
            message: 'Salesforce Bolt LWC Stack Example',
            variant: 'error'
        });
        this.dispatchEvent(evt);
    }
    showWarning() {
        const evt = new ShowToastEvent({
            title: 'Salesforce Toast',
            message: 'Salesforce Bolt LWC Stack Example',
            variant: 'warning'
        });
        this.dispatchEvent(evt);
    }
    showSuccess() {
        const evt = new ShowToastEvent({
            title: 'Salesforce Toast',
            message: 'Salesforce Bolt LWC Stack Example',
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }
    showInfo() {
        const evt = new ShowToastEvent({
            title: 'Salesforce Toast',
            message: 'Salesforce Bolt LWC Stack Example',
            variant: 'info'
        });
        this.dispatchEvent(evt);
    }
}

