using InWords.WebApi.Extensions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Models
{
    public static class TemplateResolver
    {
        // TODO: in config injection 
        private static readonly string TemplateFolder = $"{Environment.CurrentDirectory}/AppData/EmailTemplates/";

        public static async Task<string> LoadTemplateAsync(EmailTemplates emailTemplate)
        {
            string path = Path.Combine(TemplateFolder, $"{emailTemplate}.html");
            using var stream = new StreamReader(path);
            string template = await stream.ReadToEndAsync().ConfigureAwait(false);
            return template;
        }

        public static async Task<string> LoadTemplateAsync(EmailTemplates emailTemplate,
            Dictionary<string, string> keyValuePairs)
        {
            return (await LoadTemplateAsync(emailTemplate).ConfigureAwait(false)).Replace(keyValuePairs);
        }
    }
}