using InWords.WebApi.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi
{
    public static class GlobalConfiguration
    {
        public static IList<ModuleInfo> Modules { get; set; } = new List<ModuleInfo>();

        //public static IList<Culture> Cultures { get; set; } = new List<Culture>();

        public static string DefaultCulture => "ru-RU";

        public static string WebRootPath { get; set; }

        public static string ContentRootPath { get; set; }
    }
}
