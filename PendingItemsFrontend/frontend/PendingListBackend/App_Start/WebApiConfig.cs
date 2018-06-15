using System.Web.Http;
using System.Web.Http.Cors;

namespace PendingListBackend
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // CORS enabling
            var corsAttr = new EnableCorsAttribute(
            origins: "http://localhost:4200",
            headers: "*",
            methods: "*");

            config.EnableCors(corsAttr);

            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
