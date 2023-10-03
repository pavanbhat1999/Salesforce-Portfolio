import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import PasswordObj from '@salesforce/schema/Password__c';
import Name from '@salesforce/schema/Password__c.Name';
import Value from '@salesforce/schema/Password__c.passwordvalue__c';
import searchName from '@salesforce/apex/passwordSearch.searchName';
//import encrypt from '@salesforce/apex/encrypt.passwordEncode';

export default class PasswordManager extends LightningElement {
    pskey="test123";
    psName;
    psValue;
    searchName;
    handleNameChange(e){
       this.psName = e.target.value;
    }
    handleValueChange(e){
        this.psValue = e.target.value;
     }
     async handleSubmit(e){
         console.log(this.psName+this.psValue);
         const fields = {};
         fields[Name.fieldApiName] = this.psName;
         //? Type 1 Encrypt using apex
         //const res = await encrypt({'passtxt':this.psValue});
         //? Typr 2 Encrypt using js
       
         fields[Value.fieldApiName] = this.psValue;
         const recordInput = { apiName: PasswordObj.objectApiName, fields };
         await createRecord(recordInput);
         alert('Password Saved Succesfully');


     }
     copyToClipboard(text) {
      // Create a temporary textarea element to hold the text
      const textarea = document.createElement('textarea');
      textarea.value = text;
      
      // Append the textarea element to the document
      document.body.appendChild(textarea);
      
      // Select the text in the textarea
      textarea.select();
      
      // Copy the selected text to the clipboard
      document.execCommand('copy');
      
      // Remove the temporary textarea element
      document.body.removeChild(textarea);
    }
     handleSearchName(e){
      this.searchName = e.target.value;
     }
     async handleSearch(e){
      console.log('Search CLicked',this.searchName);
      const res = await searchName({'Name':this.searchName});
      console.log(res);
      this.copyToClipboard(res);
      alert('Password copied to clipboard ');
     }
     
}