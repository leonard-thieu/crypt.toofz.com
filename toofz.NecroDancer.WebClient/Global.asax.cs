using System;
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

        protected void Application_Start()
        {
            InstrumentationKey = Environment.GetEnvironmentVariable("toofzInstrumentationKey", EnvironmentVariableTarget.Machine);

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            MvcHandler.DisableMvcResponseHeader = true;
        }
    }
}
