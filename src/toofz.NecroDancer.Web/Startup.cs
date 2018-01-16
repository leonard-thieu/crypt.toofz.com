using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace toofz.NecroDancer.Web
{
    internal sealed class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            RegisterAssetPaths(env, "src", "*.html");
            RegisterAssetPaths(env, "data", "*.json");
        }

        private void RegisterAssetPaths(IHostingEnvironment env, string virtualPathRoot, string searchPattern)
        {
            var root = env.WebRootPath;

            var virtualPaths = Directory.EnumerateFiles(Path.Combine(root, virtualPathRoot), searchPattern, SearchOption.AllDirectories);
            foreach (var virtualPath in virtualPaths)
            {
                var rootRelativePath = virtualPath.Replace(root, "").Replace(@"\", "/");
                Global.AssetPaths.Add(rootRelativePath);
            }
        }
    }
}
