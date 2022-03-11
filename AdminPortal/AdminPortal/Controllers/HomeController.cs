using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BusinessRef.Interfaces.Customs;
using BusinessLogic.BillsPaymentRequest;

namespace AdminPortal.Controllers
{
    [Filters.UserLoginFilter]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetPendingAdmin()
        {
            IGetBillsPaymentRequestPendingAdminData data = new BillsPaymentRequestPendingAdminDataLogic();

            return Json(data.GetBillsPaymentRequestPendingAdminData(), JsonRequestBehavior.AllowGet);
        }
    }
}