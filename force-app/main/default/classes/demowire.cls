public with sharing class demowire {

    @AuraEnabled

    public static List<User> checkwire(){
        List<User> usr = [select id,name from user order by createddate DESC];
        return usr;

    }
}