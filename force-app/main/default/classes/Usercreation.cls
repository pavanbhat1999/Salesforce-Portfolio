public class Usercreation 
{
    public class userinput
    {
        @InvocableVariable
        public string userid;
        @InvocableVariable
        public string organization;
        @InvocableVariable
        public string dept;
       @InvocableVariable
        public string groupname;
    }
    
    @InvocableMethod(label='Assign user in queues')
    public static void assign(list<userinput> uinput)//('333','IN','Cust')//uinput.get(0).userid
    {
        string uiid=uinput.get(0).userid;
        id currentuserid=uiid;
        string org=uinput.get(0).organization;
        string Dept=uinput.get(0).dept;
        string groupn=uinput.get(0).groupname;
        list<string> l=Dept.split(';');  //[Administration,Call Centre,]
        list<string> pl=groupn.split(';');
        
        //assignment of queue
        list<group> grouplist=new list<group>();
        for(string s:l)
        {
            //list<string> st=s.split(' ');
            //String p=String.join(st,'_');
            //string dep='NNIO_'+p+'_'+org;  //NNIO_Default_Department_IN*/
            Group g=[select id from group where id=:s];
            grouplist.add(g);   
            
    	}
        if(!grouplist.isempty())
        {
            list<groupmember> listg=new list<groupmember>();
            for(group a:grouplist)
            {
                GroupMember gm=new GroupMember();
                gm.GroupId=a.id;
                gm.UserOrGroupId=currentuserid;
                listg.add(gm);
            }
            insert listg;   
        }
        
        //assignment of permissionset
        PermissionSetGroup permissionset=[select id from PermissionSetGroup where DeveloperName='New_User_Permission_Set'];
        PermissionSetAssignment psa=new PermissionSetAssignment();
        psa.PermissionSetGroupId=permissionset.id;
        psa.AssigneeId=currentuserid;
        insert psa;
        
        //assignment of public group
        if(groupn!='')
        {
        	list<group> publicgroup=new list<group>();
        	for(string s:pl)
        	{
				group g=[select id from group where id=:s];
        		publicgroup.add(g);
			}
    		if(!publicgroup.isEmpty())
    		{
        		list<groupmember> listg=new list<groupmember>();
        		for(group a:publicgroup)
        		{
            		GroupMember gm=new GroupMember();
            		gm.GroupId=a.id;
            		gm.UserOrGroupId=currentuserid;
            		listg.add(gm);
        		}
        		insert listg;   
    		}
        }
	}
}