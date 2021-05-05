@isTest
public class testLeadController{
    @isTest
    static void testLeadControllerWire(){
        List<Lead> leadList;
        Test.startTest();
        leadList = LeadsController.getLeadsListWire();
        Test.stopTest();
        System.assert(leadList.size()>0);
    }
}