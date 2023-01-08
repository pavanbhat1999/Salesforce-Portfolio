import { LightningElement,api } from 'lwc';

import objectApiName from '@salesforce/schema/Feedback__c';
import FName from '@salesforce/schema/Feedback__c.Name';
import FDescription from '@salesforce/schema/Feedback__c.Feedback_Description__c';
import Ftype from '@salesforce/schema/Feedback__c.Type_of_Feedback__c';
import SenderEmail from '@salesforce/schema/Feedback__c.Sender_Email__c';


export default class FeedbackFetch extends LightningElement {

    
    fields = [FName,SenderEmail,FDescription,Ftype];
}