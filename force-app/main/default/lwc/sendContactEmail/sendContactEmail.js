import { LightningElement, api, wire, track } from 'lwc';
import sendEmailController from '@salesforce/apex/sendEmailController.sendEmail';

export default class SendContactEmail extends LightningElement {
    subject = 'Test Email'
    body = 'Hello'
    toSend = 'prbhat07@gmail.com'

    sendContactEmail(){
        alert('Email sending');
        const recordInput = {body: this.body, toSend: this.toSend, subject: this.subject}  //You can send parameters
        sendEmailToController(recordInput)
        .then( () => {
            //If response is ok
            alert('Email sent successfully');
        }).catch( error => {
            //If there is an error on response
            alert('Error sending email');
        })

    }
    
}