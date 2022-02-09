using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
    }
}