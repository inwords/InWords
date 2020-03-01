using System.Reflection;
using System.Resources;

namespace InWords.WebApi.Services
{
    public static class Strings
    {
        public readonly static ResourceManager ResourceManager = new ResourceManager("InWords.WebApi.AppData.strings", Assembly.GetExecutingAssembly());

        public static string GetString(string? text)
        {
            if (string.IsNullOrEmpty(text))
                return string.Empty;

            string? value = ResourceManager.GetString(text, System.Globalization.CultureInfo.CurrentCulture);
            if (string.IsNullOrWhiteSpace(value))
                value = string.Empty;

            return value;
        }
    }
}
