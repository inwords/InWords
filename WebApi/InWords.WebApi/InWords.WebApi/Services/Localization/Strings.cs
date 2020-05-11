using InWords.WebApi.Services.Localization;
using System.Collections.Generic;
using System.Reflection;
using System.Resources;

namespace InWords.WebApi.Services
{
    public static partial class Strings
    {
        private static Dictionary<Locale, string> localeToManage = new Dictionary<Locale, string>
        {
            { Locale.EnUs, "InWords.WebApi.AppData.en-us"},
            { Locale.RuRu, "InWords.WebApi.AppData.ru-ru"},
        };

        private static Dictionary<Locale, ResourceManager> resourceManagers = new Dictionary<Locale, ResourceManager>();

        public static string GetDetailMessage(Locale locale,DetailMessage detailMessage) 
        {
            var resourseManager = GetResourceManager(locale);

            string? value = resourseManager.GetString(detailMessage.ToString(), System.Globalization.CultureInfo.CurrentCulture);
            if (string.IsNullOrWhiteSpace(value))
                value = "Message was not found in localization file";

            return value;
        }

        private static ResourceManager GetResourceManager(Locale locale)
        {
            if (!resourceManagers.ContainsKey(locale))
            {
                resourceManagers.Add(locale, new ResourceManager(localeToManage[locale], Assembly.GetExecutingAssembly()));
            }
            return resourceManagers[locale];
        }
    }
}
