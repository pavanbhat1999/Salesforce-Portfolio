public class CertificationListFetch {
    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getAllCertifications(){
        List<Certification__c> certificationsList = [select name,Certification_Description__c,Certification_Image__c from certification__C order by Name desc];
        return certificationsList;
    }


}