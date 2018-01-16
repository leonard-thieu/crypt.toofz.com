using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;

namespace toofz.NecroDancer.Web
{
    public static class Global
    {
        public static readonly string Version = FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion;

        public static HashSet<string> AssetPaths { get; } = new HashSet<string>();

    }
}
