import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import {ShowToastEvent} from "lightning/platformShowToastEvent";
export default class MyModal extends LightningModal {
   @api content;

    flowApiName = 'NNIO_Digital_Health_Flow';
    get flowInputVariables() {
        return [
		{
			name: "RecordId",
			type: "String",
			value: this.content,
		},
	];
}
navigateToRecord(recordId) {
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId,
            actionName: 'view'
        }
    });
}

    handleFlowStatusChange(event) {
		console.log("flow status", event.detail.status);

        if (event.detail.status === "FINISHED") {
        
 
          
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Success",
                    message: "Operation Successfully completed",
                    variant: "success",
                })
            );

            this.close('successfully finished flow');
		}

    }

}