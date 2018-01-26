using System;
using System.IO;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Html;

namespace toofz.NecroDancer.Web
{
    internal static class IHtmlContentExtensions
    {
        public static string ToString(this IHtmlContent htmlContent, HtmlEncoder htmlEncoder)
        {
            if (htmlContent == null)
                throw new ArgumentNullException(nameof(htmlContent));
            if (htmlEncoder == null)
                throw new ArgumentNullException(nameof(htmlEncoder));

            using (var sw = new StringWriter())
            {
                htmlContent.WriteTo(sw, htmlEncoder);

                return sw.ToString();
            }
        }
    }
}
