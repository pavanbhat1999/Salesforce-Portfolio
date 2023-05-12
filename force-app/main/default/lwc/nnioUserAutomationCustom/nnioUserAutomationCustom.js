import { LightningElement } from 'lwc';
import searchUser from '@salesforce/apex/UserSearch.searchUser';
import createUserModal from 'c/nnioCreateUserFlow';
import insertUserBulk from '@salesforce/apex/QueueFetchFromUser.insertUserBulk';
import userModal from 'c/nnioUserModalForm';
import {ShowToastEvent} from "lightning/platformShowToastEvent";
import { NavigationMixin } from 'lightning/navigation';

 const actions = [
     { label: 'View', name: 'View' },
     { label: 'Edit', name: 'Edit' },
 ];
const columns = [
    { 
        label: 'Name', 
        fieldName: 'newID', 
        type: 'url',
        typeAttributes: { 
            label: { fieldName: 'Name' },
            } 
    },
    {
        type: 'button-icon',
        label: 'View',
        // initialWidth: 75,
        typeAttributes: {
            iconName: 'action:preview',
            title: 'Preview',
            variant: 'brand',
            alternativeText: 'View',
            rowActions: actions
        }
    },
    {
        type: 'button-icon',
        label: 'Edit',
        // initialWidth: 75,
        typeAttributes: {
            iconName: 'action:edit',
            title: 'Edit',
            variant: 'brand',
            alternativeText: 'Edit',
            rowActions: actions
        }
    },

 
];
export default class NnioUserAutomationCustom extends NavigationMixin(LightningElement) {
    searchUserName;
    existingUserList;
    selectedUser;
    columns = columns;
    userQueueList;
    datacsv;
    classicUserPageURL;
  
    async connectedCallback(){
        //? should use initial load or not
        this.initUser();
        console.log(window.location.origin)
        this.classicUserPageURL = window.location.origin+'/lightning/setup/ManageUsers/home';
    }
    // Init Data - User Details
    async initUser(){
        let loadUser = await searchUser({UserName : ' '});
        this.existingUserList = loadUser.map(
            (data) => ({...{'Name':data.Name,'Id':data.Id,'newID':'/'+data.Id}})
        )
    }
    // clearing the temporary data 
    clearTmpData(){
        this.existingUserList = null;
        this.searchUserName = null;
        this.values.length = 0;
        this.options.length = 0;
    }
    //* Currently working on it
    // File upload handler
    handleFileUpload(event) {
        const files = event.detail.files;
    
        if (files.length > 0) {
          const file = files[0];
          
          // start reading the uploaded csv file
          this.read(file);
        }
      }
      async read(file) {
        try {
          const result = await this.load(file);
          
          // execute the logic for parsing the uploaded csv file
          this.parse(result);
        } catch (e) {
          this.error = e;
        }
      }
      async load(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = () => {
            reject(reader.error);
          };
          reader.readAsText(file);
        });
      }
      async parse(csv) {
  // parse the csv file and treat each line as one item of an array
  const lines = csv.split(/\r\n|\n/);
  console.log('lines',JSON.stringify(lines));
  
//   // parse the first line containing the csv column headers
  const headers = lines[0].split(',');
  console.log('headers',JSON.stringify(headers))
  const data = [];
  
  //? why -1 is required
  lines.forEach((line, i) => {
    if (i === 0) return;

    const obj = {};
    const currentline = line.split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    console.log('each obj',JSON.stringify(obj));
    data.push(obj);
  });
  
  // assign the converted csv data for the lightning datatable
  //this.datacsv = data.map((data)=>(data.NAME));
  this.datacsv = data;
  console.log('data',JSON.stringify(this.datacsv));
  try {
    await insertUserBulk({'userJSON':JSON.stringify(this.datacsv)});
  } catch (error) {
    alert('Error happened during dml operations \n');
    alert(error.body.message)
  }
 
  //? insert one by one
  // for (let index = 0; index < this.datacsv.length; index++) {
  //   console.log('index',index,this.datacsv[index])
  //   await insertUserBulk(this.datacsv[index]);
    
  // }
 
}
     //*END Currently working on it 
    // onchange - Getting user name which is to be searched 
    changeSearchUserName(event){
        console.log('Search User Changing = '+event.target.value);
        this.searchUserName = event.target.value;
    } 
    // onkeypress - when enter is pressed
    handleEnter(event){
        console.log(event.keyCode);
        if(event.keyCode === 13){
            this.handleSubmitUser();
        }
    }
    // onsubmit - Getting user name which is to be searched 
    async handleSubmitUser(event){
        // clear the selected user selection
        this.selectedUser = null;
        console.log("User to be searched = ",this.searchUserName);
        const res = await searchUser({UserName : this.searchUserName});
        // TODO: Optimize and refactor newres 
        // get details and make a url out of it to navigate  
        let newres = [];
        for(var j=0;j<res.length;j++)
        newres.push({'Name':res[j].Name,'Id':res[j].Id, 'newID':'/'+res[j].Id});  
        this.existingUserList = newres;
    }
    
    // onrowaction - Clicked on action icons on data table
    async onRowActionClick(event){
        console.log(event.detail.action.title);
        if(event.detail.action.title === 'Preview'){
            const result = await userModal.open({
                size: 'large',
                description: 'Accessible description of modal\'s purpose',
                content : [event.detail.row.Id,true],
            });
            console.log('User result = ',result);
            //FIXME: Provide classic access navigate to page
            // console.log(this.record.Id);
            // this[NavigationMixin.Navigate]({
            //     type: 'standard__recordPage',
            //     attributes: {
            //         recordId: this.record.Id,
            //         objectApiName: 'User', // objectApiName is optional
            //         actionName: 'view'
            //     }
            // });
        }
        if(event.detail.action.title === 'Edit'){
            const result = await userModal.open({
                size: 'large',
                description: 'Accessible description of modal\'s purpose',
                content : [event.detail.row.Id,false],
            });
            console.log('User result = ',result);
            //! find optimal way to reload only apex
            //window.location.reload()
            //this.clearTmpData();
        }
    }

    // opening user create modal
    async OpenUserCreateModal(event){
        const result = await createUserModal.open({
            size: 'large',
            description: 'Accessible description of modal\'s purpose',
            content: 'Passed into content api',
        });
        console.log('flow result = ',result);
    }
}