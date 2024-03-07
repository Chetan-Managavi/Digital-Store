sap.ui.define(
  ["./BaseController", "sap/ui/model/json/JSONModel", "sap/ui/core/Fragment",
	"sap/suite/ui/commons/ColumnData"],
  function (Controller, JSONModel, Fragment) {
    "use strict";

    var count = 1;
    var opath;

    return Controller.extend(
      "com.incture.digitalstore.controller.ProductDetails",
      {
        onInit: function () {
          const oRouter = this.getOwnerComponent().getRouter();

          oRouter
            .getRoute("ProductDetails")
            .attachPatternMatched(this.fnmatched, this);

          const quantitydata = [
            {
              value: 1,
            },
            {
              value: 2,
            },
            {
              value: 3,
            },
            {
              value: 4,
            },
            {
              value: 5,
            },
            {
              value: 6,
            },
            {
              value: 7,
            },
          ];

          const qtymodel = new JSONModel(quantitydata);
          this.getView().setModel(qtymodel, "quantity");
        },

        fnmatched: function (oEvent) {
          console.log(
            oEvent.getParameter("arguments").productpath,
            "arguements"
          );

          opath = oEvent.getParameter("arguments").productpath;
          console.log(opath, "path");
          this.getView().bindElement({
            path: "/" + opath,
            model: "products",
          });

          const data = this.getView()
            .getModel("products")
            .getProperty("/" + opath);

          const htmlstring = {
            modelname: `<span style=\"color:red;\">Model Name:</span> ${data.modeName} `,
            modelnumber: `<span style=\"color:red;\">Model Number:</span> ${data.modelNumber} `,
            size: `<span style=\"color:red;\">Size:</span> ${data.size} `,
            camera: `<span style=\"color:red;\">Camera:</span> ${data.camera} `,
            ROM: `<span style=\"color:red;\">ROM:</span> ${data.ROM} `,
            description: `<span style=\"color:red;\">Description:</span> ${data.Description} `,
            price: `<span style=\"font-weight:bold; font-size:large;\">${data.price} $</span>  `,
            color: `<span style=\"font-weight:bold; font-size:large\">${data.color}</span>  `,
          };
          const htmlmodel = new JSONModel(htmlstring);

          this.getView().setModel(htmlmodel, "htmlmodel");

          const orderdetailsdata = {
            usesrname: "",
            mobilenumber: "",
            quantity: "",
            "email-id": "",
            address: "",
            productname: `${data.name}`,
            modelname: `${data.modeName}`,
            price: `${data.price}`,
            totalprice: `${data.price}`,
          };

          const orderdetailsmodel = new JSONModel(orderdetailsdata);
          this.getView().setModel(orderdetailsmodel, "orderdetails");
        },

        //p

        //

        calculatetotalprice: function (oEvent) {
          const orderdetailsdata = this.getView()
            .getModel("orderdetails")
            .getData();

          const qty = oEvent.getParameter("selectedItem").getText();

          this.getView()
            .getModel("orderdetails")
            .setProperty("/totalprice", orderdetailsdata.price * qty);
        },

        onConfirmOrderButtonPress: function () {
          this.purchasedialog.then((odialog) => odialog.close());

          this.navtohome();
        },


        onpurchaseclosed: function () {

          this.purchasedialog.then((dialog)=>dialog.close())
          

          
        },

        onbuyproductbutton: function () {
          if (!this.purchasedialog) {
            this.purchasedialog = this.loadFragment({
              name: "com.incture.digitalstore.fragments.Purchase",
              id: "purchasedialog",
              controller: this,
            });
          }

          this.purchasedialog.then((dialog) => dialog.open());
        },

        
      }
    );
  }
);
