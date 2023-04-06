//CreatedBy - PVNB 
//Date - 25-02-2023
//Fetch User record 
//Using in LWC component nnioUserAutomationCustom
public class UserSearch {
@AuraEnabled
public static List<User> searchUser(String UserName)
{
    UserName = '%' + UserName + '%';
    List<User> usr = [select name,id from User where name LIKE :UserName or alias LIKE :UserName order by name limit 15];
    return usr;
}
@AuraEnabled
public static List<User> getUserDetail(String UserId)
{
    List<User> usr = [select name,id,alias,email,profile.name,userrole.name,Country,IsActive from User where id=:UserId];
    return usr;
}
}