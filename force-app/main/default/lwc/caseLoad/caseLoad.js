import { LightningElement } from 'lwc';
import insertCaseBulk from '@salesforce/apex/caseDataLoad.insertCaseBulk';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CaseLoad extends LightningElement {
    inputFileStatus;
    allCSVdata;
    headersCSV;
    showToastSubmit() {
      const event = new ShowToastEvent({
          title: 'Success',
          variant:'Success',
          message:
              'Data Submitted Successfully',
      });
      this.dispatchEvent(event);
  }
    async handleFileUploadChange(e){
        console.log(e.target.files);
        const file = e.target.files[0];
        if(file){
            console.log('File Loaded ');
            const data = await this.load(file);
            console.log(file);
            this.allCSVdata = data.split(/\r\n|\n|\r/);
            this.headersCSV = this.allCSVdata[0].split(',');
            // console.log(JSON.stringify(this.headersCSV));
            // console.log(JSON.stringify(this.allCSVdata));
            this.inputFileStatus = 'Success Uploading file : '+file.name+' You can press submit to load data';
        }
    }
    //load file function
    load(file) {
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
      // onclick create record created
      async handleSubmit(e){
        console.log('Submit Clicked ');
        console.log(JSON.stringify(this.headersCSV));
        console.log(JSON.stringify(this.allCSVdata));

        const data=[];
        this.allCSVdata.forEach((line, i,array) => {
          if (i === 0 || i === array.length - 1) return; // Skip the first and last lines

          const obj = {};
          const currentLine = line.split(',');

          for (let j = 0; j < this.headersCSV.length; j++) {
            obj[this.headersCSV[j]] = currentLine[j];
          }
          console.log('each obj',JSON.stringify(obj));
          data.push(obj);
        });
        
        
        console.log('data = ',JSON.stringify(data));
        try {
          // await insertUserBulk({'userJSON':JSON.stringify(this.datacsv)});
          const result = await insertCaseBulk({'caseJson':JSON.stringify(data)});
          //this.showToastSubmit();
          alert(result);
        } catch (error) {
          alert('Error:  Please Use Given Template and fill required details \n');
          alert(error.body.message)
        }
      }
}