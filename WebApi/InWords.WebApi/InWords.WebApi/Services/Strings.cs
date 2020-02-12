using System.Reflection;
using System.Resources;

namespace InWords.WebApi.Services
{
    public static class Strings
    {
        public readonly static ResourceManager ResourceManager = new ResourceManager("strings", Assembly.GetExecutingAssembly());

        public static string GetString(string? text)
        {
            string? value = ResourceManager.GetString(text, System.Globalization.CultureInfo.CurrentCulture);
            if (string.IsNullOrWhiteSpace(value))
                value = string.Empty;
            return value;
        }
    }
}
