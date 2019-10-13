using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using InWords.WebApi.Extensions;

namespace InWords.WebApi.Services.Email.Models
{
    public static class TemplateResolver
    {
        // TODO: in config injection 
        private static readonly string TemplateFolder = $"{Environment.CurrentDirectory}/AppData/EmailTemplates/";

        public static Task<string> LoadTemplate(EmailTemplates emailTemplate)
        {
            string path = Path.Combine(TemplateFolder, $"{emailTemplate}.html");
            using (var stream = new StreamReader(path))
            {
                return stream.ReadToEndAsync();
            }
        }

        public static async Task<string> LoadTemplate(EmailTemplates emailTemplate,
            Dictionary<string, string> keyValuePairs)
        {
            return (await LoadTemplate(emailTemplate)).Replace(keyValuePairs);
        }
    }
}