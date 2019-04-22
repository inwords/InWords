using System;
using System.Collections.Generic;

namespace InWords.Service.TFA.Models.Email
{
    public class Email
    {
        private string body;

        public Email()
        {
            Recipients = new List<string>(1);
        }

        public string Subject { get; set; }
        public string Sender { get; set; }
        public List<string> Recipients { get; set; }

        public string Body
        {
            get => body;
            set
            {
                body = value;
                if (!string.IsNullOrEmpty(Signature)) body += Environment.NewLine + Signature;
            }
        }

        public string Signature { get; set; }
    }
}