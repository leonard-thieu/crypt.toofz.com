using System;
using System.Configuration;

namespace toofz.NecroDancer.WebClient
{
    internal static class Helper
    {
        public static string GetInstrumentationKey()
        {
            return Environment.GetEnvironmentVariable("toofzInstrumentationKey", EnvironmentVariableTarget.Machine) ??
                   ConfigurationManager.AppSettings["InstrumentationKey"] ??
                   "";
        }
    }
}