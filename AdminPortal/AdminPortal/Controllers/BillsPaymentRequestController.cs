using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BusinessRef.Interfaces.Customs;
using BusinessRef.Model.BillingPaymentRequest;
using BusinessLogic.BillsPaymentRequest;

namespace AdminPortal.Controllers
{
    [Filters.UserLoginFilter]
    public class BillsPaymentRequestController : Controller
    {
        // GET: BillsPaymentRequest
        public ActionResult IndexRecords()
        {
            return PartialView("~/Views/BillsPaymentRequest/_IndexRecords.cshtml");
        }
        public ActionResult IndividualRecord()
        {
            return PartialView("~/Views/BillsPaymentRequest/_IndividualRecord.cshtml");
        }
        public JsonResult GetBillsPaymentRequestRead(int documentRefID)
        {
            BillsPaymentRequestParamReadDataModel paramData = new BillsPaymentRequestParamReadDataModel
            {
                DocumentRefID = documentRefID
            };

            IBillsPaymentRequestReadData data = new BillsPaymentRequestReadDataLogic(paramData);

            return Json(data.GetBillsPaymentRequestReadData(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult BillsPaymentRequestApprove(BillsPaymentRequestParamApproveDataModel paramData)
        {
            paramData.UserNameID = Convert.ToInt32(Session["UserNameID"]);
            IBillsPaymentRequestApproveData data = new BillsPaymentRequestApproveDataLogic(paramData);

            return Json(data.GetDmlBillsPaymentRequestApproveData(), JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public JsonResult BillsPaymentRequestCancel(BillsPaymentRequestParamCancelnDataModel paramData)
        {
            paramData.UserNameID = Convert.ToInt32(Session["UserNameID"]);
            IBillsPaymentRequestCancelData data = new BillsPaymentRequestCancelDataLogic(paramData);

            return Json(data.GetDmlBillsPaymentRequestCancelData(), JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetBillsPaymentRequestRecordReference(BillsPaymentRequestParamRecordReference paramData)
        {
            paramData.UserNameID = Convert.ToInt32(Session["UserNameID"]);

            IBillsPaymentRequestReferenceRecordData data = new BillsPaymentRequestReferenceRecordDataLogic(paramData);

            return Json(data.GetBillsPaymentRequestReferenceRecordData(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBillsPaymentRequestIndividualRecord(int documentRefID)
        {
            BillsPaymentRequestParamIndividualRecord paramData = new BillsPaymentRequestParamIndividualRecord
            {
                DocumentRefID = documentRefID
            };

            IBillsPaymentRequestIndividualRecordData data = new BillsPaymentRequestIndividualRecordDataLogic(paramData);

            return Json(data.GetBillsPaymentRequestIndividualRecordData(), JsonRequestBehavior.AllowGet);
        }
    }
}