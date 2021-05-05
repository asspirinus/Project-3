public with sharing class LeadsController {

    @AuraEnabled(Cacheable=true)
    public static List<Lead> getLeadsListWire() {
        return[SELECT id, Name, Title, Phone FROM Lead
        ];
    }
}