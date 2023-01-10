import { LightningElement,api,wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import NOTES_OBJ from '@salesforce/schema/MyNotes__c';
import Description from '@salesforce/schema/MyNotes__c.Description__c';
import { publish, MessageContext,createMessageContext } from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/MyMessageChannel__c";

export default class NotesInsert extends LightningElement {

note;
context = createMessageContext();

handleOnChange(event){
    console.log('changes ');
    console.log(event.target.value);
    this.note = event.target.value;
}
handleclick(){
    console.log('Button clicked');
    const fields = {};
    fields[Description.fieldApiName] = this.note;

    const recordInput = { apiName: NOTES_OBJ.objectApiName, fields };

    createRecord(recordInput)
        .then(account => {
            this.accountId = account.id;
            const payload = { recordId: 'sadsdasd' };

        publish(this.context, SAMPLEMC, payload);
        })
        .catch(error => {
            console.error(error);
        });

        
       
       
        
}


}