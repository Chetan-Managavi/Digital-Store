sap.ui.define([
    
    "./BaseController",
    "../Formatters/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,Formatter) {
        "use strict";

        return BaseController.extend("com.incture.digitalstore.controller.Home", {

            formatter:Formatter,
            onInit: function () {

                

            },

            onAfterRendering:function()
            {
               debugger 


            }

            
        });
    });
