using System.Web.Mvc;

namespace toofz.NecroDancer.WebClient.Controllers
{
    public sealed class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}