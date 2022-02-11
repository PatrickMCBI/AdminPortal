using System;
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
            IGetTravelRequestRecordRefData data = new TravelRequestRecordRefDataLogic();

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

        public ActionResult Print(int documentRefID)
        {
            TravelRequestIndividualRecordParamDataModel model = new TravelRequestIndividualRecordParamDataModel
            {
                DocumentRefID = documentRefID
            };

            ITravelRequestIndividualRecordData data = new TravelRequestIndividualRecordDataLogic(model);

            return View("~/Views/TravelRecord/_Print.cshtml", data.TravelRequestIndividualRecordData());
        }
    }
}