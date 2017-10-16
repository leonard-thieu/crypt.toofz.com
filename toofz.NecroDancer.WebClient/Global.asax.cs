using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.ApplicationInsights.Extensibility;

namespace toofz.NecroDancer.WebClient
{
    public class MvcApplication : HttpApplication
    {
        public static string ApiBaseUrl
        {
            get => Environment.GetEnvironmentVariable("toofzApiBaseAddress", EnvironmentVariableTarget.Machine);
        }

        public static string InstrumentationKey
        {
            get => TelemetryConfiguration.Active.InstrumentationKey;
            private set
            {
                if (value == null)
                {
                    TelemetryConfiguration.Active.InstrumentationKey = "";
                    TelemetryConfiguration.Active.DisableTelemetry = true;
                }
                else
                {
                    TelemetryConfiguration.Active.InstrumentationKey = value;
                    TelemetryConfiguration.Active.DisableTelemetry = false;
                }
            }
        }

        public static string Version = Assembly.GetExecutingAssembly().GetName().Version.ToString();

        public static IReadOnlyDictionary<string, string> Fingerprints
        {
            get => fingerprints;
        }
        static readonly Dictionary<string, string> fingerprints = new Dictionary<string, string>();

        protected void Application_Start()
        {
            InstrumentationKey = Environment.GetEnvironmentVariable("toofzInstrumentationKey", EnvironmentVariableTarget.Machine);

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            MvcHandler.DisableMvcResponseHeader = true;

            var root = Server.MapPath("~");
            var templates = Directory.EnumerateFiles(Server.MapPath("~/src"), "*.html", SearchOption.AllDirectories);
            var data = Directory.EnumerateFiles(Server.MapPath("~/data"), "*.json", SearchOption.AllDirectories);
            var assets = templates.Concat(data).ToList();
            foreach (var asset in assets)
            {
                var rootRelativePath = "/" + asset.Replace(root, "").Replace(@"\", "/");
                fingerprints.Add(rootRelativePath, Fingerprint.Tag(rootRelativePath));
            }
        }
    }
}
