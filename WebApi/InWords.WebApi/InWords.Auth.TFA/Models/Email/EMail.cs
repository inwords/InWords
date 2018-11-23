namespace InWords.Auth.TFA
{
    using System;
    using System.Collections.Generic;

    public class Email
    {
        public string Subject { get; set; }
        public string Sender { get; set; }
        public List<string> Recipients { get; set; }

        private string body;
        public string Body
        {
            get { return body; }
            set
            {
                body = value;
                if (Signature != null && Signature != "")
                {
                    body += Environment.NewLine + Signature;
                }
            }
        }

        public Email()
        {
            Recipients = new List<string>(1);
        }

        public string Signature { get; set; }
    }
}