public with sharing class controllerContactID {

    @AuraEnabled(Cacheable=true)
    public static List<Contact> getContactIDWire() {
        return[SELECT Id, Name FROM Contact
        ];
        
    }
}