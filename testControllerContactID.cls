@isTest
public  class testControllerContactID {
    @isTest
    static void isTestControllerContactID(){
        List<Contact> contacts;
        Test.startTest();
        Contacts = controllerContactID.getContactIDWire();
        Test.stopTest();
        System.assert(contacts.size()>0);
    }   
}
