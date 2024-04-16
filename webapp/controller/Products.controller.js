sap.ui.define(
  [
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, JSONModel, Filter, FilterOperator,Fragment) {
    "use strict";
   

    return BaseController.extend(
      "com.incture.digitalstore.controller.Products",
      {
        onInit: function () {

          //currency model
          const ocurrency = {
            currency: "$",
          };
          const currencymodel = new JSONModel(ocurrency);
          this.getView().setModel(currencymodel, "currency");
          //end of curenncy model

          //Filters model

          const filterdata={
            "name":[],
            "color":[],
            "rom":[],
            "size":[]                     

          }
          
          const productsdata= this.getOwnerComponent().getModel("products").getData()

          var color=[];
          var name=[]; 
          var size=[];
          var rom=[];
          productsdata.forEach((item)=>
          {
            var colobj={"value": item.color}
            if(!color.includes(item.color)){
            filterdata.color.push(colobj)
            color.push(item.color)
            }
            
            var nameobj={"value": item.modeName}
            if(!name.includes(item.modeName)){
            filterdata.name.push(nameobj)
            name.push(item.modeName)
            }

            var romobj={"value": item.ROM}
            if(!rom.includes(item.ROM)){
            filterdata.rom.push(romobj)
            rom.push(item.ROM)
            }

            var sizeobj={"value": item.size}
            if(!size.includes(item.size)){
            filterdata.size.push(sizeobj)
            size.push(item.size)
            }
           
          }
          )//end of foreach

          console.log(filterdata,"filterdata")

        const filtermodel= new JSONModel(filterdata)
        this.getView().setModel(filtermodel,"filters")
        //end of filter model

        


        },

        onAfterRendering: function () {
          
        },

        showproductdetails: function (oEvent) {
          const oRouter = this.getOwnerComponent().getRouter();

          const Item = oEvent
            .getSource()
            .getBindingContext("products")
            .getPath();
          console.log(Item, "itkem");
          oRouter.navTo("ProductDetails", {
            productpath: oEvent
              .getSource()
              .getBindingContext("products")
              .getPath()
              .substr(1),
          });
        },
        
        //icon tab bar filters
        onfilterselect: function (oEvent) {
          const key = oEvent.getParameter("key");
          console.log(key, "Item");

          var filters = [];

          if (key == "ROM") {
            filters.push(new Filter("ROM", FilterOperator.EQ, 64));
          }

          if (key == "Color") {
            filters.push(new Filter("color", FilterOperator.Contains, "White"));
          }

          const list = this.byId("idProductsList");

          const bindings = list.getBinding("items");

          bindings.filter(filters);
        },

        //search field filters
        searchproducts: function (oEvent) {
          var filter = [];
          const query = oEvent.getParameter("query");

          filter.push(
            new Filter({
              filters: [
                new Filter("name", FilterOperator.Contains, query),
                new Filter("color", FilterOperator.Contains, query),
              ],
              and: false,
            })
          );
                      

          //   filter.push([new Filter("name", FilterOperator.Contains, query),new Filter("camera",FilterOperator.Contains,query)]);
          const list = this.byId("idProductsList");
          const bindings = list.getBinding("items");
          bindings.filter(filter);
        },
        onApplyMoreFiltersButtonPress: function (event) {
          const applyfilterbtn = event.getSource();
          const view = this.getView();

          if (!this.filterdialog) {
            this.filterdialog = this.loadFragment({
              name: "com.incture.digitalstore.fragments.Filters",
              Controller: this,
              id: this.createId("filter-dialog"),
            });
          }

          this.filterdialog.then((dialog) => dialog.openBy(applyfilterbtn));
        },
        onapplyfilters:function(){

          const selectedcolor=[]
          const filtercolor=[]

          const colorvboxitems= this.byId(Fragment.createId("filter-dialog", "idfiltercolor")).getItems()
          console.log(colorvboxitems,"color")
          
          colorvboxitems.forEach((item)=>{

            if(item.getSelected()){
            selectedcolor.push(item.getText())
            filtercolor.push(new Filter("color",FilterOperator.Contains,item.getText()))

            }
          })

          const namevboxitems= this.byId(Fragment.createId("filter-dialog", "idfiltername")).getItems()
          namevboxitems.forEach((item)=>{

            if(item.getSelected()){
              filtercolor.push(new Filter("modeName",FilterOperator.Contains,item.getText()))
            }
          })

          const romvboxitems=this.byId(Fragment.createId("filter-dialog","idfilterrom")).getItems()
          romvboxitems.forEach((item)=>{
            
            if(item.getSelected())
            {
              filtercolor.push(new Filter("ROM",FilterOperator.EQ,item.getText()))
            }
          })

          const sizevboxitems= this.byId(Fragment.createId("filter-dialog", "idfiltersize")).getItems()
          sizevboxitems.forEach((item)=>{

            if(item.getSelected())
            {
              filtercolor.push(new Filter("size",FilterOperator.Contains,item.getText()))
            }
          })




          const list = this.byId("idProductsList");

          const bindings = list.getBinding("items");

          bindings.filter(filtercolor);

          console.log("selected color",selectedcolor)




        }

        

        
       




      }
    );
  }
);
