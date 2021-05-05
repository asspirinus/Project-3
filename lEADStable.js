import { LightningElement, wire, api, track } from 'lwc';
//import updateLeadsList from "@salesforce/apex/LeadsController.updateLeadsList"
import getLeadsListWire from "@salesforce/apex/LeadsController.getLeadsListWire"
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import TITLE_FIELD from '@salesforce/schema/Lead.Title';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';
//import ID_FIELD from '@salesforce/schema/Lead.Id';

const COLUMNS_LEADS = [
    { label: 'Name', fieldName: 'Id', type: 'url', typeAttributes: { label: { fieldName: "Name" } } },
    { label: 'Title', fieldName: 'Title', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
];
export default class LEADStable extends LightningElement {
    columns = COLUMNS_LEADS;
    @track data;
    @track draftValues = [];
    error;

    @wire(getLeadsListWire)
    leads(result) {
        this.refreshTable = result;
        if (result.data) {
            this.data = result.data.map(this.leadName);
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }
    leadName(row) {
        let leads = {
            ...row,
            Name: row.Name,
            Id: `/${row.Id}`
        };
        return leads;
    }

    handleCellChange(event) {
       
        const fields = {};
        if ("Title") {

            fields[TITLE_FIELD.fieldApiName] = event.detail.draftValues[0].Title;
        } else if ("Phone") {

            fields[PHONE_FIELD.fieldApiName] = event.detail.draftValues[0].Phone;

        }

        console.log('fields==>   ', fields);
        const recordInput = {fields};
        console.log('recordInput===> ', recordInput );
        
        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'lead updated',
                        variant: 'success'
                    })
                );
                this.draftValues = [];
                return refreshApex(this.leads);
            }).catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating or reloading record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}