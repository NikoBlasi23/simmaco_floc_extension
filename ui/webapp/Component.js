sap.ui.getCore().loadLibrary("sap.iot.ain.lib.reusable", "/comsapdsciamassetcentral.sapiotainlibreusable/");
sap.ui.getCore().loadLibrary("sap.iot.ain.lib.objects", "/comsapdsciamassetcentral.sapiotainlibobjects/");
jQuery.sap.declare("my.company.simmflocext.Component");

// use the load function for getting the optimized preload file if present
sap.ui.component.load({
	name: "sap.iot.ain.managefloc",
	url: "/comsapdsciamassetcentral.sapiotainmanagefloc/"
});

this.sap.iot.ain.managefloc.Component.extend("my.company.simmflocext.Component", {
	metadata: {
		manifest: "json"
	},
	init: function () {
		sap.iot.ain.managefloc.Component.prototype.init.apply(this, arguments);
		var sPath = jQuery.sap.getModulePath("my.company.simmflocext");
		this.getModel("i18n").enhance({
			bundleUrl: sPath + "/i18n/i18n.properties"
		});



		var sRootPath = jQuery.sap.getModulePath("my.company.simmflocext");

		jQuery.getScript(sRootPath + "/libs/lodash.js");
	}
});

/*

//For CF Deployment

jQuery.sap.declare("my.company.simmflocext.Component");

// use the load function for getting the optimized preload file if present
sap.ui.component.load({
	name: "sap.iot.ain.managefloc",
	// Use the below URL to run the extended application when SAP-delivered application is deployed on cloud
	// Remove the url parameter once your application is deployed to productive account
	url: "/comsapdsciamassetcentral.sapiotainmanagefloc/"
		// we use a URL relative to our own component
		// extension application is deployed with customer namespace
});

this.sap.iot.ain.managefloc.Component.extend("my.company.simmflocext.Component", {
	metadata: {
		manifest: "json"
	},
	init: function () {
       sap.iot.ain.managefloc.Component.prototype.init.apply(this, arguments);
       var sPath = jQuery.sap.getModulePath("my.company.simmflocext");
       this.getModel("i18n").enhance({bundleUrl:sPath + "/i18n/i18n.properties"});
   }
});


*/