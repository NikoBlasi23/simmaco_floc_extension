jQuery.sap.require("sap.iot.ain.lib.reusable.utilities.AssociatedObjectsHandler");
jQuery.sap.require("sap.iot.ain.lib.reusable.utilities.ApplicationNavigator");

sap.ui.define([
	"sap/iot/ain/lib/reusable/view/SectionBaseController",
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/odata/v2/ODataModel'
], function (SectionBaseController, MessageToast, Fragment, Controller, JSONModel, ODataModel) {
	"use strict";
    
    let props_to_remove = ["__metadata", "ExternalNumber", "StartPoint", "EndPoint", "ClassNumber", "LinearLength", "LinearUnit", "atfor"]
    let props_to_remove_num = ["__metadata"]
	return SectionBaseController.extend("my.company.simmflocext.controller.Flow", {

		onInit: function (oEvent) {
			// set explored app's demo model on this sample
			var sModuleName = jQuery.sap.getModulePath("my/company/simmflocext");
			var oModel = new ODataModel(sModuleName + "/sap/opu/odata/sap/ZCREA_ST_SRV/");
			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);

			// oModel.attachRequestCompleted(function () {
				// this.byId('edit').setEnabled(true);
			// }.bind(this));

			this.getView().setModel(oModel);

			//var oElement = "/C_PurchaseReqnItem(PurchaseRequisition='10105300',PurchaseRequisitionItem='00010',DraftUUID=guid'00000000-0000-0000-0000-000000000000',IsActiveEntity=true";
			var oElement = "/C_PurchaseReqnItemText(Language='IT',DocumentText='B01',TechnicalObjectType='EBAN',ArchObjectNumber='001010530300010',DraftUUID=guid'00000000-0000-0000-0000-000000000000',IsActiveEntity=true)";

			this.getView().bindElement(oElement);

			this._formFragments = {};

			// Set the initial form to be the display one
			this._showFormFragment("Display");
			this.headerInfoModelData;

		},

		handleEditPress: function () {
			//Clone the data
			console.log(this.getView().getModel().getData("/"));
			this._oPR = Object.assign({}, this.getView().getModel().getData("/"));
			this._toggleButtonsAndView(true);

		},

		handleCancelPress: function () {
			//Restore the data
			var oModel = this.getView().getModel();
			oModel.setData(this._oPR);
			this._toggleButtonsAndView(false);
		},

		handleSavePress: async function (oEvent) {
			this.getView().getModel().submitChanges();
			this._toggleButtonsAndView(false);
            let ModelloSalva = this.getView().getModel("lagpModel").oData
            let sedetolinchar = []
            let sedetolinnum = []
            let chartochar = []
            let chartonum = []
            ModelloSalva.map((item) => {
                let characteristic_names = Object.keys(item).filter(p => !props_to_remove.some(ptr => ptr === p))
                characteristic_names = characteristic_names.filter(p => p.indexOf("ValueChar") < 0)
                for (const c_name of characteristic_names) {
                    let OEntry = {
                        StartPoint: item.StartPoint,
                        EndPoint: item.EndPoint,
                        LinearLength: item.LinearLength,
                        LinearUnit: item.LinearUnit,
                        ExternalNumber: item.ExternalNumber,
                        Charact: c_name,
                        CharactDescr: item[c_name],
                        ValueChar: item[c_name + "ValueChar"],
                        ValueCharLong: item[c_name + "ValueChar"],
                        ValueNeutral: item[c_name + "ValueChar"],
                        ValueNeutralLong: item[c_name + "ValueChar"],
                        atfor: item[c_name + "atfor"],
                    }
                    let sedetolinnum_oentry = {
                        ExternalNumber: item.ExternalNumber,
                        Charact: c_name,
                        ValueFrom: item[c_name + "ValueChar"],  //Da cambiare
                        ValueTo: item.ValueTo,
                        ValueRelation: item.ValueRelation,
                        UnitFrom: item.UnitFrom,
                        UnitTo: item.UnitTo,
                        UnitFromIso: item.UnitFromIso,
                        UnitToIso: item.UnitToIso,
                        CharactDescr: item[c_name],
                        Counter: item.Counter,
                        StartPoint: item.StartPoint,
                        EndPoint: item.EndPoint,
                        LinearLength: item.LinearLength,
                        LinearUnit: item.LinearUnit,
                        LinearUnitIso: item.LinearUnitIso,
                        ValueChar: item.ValueChar,
                        ValueRelation: "1",
                        atfor: item[c_name + "atfor"]
                    }
                    let chartochar_oentry = {
                        ExternalNumber: item.ExternalNumber,
                        ClassType: item.ClassType,
                        ClassNumber: item.ClassNumber,
                        Charact: c_name,
                        ValueChar: item[c_name + "ValueChar"],
                        ValueNeutral: item[c_name + "ValueChar"],
                        CharactDescr: item[c_name],
                        ValueCharLong: item[c_name + "ValueChar"],
                        ValueNeutralLong: item[c_name + "ValueChar"],
                        atfor: item[c_name + "atfor"],
                    }
                    let chartonum_oentry = {
                        ExternalNumber: item.ExternalNumber,
                        ClassType: item.ClassType,
                        ClassNumber: item.ClassNumber,
                        Charact: c_name,
                        ValueFrom: item[c_name + "ValueChar"],
                        CharactDescr: item[c_name],
                        atfor: item[c_name + "atfor"],
                        ValueRelation: "1",
                        ValueChar: item[c_name + "ValueChar"],
                    }
                    if (item[c_name + "atfor"] == "CHAR") {
                        sedetolinchar.push(OEntry)
                        chartochar.push(chartochar_oentry)
                    } else if (item[c_name + "atfor"] == "NUM" || item[c_name + "atfor"] == "DATE") {
                        sedetolinnum.push(sedetolinnum_oentry)
                        chartonum.push(chartonum_oentry)
                    }
                }
            })
            let that = this;
            let oModel = this.getView().getModel()
            let sedeSetUrl = "/sedeSet(" + "'" + sedetolinchar[0]?.ExternalNumber + "'" + ")";
            let oData = await that.oDataRead(sedeSetUrl, oModel);
            // create JSON model
            var oODataJSONModel = new sap.ui.model.json.JSONModel(oData);
            that.getView().setModel(oODataJSONModel, "ModelloSalvaOData");
            let ModelloCreate = that.getView().getModel("ModelloSalvaOData").oData;
            ModelloCreate.sedetolin.results[0].sedetolinchar = sedetolinchar
            ModelloCreate.sedetolin.results[0].sedetolinnum = sedetolinnum
            ModelloCreate.sedetochar.results[0].chartonum = chartonum
            ModelloCreate.sedetochar.results[0].chartochar = chartochar
			let ModelloDatGeneral = this.getView().getModel("ModelloInput").oData.DataGeneral
            oModel.create("/sedeSet", {
                DataGeneral: ModelloDatGeneral,
                DataGeneralX: ModelloCreate.DataGeneralX,
                DataSpecific: ModelloCreate.DataSpecific,
                DataSpecificX: ModelloCreate.DataSpecificX,
                ExternalNumber: ModelloCreate.ExternalNumber,
                Return: ModelloCreate.Return,
                StartEndPointSet: ModelloCreate.StartEndPointSet,
                sedetochar: ModelloCreate.sedetochar,
                sedetolin: ModelloCreate.sedetolin,
            },
                {
                    success: function (oData, oRes) {
                        var msg2 = oRes.data.Return.Message;
                        MessageToast.show(msg2);
                    },
                    error: function (oErr) { console.log("error") }
                }
            )
				
		},




		// SalvaElemeneti: async function (oEvent) {
		// 	let ModelloSalva = this.getView().getModel("lagpModel").oData
		// 	let sedetolinchar = []
		// 	let sedetolinnum = []
		// 	let chartochar = []
		// 	let chartonum = []
		// 	ModelloSalva.map((item) => {
		// 		let characteristic_names = Object.keys(item).filter(p => !props_to_remove.some(ptr => ptr === p))
		// 		characteristic_names = characteristic_names.filter(p => p.indexOf("ValueChar") < 0)
		// 		for (const c_name of characteristic_names) {
		// 			let OEntry = {
		// 				StartPoint: item.StartPoint,
		// 				EndPoint: item.EndPoint,
		// 				LinearLength: item.LinearLength,
		// 				LinearUnit: item.LinearUnit,
		// 				ExternalNumber: item.ExternalNumber,
		// 				Charact: c_name,
		// 				CharactDescr: item[c_name],
		// 				ValueChar: item[c_name + "ValueChar"],
		// 				ValueCharLong: item[c_name + "ValueChar"],
		// 				ValueNeutral: item[c_name + "ValueChar"],
		// 				ValueNeutralLong: item[c_name + "ValueChar"],
		// 				atfor: item[c_name + "atfor"],
		// 			}
		// 			let sedetolinnum_oentry = {
		// 				ExternalNumber: item.ExternalNumber,
		// 				Charact: c_name,
		// 				ValueFrom: item[c_name + "ValueChar"],  //Da cambiare
		// 				ValueTo: item.ValueTo,
		// 				ValueRelation: item.ValueRelation,
		// 				UnitFrom: item.UnitFrom,
		// 				UnitTo: item.UnitTo,
		// 				UnitFromIso: item.UnitFromIso,
		// 				UnitToIso: item.UnitToIso,
		// 				CharactDescr: item[c_name],
		// 				Counter: item.Counter,
		// 				StartPoint: item.StartPoint,
		// 				EndPoint: item.EndPoint,
		// 				LinearLength: item.LinearLength,
		// 				LinearUnit: item.LinearUnit,
		// 				LinearUnitIso: item.LinearUnitIso,
		// 				ValueChar: item.ValueChar,
		// 				ValueRelation: "1",
		// 				atfor: item[c_name + "atfor"]
		// 			}
		// 			let chartochar_oentry = {
		// 				ExternalNumber: item.ExternalNumber,
		// 				ClassType: item.ClassType,
		// 				ClassNumber: item.ClassNumber,
		// 				Charact: c_name,
		// 				ValueChar: item[c_name + "ValueChar"],
		// 				ValueNeutral: item[c_name + "ValueChar"],
		// 				CharactDescr: item[c_name],
		// 				ValueCharLong: item[c_name + "ValueChar"],
		// 				ValueNeutralLong: item[c_name + "ValueChar"],
		// 				atfor: item[c_name + "atfor"],
		// 			}
		// 			let chartonum_oentry = {
		// 				ExternalNumber: item.ExternalNumber,
		// 				ClassType: item.ClassType,
		// 				ClassNumber: item.ClassNumber,
		// 				Charact: c_name,
		// 				ValueFrom: item[c_name + "ValueChar"],
		// 				CharactDescr: item[c_name],
		// 				atfor: item[c_name + "atfor"],
		// 				ValueRelation: "1",
		// 				ValueChar: item[c_name + "ValueChar"],
		// 			}
		// 			if (item[c_name + "atfor"] == "CHAR") {
		// 				sedetolinchar.push(OEntry)
		// 				chartochar.push(chartochar_oentry)
		// 			} else if (item[c_name + "atfor"] == "NUM" || item[c_name + "atfor"] == "DATE") {
		// 				sedetolinnum.push(sedetolinnum_oentry)
		// 				chartonum.push(chartonum_oentry)
		// 			}
		// 		}
		// 	})
		// 	let that = this;
		// 	let oModel = this.getView().getModel()
		// 	let sedeSetUrl = "/sedeSet(" + "'" + sedetolinchar[0]?.ExternalNumber + "'" + ")";
		// 	let oData = await that.oDataRead(sedeSetUrl, oModel);
		// 	// create JSON model
		// 	var oODataJSONModel = new sap.ui.model.json.JSONModel(oData);
		// 	that.getView().setModel(oODataJSONModel, "ModelloSalvaOData");
		// 	let ModelloCreate = that.getView().getModel("ModelloSalvaOData").oData;
		// 	ModelloCreate.sedetolin.results[0].sedetolinchar = sedetolinchar
		// 	ModelloCreate.sedetolin.results[0].sedetolinnum = sedetolinnum
		// 	ModelloCreate.sedetochar.results[0].chartonum = chartonum
		// 	ModelloCreate.sedetochar.results[0].chartochar = chartochar
		// 	oModel.create("/sedeSet", {
		// 		DataGeneral: ModelloCreate.DataGeneral,
		// 		DataGeneralX: ModelloCreate.DataGeneralX,
		// 		DataSpecific: ModelloCreate.DataSpecific,
		// 		DataSpecificX: ModelloCreate.DataSpecificX,
		// 		ExternalNumber: ModelloCreate.ExternalNumber,
		// 		Return: ModelloCreate.Return,
		// 		StartEndPointSet: ModelloCreate.StartEndPointSet,
		// 		sedetochar: ModelloCreate.sedetochar,
		// 		sedetolin: ModelloCreate.sedetolin,
		// 	},
		// 		{
		// 			success: function (oData, oRes) {
		// 				var msg2 = oRes.data.Return.Message;
		// 				MessageToast.show(msg2);
		// 			},
		// 			error: function (oErr) { console.log("error") }
		// 		}
		// 	)
		// },







		SalvaTutto: async function (oEvent) {
			let ModelloSalva = this.getView().getModel("lagpModel").oData
			let sedetolinchar = []
			let sedetolinnum = []
			let chartochar = []
			let chartonum = []
			ModelloSalva.map((item) => {
				let characteristic_names = Object.keys(item).filter(p => !props_to_remove.some(ptr => ptr === p))
				characteristic_names = characteristic_names.filter(p => p.indexOf("ValueChar") < 0)
				for (const c_name of characteristic_names) {
					let OEntry = {
						StartPoint: item.StartPoint,
						EndPoint: item.EndPoint,
						LinearLength: item.LinearLength,
						LinearUnit: item.LinearUnit,
						ExternalNumber: item.ExternalNumber,
						Charact: c_name,
						CharactDescr: item[c_name],
						ValueChar: item[c_name + "ValueChar"],
						ValueCharLong: item[c_name + "ValueChar"],
						ValueNeutral: item[c_name + "ValueChar"],
						ValueNeutralLong: item[c_name + "ValueChar"],
						atfor: item[c_name + "atfor"],
					}
					let sedetolinnum_oentry = {
						ExternalNumber: item.ExternalNumber,
						Charact: c_name,
						ValueFrom: item[c_name + "ValueChar"],  //Da cambiare
						ValueTo: item.ValueTo,
						ValueRelation: item.ValueRelation,
						UnitFrom: item.UnitFrom,
						UnitTo: item.UnitTo,
						UnitFromIso: item.UnitFromIso,
						UnitToIso: item.UnitToIso,
						CharactDescr: item[c_name],
						Counter: item.Counter,
						StartPoint: item.StartPoint,
						EndPoint: item.EndPoint,
						LinearLength: item.LinearLength,
						LinearUnit: item.LinearUnit,
						LinearUnitIso: item.LinearUnitIso,
						ValueChar: item.ValueChar,
						ValueRelation: "1",
						atfor: item[c_name + "atfor"]
					}
					let chartochar_oentry = {
						ExternalNumber: item.ExternalNumber,
						ClassType: item.ClassType,
						ClassNumber: item.ClassNumber,
						Charact: c_name,
						ValueChar: item[c_name + "ValueChar"],
						ValueNeutral: item[c_name + "ValueChar"],
						CharactDescr: item[c_name],
						ValueCharLong: item[c_name + "ValueChar"],
						ValueNeutralLong: item[c_name + "ValueChar"],
						atfor: item[c_name + "atfor"],
					}
					let chartonum_oentry = {
						ExternalNumber: item.ExternalNumber,
						ClassType: item.ClassType,
						ClassNumber: item.ClassNumber,
						Charact: c_name,
						ValueFrom: item[c_name + "ValueChar"],
						CharactDescr: item[c_name],
						atfor: item[c_name + "atfor"],
						ValueRelation: "1",
						ValueChar: item[c_name + "ValueChar"],
					}
					if (item[c_name + "atfor"] == "CHAR") {
						sedetolinchar.push(OEntry)
						chartochar.push(chartochar_oentry)
					} else if (item[c_name + "atfor"] == "NUM" || item[c_name + "atfor"] == "DATE") {
						sedetolinnum.push(sedetolinnum_oentry)
						chartonum.push(chartonum_oentry)
					}
				}
			})
			let that = this;
			let oModel = this.getView().getModel()
			let sedeSetUrl = "/sedeSet(" + "'" + sedetolinchar[0]?.ExternalNumber + "'" + ")";
			let oData = await that.oDataRead(sedeSetUrl, oModel);
			// create JSON model
			var oODataJSONModel = new sap.ui.model.json.JSONModel(oData);
			that.getView().setModel(oODataJSONModel, "ModelloSalvaOData");
			let ModelloCreate = that.getView().getModel("ModelloSalvaOData").oData;
			ModelloCreate.sedetolin.results[0].sedetolinchar = sedetolinchar
			ModelloCreate.sedetolin.results[0].sedetolinnum = sedetolinnum
			ModelloCreate.sedetochar.results[0].chartonum = chartonum
			ModelloCreate.sedetochar.results[0].chartochar = chartochar
			let ModelloDatGeneral = this.getView().getModel("ModelloInput").oData.DataGeneral
			oModel.create("/sedeSet", {
				DataGeneral: ModelloDatGeneral,
				DataGeneralX: ModelloCreate.DataGeneralX,
				DataSpecific: ModelloCreate.DataSpecific,
				DataSpecificX: ModelloCreate.DataSpecificX,
				ExternalNumber: ModelloCreate.ExternalNumber,
				Return: ModelloCreate.Return,
				StartEndPointSet: ModelloCreate.StartEndPointSet,
				sedetochar: ModelloCreate.sedetochar,
				sedetolin: ModelloCreate.sedetolin,
			},
				{
					success: function (oData, oRes) {
						var msg2 = oRes.data.Return.Message;
						MessageToast.show(msg2);
					},
					error: function (oErr) { console.log("error") }
				}
			)
		},







		oDataRead: function (sEntitySet, oModel) {
			return new Promise(function (resolve, reject) {
				oModel.read(sEntitySet, {
					urlParameters: {
						"$expand": "sedetochar,sedetolin,StartEndPointSet,sedetochar/chartochar,sedetochar/chartocurr,sedetochar/chartonum,sedetolin/sedetolinchar,sedetolin/sedetolincurr,sedetolin/sedetolinnum,StartEndPointSet/CharStartEndPointValueSet",
					},
					method: "GET",
					success: function (oData) {
						resolve(oData);
					},
					error: function (error) {
						reject(error);
					}
				});
			});
		},



		_toggleButtonsAndView: function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "Change" : "Display");
		},

		_getFormFragment: function (sFragmentName) {
			var pFormFragment = this._formFragments[sFragmentName],
				oView = this.getView();

			if (!pFormFragment) {
				pFormFragment = Fragment.load({
					id: oView.getId(),
					name: "my.company.simmflocext.view." + sFragmentName
				});
				this._formFragments[sFragmentName] = pFormFragment;
			}

			return pFormFragment;
		},

		readData: function (params) {
			var oModel = this.getView().getModel();
			var that = this;
			var ExternalNumber = "";
			if (params) {
				ExternalNumber = "'" + params.name + "'";
			}
			oModel.read("/sedeSet(" + ExternalNumber + ")", {
				urlParameters: {
					"$expand": "sedetochar,sedetolin,StartEndPointSet,sedetochar/chartochar,sedetochar/chartocurr,sedetochar/chartonum,sedetolin/sedetolinchar,sedetolin/sedetolincurr,sedetolin/sedetolinnum,StartEndPointSet/CharStartEndPointValueSet",
				},
				method: "GET",
				success: function (oData) {
					var msg = 'Operazione in corso';
					MessageToast.show(msg);
					//Create Json Model for table
					var oODataJSONModel = new sap.ui.model.json.JSONModel();
					// create JSON model for label input 
					var ModelloInputModel = new sap.ui.model.json.JSONModel();
					ModelloInputModel.setData(oData);
					that.getView().setModel(ModelloInputModel, "ModelloInput");
					//-------------------------------------------------------------------------------------------------
					var result = oData.StartEndPointSet;
					var array = [];


					_.forEach(result.results, function (o) {
						array = array.concat(o.CharStartEndPointValueSet.results)
					})


					var colonneTab = [];
					_.forEach(array, function (o) {
						var nomeColonnaKey = o.Charact;
						var nomeColonna = o.ValueChar;
						var oggetto = {
							"nomeColonnaKey": nomeColonnaKey
						};
						oggetto[o.Charact] = o.Charact;
						oggetto[o.Charact + "CharactDescr"] = o.CharactDescr;
						colonneTab.push(oggetto)
					})


					colonneTab = colonneTab.filter((value, index, self) =>
						index === self.findIndex((t) => (
							t.nomeColonnaKey === value.nomeColonnaKey)))
					_.forEach(colonneTab, function (o) {
						delete o.nomeColonnaKey
					});



					var arraycolonne = [];
					_.forEach(array, function (o) {
						var oggetto = {};
						for (var prop in o) {
							if (prop == "Charact") {
								oggetto[o[prop]] = o["CharactDescr"];
								var propr = o["Charact"] + "ValueChar";
								oggetto[propr] = o["ValueChar"];
								var propratfor = o["Charact"] + "atfor";
								oggetto[propratfor] = o["atfor"];
							} else if (prop != "ValueChar" && prop !== "CharactDescr" && prop !== "atfor") {
								oggetto[prop] = o[prop];
							}
						}
						arraycolonne.push(oggetto)
					})


					//Tabella Dinamica


					var oTable = that.getView().byId("TabellaPrincipale")

					var TestColonne = [
					]
					for (var i = 0; i < colonneTab.length; i++) {
						var obj = colonneTab[i];
						for (var prop in obj) {
							if (prop.indexOf("Charact") > 0) {
								var test = obj[prop]
							}
						}
						TestColonne.push(test)
					}



					//creo intestazioni colonne


					for (var i = 0; i < TestColonne.length; i++) {
						var oColumn = new sap.m.Column("col" + i, {
							width: "22em",
							header: new sap.m.Label({
								text: TestColonne[i],

							}),

						});
						oTable.addColumn(oColumn);
					}


					var array2 = array.filter((value, index, self) =>
						index === self.findIndex((t) => (
							t.EndPoint === value.EndPoint && t.StartPoint === value.StartPoint
						)));

					var array3 = []
					_.forEach(array2, function (o) {
						var founded = _.filter(arraycolonne, function (s) { return o.EndPoint === s.EndPoint && o.StartPoint === s.StartPoint })
						var reduced = founded.reduce(function (result, current) {
							return Object.assign(result, current);
						}, {});
						array3.push(reduced)
					})

					oODataJSONModel.setSizeLimit(array3.length + 10);
					oODataJSONModel.setData(array3);
					that.getView().setModel(oODataJSONModel, "lagpModel");



					//aggiungere le celle ciclo tutti gli items e aggiungo le celle in base alle chiavi


					var items = oTable.getAggregation("items");
					_.forEach(items, function (o) {
						for (var i = 0; i < colonneTab.length; i++) {
							var colonna = colonneTab[i];
							for (var prop in colonna) {
								if (prop.indexOf("Charact") < 0) {
									var cell = new sap.m.Input({
										value: '{lagpModel>' + prop + 'ValueChar}', submit: function (oEvent) {
											that.onSubmitChange(oEvent)
										}
									});
									o.addCell(cell)
								}
							}


						}


					})
				},

				error: function (e) {
					var msg = 'Operazione non Riuscita!';
					MessageToast.show(msg);
				},
			});
		},

		



		_showFormFragment: function (sFragmentName) {
			var oPage = this.byId("page");
			var that = this;
			oPage.removeAllContent();
			this._getFormFragment(sFragmentName).then(function (oVBox) {
				if (that.getView().getModel("HeaderInfoModel")) {
					that.headerInfoModelData = that.getView().getModel("HeaderInfoModel").getData();
					that.readData(that.headerInfoModelData);
				}
				else {
					that.headerInfoModelData = undefined;
				}

				oPage.insertContent(oVBox);
			});
		}
	});

});