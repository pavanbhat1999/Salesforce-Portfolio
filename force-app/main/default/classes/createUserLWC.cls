public without sharing class createUserLWC {
    @AuraEnabled

    public static void RegisterExternalUser(String Name){ 
        List<Account> lstAccount = new List<Account>();
                Id personAccRecordTypeId = Schema.Sobjecttype.Account.getRecordTypeInfosByDeveloperName().get('PersonAccount').getRecordTypeId();
                Account newAcc = new Account(FirstName=Name, LastName='rpgan',personemail='a@a.com',RecordtypeId=personAccRecordTypeId);
                insert newAcc;
      Site.createExternalUser(
  new User(
    FirstName=Name,
    LastName='Doe',
    Email='john.doe@example.com',
    CommunityNickname='johndoe'+ System.now().millisecond(),
    Alias='jdoe',
    TimeZoneSidKey='America/New_York',
    LocaleSidKey='en_US',
    EmailEncodingKey='UTF-8',
    LanguageLocaleKey='en_US',
    Username = 'joe' + System.now().millisecond()
  ),newAcc.Id,
  'https://cts-62e-dev-ed.my.site.com'
);

    }
    
}