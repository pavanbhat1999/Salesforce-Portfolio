import { LightningElement,wire } from 'lwc';
import regUser from '@salesforce/apex/createUserLWC.RegisterExternalUser';
import wiretest from '@salesforce/apex/demowire.checkwire';

export default class ExpCreateCustomer extends LightningElement {
fname;
@wire(wiretest) wiredtest({error,data}){
    if(data){
        console.log(data);
    }
    console.log('hello');
};
// connectedCallback(){
//     wiretest().then(
//         (data) =>{
//             console.log(data);
//         }
//     )
// }
//Functions for handling actions
//onchange for firstname
onchangeFname(event){
    this.fname = event.target.value;
    console.log(this.fname);
}
handleSubmit(event) {
    console.log('Button Clicked');
    console.log('First Name'+this.fname);
    regUser({Name:this.fname}).then(
        (data)=>{
            console.log("Testing");
        }
    )
    .catch(
        error => {
            console.log(error);
        }
    )
   
    console.log(wiredname);
    
    
    
}

}