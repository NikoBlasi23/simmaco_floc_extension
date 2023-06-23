sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createAnagraficaModel: function () {
                return new JSONModel({
                    Zopera: "", // Opera
                    CodiceOpera: "", // DA CALCOLARE
                    Typtx: "", // Descrizione Opera
                    Zelemento: "", // Elemento
                    Zparteopera:"", // Parte d'Opera
                    Fltyp: "", // Car. sede Tec.
                    Eqart: "", // Tipo di oggetto
                    Zlivello: "", //Livello Ogetto
                })
            },

            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },

            DataSpecificX: function () {
                var oModel = new JSONModel({
                    "Return": {
                        "Type": "",
                        "Id": "",
                        "Number": "002",
                        "Message": "",
                        "LogNo": "",
                        "LogMsgNo": "000000",
                        "MessageV1": "",
                        "MessageV2": "",
                        "MessageV3": "",
                        "MessageV4": "",
                        "Parameter": "",
                        "Row": "0",
                        "Field": "",
                        "System": ""
                    },
                    "DataSpecificX": {
                        
                        "Funcloc": "",
                        "LabelSyst": "",
                        "Strind": "",
                        "Category": "",
                        "Supfloc": "",
                        "Eqinstall": "",
                        "Eqsingle": "",
                        "Posnr": "",
                        "ReadReferenceLocation": ""
                    },
                    "DataSpecific": {
                        
                        "Strind": "ZMOS",
                        "ClassType": "003",
                        "Category": "S",
                        "Supfloc": "TEST",
                        "Eqinstall": "X",
                        "Eqsingle": "",
                        "Posnr": "",
                        "ReadReferenceLocation": ""
                    },
                    "DataGeneral": {
                        "__metadata": {
                            "type": "ZCREA_ST_SRV.DataGeneral"
                        },
                        "Abcindic": "",
                        "Acqdate": "20000101",
                        "Acquisval": "1.00 ",
                        "AssetNo": "",
                        "Authgrp": "0001",
                        "BusArea": "",
                        "Catprofile": "",
                        "CompCode": "ANAS",
                        "Constmonth": "",
                        "Consttype": "",
                        "ConsttypeExternal": "",
                        "ConsttypeGuid": "",
                        "ConsttypeLong": "",
                        "ConsttypeVersion": "",
                        "Constyear": "",
                        "Costcenter": "",
                        "CountrIso": "",
                        "Currency": "EUR",
                        "CurrIso": "EUR",
                        "Descript": "Sede Tecnica Test connessione",
                        "DistrChan": "",
                        "Division": "",
                        "EndPoint": "             1.000", //end point dati linaeri 
                        "FirstOffsetTypeCode": "PO",
                        "FirstOffsetUnit": "MM",
                        "FirstOffsetUnitIso": "MMT",
                        "FirstOffsetValue": "                 1",
                        "Inventory": "",
                        "LinearLength": "               996",
                        "LinearReferencePattern": "SS543", //LRPID DATI Lineari
                        "LinearUnit": "MM",
                        "LinearUnitIso": "MMT",
                        "Maintloc": "",
                        "Maintplant": "CONA",
                        "Maintroom": "",
                        "Mancountry": "",
                        "Manfacture": "",
                        "Manmodel": "Test",
                        "Manparno": "",
                        "Manserno": "",
                        "MarkerDistanceEndPoint": "",
                        "MarkerDistanceStartPoint": "",
                        "MarkerDistanceUnit": "",
                        "MarkerDistanceUnitIso": "",
                        "MarkerEndPoint": "",
                        "MarkerStartPoint": "",
                        "Objecttype": "STTS",
                        "ObjSize": "",
                        "ObjWeight": "0.000 ",
                        "Plangroup": "001",
                        "Planplant": "CONA",
                        "Plsectn": "",
                        "PpWkctr": "00000000",
                        "ReadAdrnr": "",
                        "ReadChdat": "00000000",
                        "ReadChnam": "",
                        "ReadCrdat": "20230515",
                        "ReadCrnam": "E93392E",
                        "ReadObjnr": "IF00000000000000000310",
                        "SalesGrp": "",
                        "SalesOff": "",
                        "SalesOrg": "",
                        "SecondOffsetTypeCode": "VO",
                        "SecondOffsetUnit": "CM",
                        "SecondOffsetUnitIso": "CMT",
                        "SecondOffsetValue": "                 2",
                        "Settlorder": "",
                        "ShiftNoteNotificationType": "",
                        "ShiftReportType": "",
                        "Sortfield": "",
                        "Standorder": "",
                        "StartFrom": "20000101",
                        "StartPoint": "                 4", //sTARTPOINT DATI Lineari
                        "SubNumber": "",
                        "testo": "",
                        "UnitIso": "",
                        "UnitOfWt": "",
                        "WbsElem": "00000000",
                        "WorkCtr": "00000000",
                        "Zzdataods": "00000000",
                        "Zzestesa": "   0.000",
                        "Zziflot": "",
                        "Zziflotdescr": "",
                        "Zzkm": "000",
                        "Zzkma": "   0.000",
                        "Zzkmda": "   0.000",
                        "Zzlatitude_end": "            2.333000000000",//Dati latitudine
                        "Zzlatitude_start": "            1.222000000000",//Dati latitudine
                        "Zzlongitude_end": "            4.555000000000", //Dati longiotudine
                        "Zzlongitude_start": "            3.444000000000",//Dati longiotudine
                        "Zznprotocods": "",
                        "Zzns": "",
                        "Zznsint": "00000000000000000000",
                        "Zzsoaweext": "",
                        "Zzsoaweold": "",
                        "Zzstradeext": "",
                        "Zzstradeint": "0000000000"
                    },
                    "DataGeneralX": {
                       
                        "Authgrp": "",
                        "Objecttype": "",
                        "Inventory": "",
                        "ObjSize": "",
                        "ObjWeight": "",
                        "UnitOfWt": "",
                        "UnitIso": "",
                        "Acqdate": "",
                        "Acquisval": "",
                        "Currency": "",
                        "CurrIso": "",
                        "Manfacture": "",
                        "Mancountry": "",
                        "CountrIso": "",
                        "Manserno": "",
                        "Manmodel": "",
                        "Constyear": "",
                        "Constmonth": "",
                        "StartFrom": "",
                        "Planplant": "",
                        "Consttype": "",
                        "Manparno": "",
                        "Plangroup": "",
                        "Catprofile": "",
                        "WorkCtr": "",
                        "Descript": "",
                        "Abcindic": "",
                        "Sortfield": "",
                        "Maintplant": "",
                        "Maintloc": "",
                        "Maintroom": "",
                        "Plsectn": "",
                        "PpWkctr": "",
                        "BusArea": "",
                        "Costcenter": "",
                        "WbsElem": "",
                        "CompCode": "",
                        "AssetNo": "",
                        "SubNumber": "",
                        "Standorder": "",
                        "Settlorder": "",
                        "SalesOrg": "",
                        "DistrChan": "",
                        "Division": "",
                        "SalesOff": "",
                        "SalesGrp": "",
                        "ReadCrdat": "",
                        "ReadCrnam": "",
                        "ReadChdat": "",
                        "ReadChnam": "",
                        "ReadAdrnr": "",
                        "ConsttypeExternal": "",
                        "ConsttypeGuid": "",
                        "ConsttypeVersion": "",
                        "ReadObjnr": "",
                        "ShiftReportType": "",
                        "ShiftNoteNotificationType": "",
                        "StartPoint": "",
                        "EndPoint": "",
                        "LinearLength": "",
                        "LinearUnit": "",
                        "FirstOffsetTypeCode": "",
                        "FirstOffsetValue": "",
                        "FirstOffsetUnit": "",
                        "SecondOffsetTypeCode": "",
                        "SecondOffsetValue": "",
                        "SecondOffsetUnit": "",
                        "SecondOffsetUnitIso": "",
                        "LinearUnitIso": "",
                        "FirstOffsetUnitIso": "",
                        "LinearReferencePattern": "",
                        "MarkerStartPoint": "",
                        "MarkerDistanceStartPoint": "",
                        "MarkerEndPoint": "",
                        "MarkerDistanceEndPoint": "",
                        "MarkerDistanceUnit": "",
                        "MarkerDistanceUnitIso": "",
                        "ConsttypeLong": ""
                    },
                    "ExternalNumber": "TEST-12",
                    "sedetochar": {
                        "results": [
                            {
                               
                                "ExternalNumber": "TEST-12",
                                "ClassType": "003",
                                "ClassNumber": "TEST_FU3",
                                "Language": "",
                                "chartonum": {
                                    "results": []
                                },
                                "chartochar": {
                                    "results": [
                                        {
                                            
                                            "ExternalNumber": "TEST-12",
                                            "ClassType": "003",
                                            "ClassNumber": "TEST_FU3",
                                            "Charact": "COLORE_FONDO_1",
                                            "ValueChar": "Blu",
                                            "Inherited": "",
                                            "Instance": "000",
                                            "ValueNeutral": "3",
                                            "CharactDescr": "Colore fondo 1",
                                            "ValueCharLong": "Blu",
                                            "ValueNeutralLong": "3"
                                        }
                                    ]
                                },
                                "chartocurr": {
                                    "results": []
                                }
                            },
                            {
                               
                                "ExternalNumber": "TEST-12",
                                "ClassType": "003",
                                "ClassNumber": "TEST_LAM",
                                "Language": "",
                                "chartonum": {
                                    "results": []
                                },
                                "chartochar": {
                                    "results": [
                                        {
                                            
                                            "ExternalNumber": "TEST-12",
                                            "ClassType": "003",
                                            "ClassNumber": "TEST_LAM",
                                            "Charact": "TEST_3",
                                            "ValueChar": "SI",
                                            "Inherited": "",
                                            "Instance": "000",
                                            "ValueNeutral": "1",
                                            "CharactDescr": "test LAM",
                                            "ValueCharLong": "SI",
                                            "ValueNeutralLong": "1"
                                        }
                                    ]
                                },
                                "chartocurr": {
                                    "results": []
                                }
                            }
                        ]
                    },
                    "sedetolin": {
                        "results": [
                            {
                                
                                "ExternalNumber": "TEST-12",
                                "sedetolinchar": {
                                    "results": [
                                        {
                                            
                                            "ExternalNumber": "TEST-12",
                                            "Charact": "TEST_3",
                                            "ValueChar": "SI",
                                            "ValueNeutral": "1",
                                            "CharactDescr": "test LAM",
                                            "Counter": "0001",
                                            "StartPoint": "             1,000",
                                            "EndPoint": "             3,000",
                                            "LinearLength": "             2,000",
                                            "LinearUnit": "KM",
                                            "LinearUnitIso": "KMT",
                                            "ValueCharLong": "SI",
                                            "ValueNeutralLong": "1"
                                        },
                                        {
                                           
                                            "ExternalNumber": "TEST-12",
                                            "Charact": "TEST_3",
                                            "ValueChar": "SI",
                                            "ValueNeutral": "1",
                                            "CharactDescr": "test LAM",
                                            "Counter": "0002",
                                            "StartPoint": "             2,000",
                                            "EndPoint": "             4,000",
                                            "LinearLength": "             3,000",
                                            "LinearUnit": "KM",
                                            "LinearUnitIso": "KMT",
                                            "ValueCharLong": "SI",
                                            "ValueNeutralLong": "1"
                                        }
                                    ]
                                },
                                "sedetolincurr": {
                                    "results": []
                                },
                                "sedetolinnum": {
                                    "results": []
                                }
                            }
                        ]
                    }
                });
                oModel.setDefaultBindingMode("TwoWay");
                return oModel;
            },
           
        };
    });