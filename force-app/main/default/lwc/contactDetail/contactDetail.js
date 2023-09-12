import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SELECTED_CONTACT_CHANNEL from '@salesforce/messageChannel/SelectedContact__c';
import getContactDetails from '@salesforce/apex/ContactController.getContactDetails';
import { NavigationMixin } from 'lightning/navigation';


export default class ContactDetail extends NavigationMixin(LightningElement) {

    selectedContactId;
    contactData;

    @wire(MessageContext)
    MessageContext;

    connectedCallback(){

        subscribe(
            this.MessageContext,
            SELECTED_CONTACT_CHANNEL,
            (message) =>{
                console.log("message from LMS: " + JSON.stringify(message));
                this.handleSelectedContact(message.contactId);
            }
        )
    }
    
    handleSelectedContact(contactId){
        this.selectedContactId = contactId;

        getContactDetails({contactId : this.selectedContactId})
        .then(result => {
            this.contactData = result;
            console.log("Selected Contact Details: " + JSON.stringify(result));
        })
        .catch(error => {
            console.error(error);
        })
    }

    handleNavigateToRecord() {

        this[NavigationMixin.Navigate] ({
            type : 'standard__recordPage',
            attributes : {
                recordId: this.selectedContactId,
                objectApiName: 'Contact',
                actionName: 'view'
            }
        })
    }
}