using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Newtonsoft.Json;

namespace toofz.NecroDancer.Web.TagHelpers
{
    /// <summary>
    /// 
    /// </summary>
    [HtmlTargetElement("link", Attributes = "[href^='~/']", TagStructure = TagStructure.WithoutEndTag)]
    [HtmlTargetElement("script", Attributes = "[src^='~/']")]
    public sealed class ManifestTagHelper : TagHelper
    {
        private static readonly Dictionary<string, string[]> ElementAttributeLookups =
            new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase)
            {
                { "link", new[] { "href" } },
                { "script", new[] { "src" } },
            };

        /// <summary>
        /// 
        /// </summary>
        /// <param name="urlHelperFactory"></param>
        /// <param name="htmlEncoder"></param>
        /// <param name="env"></param>
        public ManifestTagHelper(IUrlHelperFactory urlHelperFactory, HtmlEncoder htmlEncoder, IHostingEnvironment env)
        {
            this.urlHelperFactory = urlHelperFactory;
            this.htmlEncoder = htmlEncoder;
            this.env = env;
        }

        private readonly IUrlHelperFactory urlHelperFactory;
        private readonly HtmlEncoder htmlEncoder;
        private readonly IHostingEnvironment env;

        /// <summary>
        /// 
        /// </summary>
        public override int Order => -2000;

        /// <summary>
        /// 
        /// </summary>
        [HtmlAttributeNotBound]
        [ViewContext]
        public ViewContext ViewContext { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool UseManifest { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="output"></param>
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (UseManifest)
            {
                if (ElementAttributeLookups.TryGetValue(output.TagName, out var attributeNames))
                {
                    var urlHelper = urlHelperFactory.GetUrlHelper(ViewContext);
                    foreach (var attributeName in attributeNames)
                    {
                        if (output.Attributes.TryGetAttribute(attributeName, out var urlAttr))
                        {
                            var url = ((IHtmlContent)urlAttr.Value).ToString();
                            var fileName = Path.GetFileName(url);
                            if (GetManifest().TryGetValue(fileName, out var mappedFileName))
                            {
                                var mappedUrl = urlHelper.Content(url.Replace(fileName, mappedFileName));
                                output.Attributes.SetAttribute(attributeName, mappedUrl);
                            }
                        }
                    }
                }
            }
        }

        private Dictionary<string, string> GetManifest()
        {
            var appManifest = GetManifest("app.manifest.json");
            var vendorManifest = GetManifest("vendor.manifest.json");

            foreach (var (key, value) in vendorManifest)
            {
                appManifest.Add(key, value);
            }

            return appManifest;
        }

        private Dictionary<string, string> GetManifest(string fileName)
        {
            var manifestPath = Path.Combine(env.WebRootPath, "app", fileName);
            var json = File.ReadAllText(manifestPath);

            return JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
        }
    }
}
