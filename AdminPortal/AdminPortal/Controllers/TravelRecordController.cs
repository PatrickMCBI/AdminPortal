﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BusinessRef.Interfaces.Customs;
using BusinessLogic.EmployeeTravel;
using BusinessRef.Model.EmployeeTravel;

namespace AdminPortal.Controllers
{
    [Filters.UserLoginFilter]
    public class TravelRecordController : Controller
    {
        // GET: TravelRecord
        public ActionResult Index()
        {
            return PartialView("~/Views/TravelRecord/_Index.cshtml");
        }

        public ActionResult GetTravelRequestRecordReferenceData()
        {
            TravelRequestRecordParamRefDataModel dataModel = new TravelRequestRecordParamRefDataModel
            {
                UserNameID = Convert.ToInt32(Session["UserNameID"])
            };
            IGetTravelRequestRecordRefData data = new TravelRequestRecordRefDataLogic(dataModel);

            return Json(data.GetTravelRequestRecordRefData(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult TravelRequestIndividualRecord(int documentRefID)
        {
            TravelRequestIndividualRecordParamDataModel model = new TravelRequestIndividualRecordParamDataModel
            {
                DocumentRefID = documentRefID
            };

            ITravelRequestIndividualRecordData data = new TravelRequestIndividualRecordDataLogic(model);

            return Json(data.TravelRequestIndividualRecordData(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult PrintTO(int documentRefID)
        {
            TravelRequestIndividualRecordParamDataModel model = new TravelRequestIndividualRecordParamDataModel
            {
                DocumentRefID = documentRefID
            };

            ITravelRequestIndividualRecordData data = new TravelRequestIndividualRecordDataLogic(model);

            return View("~/Views/TravelRecord/_PrintTO.cshtml", data.TravelRequestIndividualRecordData());
        }

        public ActionResult PrintTR(int documentRefID)
        {
            TravelRequestIndividualRecordParamDataModel model = new TravelRequestIndividualRecordParamDataModel
            {
                DocumentRefID = documentRefID
            };

            ITravelRequestIndividualRecordData data = new TravelRequestIndividualRecordDataLogic(model);

            return View("~/Views/TravelRecord/_PrintTR.cshtml", data.TravelRequestIndividualRecordData());
        }
    }
}