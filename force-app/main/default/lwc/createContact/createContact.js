import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'

export default class CreateContact extends NavigationMixin(LightningElement) {

    //Create new Contact
    createContact() {

        this[NavigationMixin.Navigate] ({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            }
        })
    }
}