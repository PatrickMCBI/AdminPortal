using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BusinessRef.Model.FundRequest;
using BusinessRef.Interfaces.Customs;
using BusinessLogic.FundRequest;

namespace AdminPortal.Controllers
{
    public class FundRequestController : Controller
    {
        // GET: FundRequest
        public ActionResult Index()
        {
            return PartialView("~/Views/FundRequest/_IndexFundRequestRecord.cshtml");
        }
        public JsonResult SaveNewFundRequestTravelMaster(FundRequestParamNewDataModel paramData)
        {
            paramData.UserNameID = Convert.ToInt32(Session["UserNameID"]);
            IFundrequestNewData masterNewData = new FundRequestNewDataLogic(paramData);

            return Json(masterNewData.GetDmlFundrequestNewData(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFundRequestRecordReferenceData()
        {
            FundRequestParamRecordRefDataModel paramData = new FundRequestParamRecordRefDataModel
            {
                UserNameID = Convert.ToInt32(Session["UserNameID"])
            };

            IFundrequestRecordRefData data = new FundRequestRecordRefDataLogic(paramData);

            return Json(data.GetFundrequestRecordRefData(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult IndividualRecord()
        {
            return PartialView("~/Views/FundRequest/_IndividualRecord.cshtml");
        }
        public JsonResult GetFundRequestIndividualRecord(int documentRefID)
        {
            FundRequestParamIndividualRecordDataModel paramData = new FundRequestParamIndividualRecordDataModel
            {
                DocumentRefID = documentRefID
            };
            IFundrequestIndividualRecordData data = new FundRequestIndividualRecordDataLogic(paramData);

            return Json(data.GetIndividualRecordData(), JsonRequestBehavior.AllowGet);
        }
    }
}