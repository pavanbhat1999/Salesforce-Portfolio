import { LightningElement,api,wire } from 'lwc';
import { createRecord,getRecord } from 'lightning/uiRecordApi';
import NOTES_OBJ from '@salesforce/schema/MyNotes__c';
import Description from '@salesforce/schema/MyNotes__c.Description__c';
import getNotes from '@salesforce/apex/getNotes.getAllNotes';
import { refreshApex } from '@salesforce/apex';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/MyMessageChannel__c";


export default class NotesDisplay extends LightningElement {
    notesList;
    subscription = null;
    recordId;
    @wire(MessageContext)
    messageContext;
    subscribeToMessageChannel() {
    
            this.subscription = subscribe(
                this.messageContext,
                SAMPLEMC,
                (message) => this.handleMessage(message)
            );
        
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Handler for message received by component
    handleMessage(message) {
       
        console.log('msg'+message);
   
        getNotes().then(
            (data) => {
                console.log('data from apex = ' + JSON.stringify(data));
                this.notesList = data;
            }
        )
        
    }

    connectedCallback()
    {
        this.subscribeToMessageChannel();
        getNotes().then(
            (data) => {
                console.log('data from apex = ' + JSON.stringify(data));
                this.notesList = data;
            }
        )
    
    
    }


}