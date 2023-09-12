import { LightningElement,wire,track } from 'lwc';
import contactNewList from '@salesforce/apex/ContactController.contactNewList';
import { publish,MessageContext } from 'lightning/messageService';
import SELECTED_CONTACT_CHANNEL from '@salesforce/messageChannel/SelectedContact__c';

export default class ContactList extends LightningElement {

    @track recordTypeId;
    @track selectedContactId;
    @wire(contactNewList) 
    objectInfos ({ data,error}){

        if(error) {
            console.log('error: ' + JSON.stringify(error))
        }
        else if (data) {
            this.recordTypeId = data;
            console.log('this.recordTypeId: ' + JSON.stringify(this.recordTypeId))
        }

    }


    @wire(MessageContext)
    MessageContext;

    handleClick(event) {
        this.selectedContactId = event.currentTarget.dataset.id;
        console.log('this.selectedContactId: ' + JSON.stringify(this.selectedContactId))

        // publish selected contact id to LMS channel
        publish( this.MessageContext, SELECTED_CONTACT_CHANNEL, {contactId: this.selectedContactId})
    }

}