using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
    }
}