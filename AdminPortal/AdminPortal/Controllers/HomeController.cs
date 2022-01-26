using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdminPortal.Controllers
{
    [Filters.UserLoginFilter]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        
    }
}