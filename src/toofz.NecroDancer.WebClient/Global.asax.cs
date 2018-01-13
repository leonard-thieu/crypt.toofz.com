using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.Extensibility;

namespace toofz.NecroDancer.WebClient
{
    /// <summary>
    /// The ASP.NET MVC application.
    /// </summary>
    public class MvcApplication : HttpApplication
    {
        internal static readonly TelemetryClient TelemetryClient = new TelemetryClient();

        public static readonly string Version = Assembly.GetExecutingAssembly().GetName().Version.ToString();

        public static HashSet<string> AssetPaths { get; } = new HashSet<string>();

        /// <summary>
        /// Performs application configuration.
        /// </summary>
        protected void Application_Start()
        {
            TelemetryConfiguration.Active.InstrumentationKey = Helper.GetInstrumentationKey();

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            MvcHandler.DisableMvcResponseHeader = true;

            RegisterAssetPaths("~/src", "*.html");
            RegisterAssetPaths("~/data", "*.json");
        }

        private void RegisterAssetPaths(string virtualPathRoot, string searchPattern)
        {
            var root = Server.MapPath("~");

            var virtualPaths = Directory.EnumerateFiles(Server.MapPath(virtualPathRoot), searchPattern, SearchOption.AllDirectories);
            foreach (var virtualPath in virtualPaths)
            {
                var rootRelativePath = "/" + virtualPath.Replace(root, "").Replace(@"\", "/");
                AssetPaths.Add(rootRelativePath);
            }
        }
    }
}
