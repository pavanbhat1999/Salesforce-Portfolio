public with sharing class getNotes {
    public getNotes() {

    }
    @AuraEnabled
    public static List<MyNotes__c> getAllNotes(){
        try {
            List<MyNotes__c> lst = [select id,name,Description__c from MyNotes__C order by createddate desc];
            return lst;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
