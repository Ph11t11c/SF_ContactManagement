public with sharing class ContactController {
    public ContactController() {

    }
    @AuraEnabled (cacheable = true)
    public static List<Contact> contactNewList(){
        try {
            return [
                SELECT Id, Name, Email
                FROM Contact
                
                ORDER BY Name ASC
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled (cacheable = true)
    public static Contact getContactDetails(String contactId){
        try {
            return [
                SELECT Id, Name, Email, Birthdate, Phone
                FROM Contact
                WHERE Id =: contactId
            ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}