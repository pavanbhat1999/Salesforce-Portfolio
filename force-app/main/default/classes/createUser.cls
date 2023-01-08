public class createUser {
    @InvocableMethod(label = 'Register Community User')
    public static void RegisterUser(List<UserDetails> getUsrDetails){ 
      //  try{
        List<Account> lstAccount = new List<Account>();
        String pswd;
        Id personAccRecordTypeId = Schema.Sobjecttype.Account.getRecordTypeInfosByDeveloperName().get('PersonAccount').getRecordTypeId();
            system.debug('getUsrDetails==='+getUsrDetails);        
            for(UserDetails usr: getUsrDetails){
                User u = new User();
                u.firstName = usr.fname;
                u.lastName = usr.lname;
                u.Username = usr.email + System.now().millisecond();
                u.Email = usr.email;
                Long timeInMili = System.now().getTime()/1000;
                u.CommunityNickname = usr.fname.left(1) + usr.lname + timeInMili; 
                u.Alias = usr.fname.left(1) + usr.lname.left(4);
                u.emailencodingkey='UTF-8';
                u.languagelocalekey='en_US';
                u.TimeZoneSidKey = 'America/Los_Angeles';
                u.LocaleSidKey = 'en_US';
                Profile pf = [Select id from Profile where name='pavan-portfolio Profile'];
                //u.ProfileId = pf.id;
                //u.ProfileId = '00e5i000002obUsAAI';
                String ownerId = site.getAdminId();
                String passwrd = usr.pwd;
                system.debug('ownerId==='+ownerId); 
                system.debug('Pwd==='+usr.pwd);
               // Id userId = Site.createPersonAccountPortalUser(u, ownerId, passwrd);
                pswd = usr.pwd;
                Account newAcc = new Account(FirstName=usr.fname, LastName=usr.lname,personemail=usr.email,RecordtypeId=personAccRecordTypeId);
                lstAccount.add(newAcc);
                //insert newAcc;
                
               // system.debug('User:'+userId);                
        //    }
             // String userId = Site.createExternalUser(u, newAcc.Id, pswd, true); 
               // System.debug('User'+userId);
      }
   
        if(!lstAccount.isEmpty()){
            insert lstAccount;
            createCommunityUsr(lstAccount, pswd);
        }
       // catch(Exception e){
       //     system.debug('Exception e==='+e);
       // }
        
    }
    
    
    public static void createCommunityUsr(List<Account> lstAcc, String pwd){
       // List<Account> lstAcc = (List<Account>) JSON.deserialize(newAcc, List<Account>.class);
        Profile pr = [Select id from Profile where name='pavan-portfolio Profile'];
        system.debug('lstAcc=='+lstAcc);
        system.debug('pwd=='+pwd);
        for(Account acc: lstAcc){
            User u = new User();
            u.firstName = acc.firstname;
            u.lastName = acc.lastname;
            u.Username = acc.personemail + System.now().millisecond();
            u.Email = acc.personemail;
            u.ContactId = acc.PersonContactId;
            u.CommunityNickname = acc.firstname.left(1) + acc.lastname; 
            u.Alias = acc.firstname.left(1) + acc.lastname.left(4);
            u.emailencodingkey='UTF-8';
            u.languagelocalekey='en_US';
           // u.profileId = pr.Id;
           	//u.ProfileId = '00e5i000002obUsAAI';
            u.TimeZoneSidKey = 'America/Los_Angeles';
            u.LocaleSidKey = 'en_US';
            system.debug('u==='+u);
            //String userId = Site.createExternalUser(u, acc.Id, null, true);
            String userId = Site.createExternalUser(u, acc.Id, null, true); 
           // String ownerId = site.getAdminId();
            //String userId = Site.createPersonAccountPortalUser(u,ownerId ,null);
            System.debug('User'+userId); 
        }       
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