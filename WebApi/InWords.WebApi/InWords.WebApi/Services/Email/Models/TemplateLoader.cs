using InWords.WebApi.Extensions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Models
{
    public static class TemplateResolver
    {
        // TODO: in config injection 
        private readonly static string TemplateFolder = $"{Environment.CurrentDirectory}/AppData/EmailTemplates/";
        public static async Task<string> LoadTemplate(EmailTemplates emailTemplate)
        {
            string path = Path.Combine(TemplateFolder, $"{emailTemplate}.html");
            using (StreamReader stream = new StreamReader(path))
            {
                return await stream.ReadToEndAsync();
            }
        }

        public static async Task<string> LoadTemplate(EmailTemplates emailTemplate, Dictionary<string, string> keyValuePairs)
        {
            return (await LoadTemplate(emailTemplate)).Replace(keyValuePairs);
        }
    }
}
