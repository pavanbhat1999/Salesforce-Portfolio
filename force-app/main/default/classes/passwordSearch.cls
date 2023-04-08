public with sharing class passwordSearch {
    public passwordSearch() {
        return;
    }
    @AuraEnabled
    public static string searchName(String Name){
        try {
            Name = '%' + Name + '%';
            List<Password__c> passlst = [select name,passwordvalue__C from Password__c where name LIKE :Name limit 1];
            return passlst[0].passwordvalue__C;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}