import { LightningElement, wire, track } from 'lwc';
import getContactIDWire from "@salesforce/apex/controllerContactID.getContactIDWire"
const COLUMNS_LEADS = [
    { label: 'Name', fieldName: 'IdUrl', type: 'url', typeAttributes: { label: { fieldName: "Name" } } },
    { label: 'idNAME ', fieldName: 'IdNAME'}
];
export default class Contact_Id extends LightningElement {
    @track data;
    error;
    columns = COLUMNS_LEADS

    @wire(getContactIDWire)
    contacts(result) {
        const { data, error } = result
        if (data) {
            this.data = data.map(row => {
                return {
                    ...row,
                    IdUrl: `/${row.Id}`,
                    IdNAME: row.Id + " " + row.Name,                   
                }
            })

        } else if (error) {
            this.error = error;
        }
    }

}