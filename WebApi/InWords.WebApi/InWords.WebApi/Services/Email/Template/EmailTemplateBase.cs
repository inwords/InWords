using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Template
{
    public abstract class EmailTemplateBase
    {
        public abstract string Subject { get; set; }
        public abstract string HtmlBody { get; set; }
        public abstract string TextBody { get; set; }
    }
}
