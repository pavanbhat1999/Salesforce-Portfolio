public class createUser3 {
    @InvocableMethod(label = 'Register Community User')
    public static void RegisterExternalUser(List<UserDetails> getUsrDetails){ 
        List<Account> lstAccount = new List<Account>();
                Id personAccRecordTypeId = Schema.Sobjecttype.Account.getRecordTypeInfosByDeveloperName().get('PersonAccount').getRecordTypeId();
                Account newAcc = new Account(FirstName='joe', LastName='rpgan',personemail='a@a.com',RecordtypeId=personAccRecordTypeId);
                insert newAcc;
      Site.createExternalUser(
  new User(
    FirstName='John',
    LastName='Doe',
    Email='john.doe@example.com',
    CommunityNickname='johndoe',
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
    
public class UserDetails {
        @InvocableVariable(required=true)
        public String lname;
        
        @InvocableVariable
        public string fname;
        
        @InvocableVariable
        public string email;
        
        @InvocableVariable
        public string pwd;
        
    }    
}