using System.Web.Mvc;
using toofz.NecroDancer.WebClient.ErrorHandler;

namespace toofz.NecroDancer.WebClient
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new AiHandleErrorAttribute());
        }
    }
}
