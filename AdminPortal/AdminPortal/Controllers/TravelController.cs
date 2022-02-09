using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BusinessLogic.EmployeeTravel;
using BusinessRef.Interfaces.Customs;

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
            IGetTravelRequestNewReferenceData getMaterialRequest = new EmployeeTravelNewRefDataLogic();

            return Json(getMaterialRequest.GetTravelRequestNewReferenceData(), JsonRequestBehavior.AllowGet);
        }
    }
}