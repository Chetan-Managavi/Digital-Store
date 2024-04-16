sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
	"sap/m/LightBox",
  ],
  function (Controller,
	UIComponent,
	JSONModel,
	MessageToast,
	LightBox) {
    "use strict";

    return Controller.extend(
      "com.incture.digitalstore.controller.BaseController",
      {
        /**
         * @override
         */
        onInit: function () {},

        navtoproduct: function () {
          const oRouter = this.getOwnerComponent().getRouter();

          oRouter.navTo("Products");
        },

        navtohome: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("Home");
        },

        getRouter: function () {
          // ... instead of
          return UIComponent.getRouterFor(this);
        },

        openlogindialog: function (iEvent) {
          const loggedin = this.getView()
            .getModel("userprofile")
            .getData().loggedin;

            

          this.loginDialog = this.loadFragment({
            name: "com.incture.digitalstore.fragments.Login",
            controller: this,
            id: "login-frags",
          });

          if (!loggedin) {
            this.loginDialog.then((dialog) => dialog.open());
          } else {
            MessageToast.show("Already Logged in");
          }
        },

        onDialogClosed: function () {
          this.loginDialog.then(function (oDialog) {
            oDialog.close();
          });
        },
        //below functions logs the user in and closes the login dialog
        loginuser: function () {
          this.getView().getModel("userprofile").setProperty("/loggedin", true);

          console.log(
            "logdata",
            this.getView().getModel("userprofile").getData()
          );
          

          this.loginDialog.then(function (oDialog) {
            oDialog.close();
          });
        },

        onSignupLinkPress:function(){

            if(!this.signupdialog){
                this.signupdialog=this.loadFragment({
                    name:"com.incture.digitalstore.fragments.SignUp",
                    controller:this,
                    id:"signup-fragment"
                })
            }

            this.signupdialog.then((dialog)=>dialog.open())
        },

        onclosesignupdialog:function(){
          console.log("close signup")
            this.signupdialog.then((dialog)=>dialog.close())
        },

        onsignupbuttonpress:function(){

            const userprofiledata=this.getOwnerComponent().getModel("userprofile").getData()

            console.log(userprofiledata,"userprofiledata")

            if(!userprofiledata.login.username||!userprofiledata.login.password||!userprofiledata.mobilenumber||!userprofiledata.emailid||!userprofiledata.address)
            {
                MessageToast.show("Fill All Details")
                return
            }
            this.signupdialog.then((dialog)=>dialog.close())


        },

        validateemail:function(event)
        {
          const value = event.getParameter("value")
          const item=event.getSource()

         const  regexforemail=/(.+)@\w{3,}\.\w{2,}/

         if(regexforemail.test(value))
         {

          item.setValueState("Success")
          

         }
         else{

          item.setValueState("Error")
          item.setValueStateText("Invalid Email Format")
         }



        },
        onnavloginpress:function(event)
        {
          const loggedin = this.getView()
            .getModel("userprofile")
            .getData().loggedin;

            if(loggedin)
            {
              this.getView().getModel("userprofile").setProperty("/loggedin", false);
            }
            else{
              this.openlogindialog()
            }
        }

      }
    );
  }
);
