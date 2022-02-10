
using System.Web.Mvc;
using BusinessLogic.EmployeeTravel;
using BusinessRef.Interfaces.Customs;
using BusinessRef.Model.EmployeeTravel;

namespace AdminPortal.Controllers
{
    [Filters.UserLoginFilter]
    public class TravelController : Controller
    {
        // GET: Travel
        public ActionResult IndexTravelNew()
        {
            return PartialView("~/Views/Travel/_TravelNew.cshtml");
        }
        public JsonResult GetTravelNewRefData()
        {
            IGetTravelRequestNewReferenceData getMaterialRequest = new TravelRequestNewRefDataLogic();

            return Json(getMaterialRequest.GetTravelRequestNewReferenceData(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveNewEmployeeTravelMaster(TravelRequestHeaderParamNewDataModel paramNewDataModel)
        {
            paramNewDataModel.UserNameID = int.Parse(Session["UserNameID"].ToString());
            ITravelRequestHeaderNewData masterNewData = new TravelRequestHeaderNewDataLogic(paramNewDataModel);

            return Json(masterNewData.GetDmlTravelRequestHeaderNewData(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UpdateNewEmployeeTravelMaster(TravelRequestHeaderParamUpdateDataModel paramUpdateDataModel)
        {
            paramUpdateDataModel.UserNameID = int.Parse(Session["UserNameID"].ToString());
            ITravelRequestHeaderUpdateData masterNewData = new TravelRequestHeaderUpdateDataLogic(paramUpdateDataModel);

            return Json(masterNewData.GetDmlTravelRequestHeaderUpdateData(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveNewEmployeeNameTravelDetail(TravelRequestDetailParamEmployeeNameNewDataModel paramNewDetailDataModel)
        {
            paramNewDetailDataModel.UserNameID = int.Parse(Session["UserNameID"].ToString());
            ITravelRequestDetailEmployeeNameNewData detailNewData = new TravelRequestDetailNewEmployeeNameDataLogic(paramNewDetailDataModel);

            return Json(detailNewData.GetDmlTravelRequestDetailEmployeeNameNewData(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UpdateNewEmployeeNameTravelDetail(TravelRequestDetailParamEmployeeNameUpdateDataModel paramNewDetailDataModel)
        {
            paramNewDetailDataModel.UserNameID = int.Parse(Session["UserNameID"].ToString());
            ITravelRequestDetailEmployeeNameUpdateData detailNewData = new TravelRequestDetailUpdateEmployeeNameDataLogic(paramNewDetailDataModel);

            return Json(detailNewData.GetDmlTravelRequestDetailEmployeeNameUpdateData(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveNewItineraryTravelDetail(TravelRequestDetailParamItineraryNewDataModel paramNewDetailDataModel)
        {
            paramNewDetailDataModel.UserNameID = int.Parse(Session["UserNameID"].ToString());
            ITravelRequestDetailItineraryNewData detailNewData = new TravelRequestDetailNewItineraryDataLogic(paramNewDetailDataModel);

            return Json(detailNewData.GetDmlTravelRequestDetailItineraryNewData(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateNewItineraryTravelDetail(TravelRequestDetailParamIteneraryUpdateDataModel paramNewDetailDataModel)
        {
            paramNewDetailDataModel.UserNameID = int.Parse(Session["UserNameID"].ToString());
            ITravelRequestDetailItineraryUpdateData detailNewData = new TravelRequestDetailUpdateItineraryDataLogic(paramNewDetailDataModel);

            return Json(detailNewData.GetDmlTravelRequestDetailItineraryUpdateData(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveNewAccomodationTravelDetail(TravelRequestDetailParamAccomodationNewDataModel paramNewDetailDataModel)
        {
            paramNewDetailDataModel.UserNameID = int.Parse(Session["UserNameID"].ToString());
            ITravelRequestDetailAccomodationNewData detailNewData = new TravelRequestDetailNewAccomodationDataLogic(paramNewDetailDataModel);

            return Json(detailNewData.GetDmlTravelRequestDetailAccomodationNewData(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateNewAccomodationTravelDetail(TravelRequestDetailParamAccomodationUpdateDataModel paramNewDetailDataModel)
        {
            paramNewDetailDataModel.UserNameID = int.Parse(Session["UserNameID"].ToString());
            ITravelRequestDetailAccomodationUpdateData detailNewData = new TravelRequestDetailUpdateAccomodationDataLogic(paramNewDetailDataModel);

            return Json(detailNewData.GetDmlTravelRequestDetailAccomodationUpdateData(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SendToEngTravelRequest(TravelRequestParamSendToEngDataModel paramNDataModel)
        {
            paramNDataModel.UserNameID = int.Parse(Session["UserNameID"].ToString());
            ITravelRequestSendToEngData detailNewData = new TravelRequestSendToEngDataLogic(paramNDataModel);

            return Json(detailNewData.GetDmlTravelRequestSendToEngData(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult TravelRequestDetailEmployeeDelete(TravelRequestDetailParamEmployeeDeleteDataModel model)
        {
            model.UserNameID = Session["UserNameID"] as int? ?? default;

            ITravelRequestDetailEmployeeDeleteData data = new TravelRequestDetailEmployeeDeleteDataLogic(model);

            return Json(data.TravelRequestDetailEmployeeDeleteData(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult TravelRequestDetailItineraryDelete(TravelRequestDetailParamItineraryDeleteDataModel model)
        {
            model.UserNameID = Session["UserNameID"] as int? ?? default;

            ITravelRequestDetailItineraryDeleteData data = new TravelRequestDetailItineraryDeleteDataLogic(model);

            return Json(data.TravelRequestDetailItineraryDeleteData(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult TravelRequestDetailAccomodationDelete(TravelRequestDetailParamAccomodationDeleteDataModel model)
        {
            model.UserNameID = Session["UserNameID"] as int? ?? default;

            ITravelRequestDetailAccomodationDeleteData data = new TravelRequestDetailAccomodationDeleteDataLogic(model);

            return Json(data.TravelRequestDetailAccomodationDeleteData());
        }
    }
}