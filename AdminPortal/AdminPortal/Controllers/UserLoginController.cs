
using System.Web.Mvc;

using BusinessLogic.UserLogin;
using BusinessRef.Interfaces.Customs;
using BusinessRef.Model.UserLogin;


namespace AdminPortal.Controllers
{
    public class UserLoginController : Controller
    {

        public ActionResult Login()
        {
            if (Session["UserNameID"] != null)
            {
                return RedirectToAction("Index", "Home");
            }

            return View("~/Views/UserLogin/Login.cshtml");
        }

        [HttpPost]
        public ActionResult Login(UserLoginParamDataModel userLoginParamData)
        {

            IUserLoginData userLoginData = new UserLoginDataLogic(userLoginParamData);

            var loginResult = userLoginData.GetDmlUserLoginData();

            if (loginResult.StatusCodeNumber == 1)
            {
                Session["UserNameID"] = loginResult.UserNameID;
                Session["UserFirstName"] = loginResult.UserFirstName;
                Session["UserLastName"] = loginResult.UserLastName;
            }

            return Json(userLoginData.GetDmlUserLoginData(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Logout()
        {
            Session.Clear();
            return RedirectToAction("Login");
        }

    }
}