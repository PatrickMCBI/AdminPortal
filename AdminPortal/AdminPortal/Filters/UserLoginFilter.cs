
using System.Web;
using System.Web.Mvc;

namespace AdminPortal.Filters
{
    public class UserLoginFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            int? userNameID = (int?)HttpContext.Current.Session["UserNameID"];

            if (userNameID == null)
            {
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.HttpContext.Response.Clear();
                    filterContext.HttpContext.Response.StatusCode = 440;
                    filterContext.HttpContext.Response.StatusDescription = "Session Expired.";
                    filterContext.HttpContext.Response.End();

                }
                else
                {

                    filterContext.Result = new RedirectResult("/UserLogin/Logout");
                }
            }
        }
    }
}