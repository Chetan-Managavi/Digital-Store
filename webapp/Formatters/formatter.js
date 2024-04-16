sap.ui.define([
	
], function() {
	"use strict";

	return  {
        fnloginstate:function(username,loggedin)
        {
                        
            if(loggedin){
                return username
            }else{
                return " "
            }
        },
        fnchangeloginbtnstate:function(loginbtnstate,loggedin){
            if(loggedin)
            return "Logout"
        else
        return loginbtnstate

        }

}})