public class QueueFetchFromUser {
    public class customUser
    {
        @InvocableVariable
        public string Alias;
        @InvocableVariable
        public string Country;
        @InvocableVariable
        public string Department;
        @InvocableVariable
        public string Email;
        @InvocableVariable
        public string FederationIdentifier;
        @InvocableVariable
        public string FirstName;
        @InvocableVariable
        public string IsActive;
        @InvocableVariable
        public string LastName;
        
        @InvocableVariable
        public string ProfileId;
        @InvocableVariable
        public string Username;
        @InvocableVariable
        public string TimeZoneSidKey;
        @InvocableVariable
        public string LocaleSidKey;
        @InvocableVariable
        public string EmailEncodingKey;
        @InvocableVariable
        public string LanguageLocaleKey;
        @InvocableVariable
        public string CommunityNickname;

        // "Alias": "PVNBTEST",
        // "Country": "GB",
        // "Department": "TEST",
        // "Email": "pvnb@novonordisk.com",
        // "FederationIdentifier": "",
        // "FirstName": "Pavan",
        // "IsActive": "TRUE",
        // "LastName": "Bhat TEST",
        // "NNIO_Cluster__c": "",
        // "ProfileId": "00e3X000002ROh2QAG",
        // "Username": "pvnb@novolightingintest.com",
        // "TimeZoneSidKey": "Europe/Paris",
        // "LocaleSidKey": "en_GB",
        // "EmailEncodingKey": "ISO-8859-1",
        // "LanguageLocaleKey": "en_US",
        // "CommunityNickname": ""
    }
    // Getting Queue membership of individual user
    @AuraEnabled
    public static List<GroupMember> getQueueFromUser(String Id)
    {
        
        List<GroupMember> A = [Select Id,Group.Name from GroupMember where Group.type='Queue' and UserOrGroupId = :Id  ];
        return A;
    }
    // Fetch All queues present in Org
    @AuraEnabled
    public static List<Group> getQueueFromAll()
    {
        List<Group> A = [Select Id,Name from Group where Type='Queue' order by Name ];
        return A;
    }
    // Fetch Public groups from user 
    @AuraEnabled
    public static List<GroupMember> getPublicGroupFromUser(String Id)
    {
        List<GroupMember> A = [Select Id,Group.Name from GroupMember where Group.type='Regular' and UserOrGroupId = :Id  ];
        return A;
    }
    //    
    // Fetch All Public groups from user 
    @AuraEnabled
    public static List<Group> getPublicGroupFromAll()
    {
        List<Group> A = [Select Id,Name from Group where Type='Regular' order by Name ];
        return A;
    }
    // Fetch All Permission Sets
    @AuraEnabled
    public static List<PermissionSet> getAllPS()
    {
        List<PermissionSet> A = [SELECT Id, Name  FROM PermissionSet where NOT Name LIKE '%X00%' order by Name ];
        return A;
    }
    // Fetch Permission Set of the User
    @AuraEnabled
    public static List<PermissionSetAssignment> getPS(String usernameps)
    {
        List<PermissionSetAssignment> A = [SELECT Id, PermissionSetId, PermissionSet.Name, PermissionSet.ProfileId, PermissionSet.Profile.Name, AssigneeId, Assignee.Name FROM PermissionSetAssignment WHERE  AssigneeId = :usernameps and (NOT permissionset.Name LIKE '%X00%')  order by Permissionset.name];
        return A;
    }
    // Fetch All profile names 
    @AuraEnabled
    public static List<Profile> getProfiles()
    {
        
        List<Profile> A = [SELECT Id,Name FROM Profile];
        return A;
    }
    // Insert User Bulk
  
    @AuraEnabled
    public static String insertUserBulk(String userJSON){
        try {
            System.debug('Inserting the bulk user String =  '+userJSON);
            List<customUser> listUsers = (List<customUser>) JSON.deserialize(userJSON, List<customUser>.class);
            List<User> insertUsersList = new List<User>();
            for(customUser usr:listUsers){
                User newuser = new User();
                System.debug('user name'+ usr.Alias);
                if(usr.Alias == '') //Added to handle empty row submission
                    break;
                newuser.Alias = usr.alias;
                newuser.FirstName = usr.FirstName;
                newuser.LastName = usr.LastName;
                newuser.Username = usr.Username;
                newuser.Email = usr.Email;
                newuser.Country = usr.Country;
                newuser.Department = usr.Department;
                newuser.FederationIdentifier = usr.FederationIdentifier;
                //newuser.IsActive = usr.IsActive;
                newuser.Profileid = usr.ProfileId;
                newuser.TimeZoneSidKey = usr.TimeZoneSidKey;
                newuser.LocaleSidKey = usr.LocaleSidKey;
                newuser.EmailEncodingKey = usr.EmailEncodingKey;
                newuser.LanguageLocaleKey = usr.LanguageLocaleKey;
                newuser.CommunityNickname = usr.CommunityNickname;
                insertUsersList.add(newuser);
            }
           System.debug('nnnnn'+ insertUsersList);
           insert(insertUsersList);
           return 'usercreation Successfull';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
            
        }
    }
    // Update the  User
   
    @AuraEnabled
    public static void updateUser(String UserId,String FirstName,String LastName,String Alias,Boolean IsActive){
        try {
            User usr = [Select Id,FirstName,LastName from User where Id=:UserId];
            usr.FirstName = FirstName;
            usr.LastName = LastName;
            usr.Alias = Alias;
            usr.IsActive = IsActive;
            update usr;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    } 
    // Insert GroupMembership for the user
    @AuraEnabled
    public static Integer insertQueueForUser(List<String> QueueName,List<String> deleteQueues,String UserId)
    {
        // * Delete Queue Membership
        List<GroupMember> deleteqids = [select Id from groupmember where group.name in :deleteQueues];
        delete(deleteqids);
        // * Inserting Queue Membership
        List<group> qids = [select Id from group where name in :QueueName];
        //!remove afterwards List<Id> groupIds = new List<Id>();
        // for (Group qid : qids) {
        //     groupIds.add(qid.Id);
        // }
        List<GroupMember> lstgm = new List<GroupMember>();
        for (group q : qids){
            System.debug(q);
            GroupMember newgrp = new GroupMember(UserOrGroupId=UserId,groupID=q.Id); 
            lstgm.add(newgrp);
        }
        insert(lstgm);
        return 0;
    }
    // Insert permission set to the user
    @AuraEnabled
    public static Integer insertPermissionSetAssignment(List<String> insertPermissionSet,List<String> deletePermissionSet,String AssigneeId){
        try {
            String pid = '0PS3X000001UP3RWAW';
            // Delete the removed permission set
            List<permissionsetassignment> deleteList = [SELECT Id, PermissionSetId, PermissionSet.Name, PermissionSet.ProfileId, PermissionSet.Profile.Name, AssigneeId, Assignee.Name FROM PermissionSetAssignment WHERE  AssigneeId =:AssigneeId and permissionset.Name in :deletePermissionSet];
            delete deleteList;
            // insert newly selected premission set
            List<PermissionSet> insertPS = [select id from permissionset where name in :insertPermissionSet];
            List<PermissionSetAssignment> allPS = new List<PermissionSetAssignment>();
            for(PermissionSet ps:insertPS){
                PermissionSetAssignment psa = new PermissionSetAssignment(permissionSetId=ps.Id,AssigneeId=AssigneeId);
                allPS.add(psa);
            }
            insert(allPS);
            //PermissionSetAssignment psa = new PermissionSetAssignment(permissionSetId=pid,AssigneeId=AssigneeId);
            // insert psa;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return 0;
    }


    }