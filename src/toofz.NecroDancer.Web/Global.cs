using System.Diagnostics;
using System.Reflection;

namespace toofz.NecroDancer.Web
{
    /// <summary>
    /// 
    /// </summary>
    public static class Global
    {
        /// <summary>
        /// 
        /// </summary>
        public static readonly string Version = FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion;
    }
}
