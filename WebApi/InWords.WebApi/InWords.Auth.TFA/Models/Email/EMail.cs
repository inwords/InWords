namespace InWords.Auth.TFA
{
    using System.Collections.Generic;

    public class Email
    {
        public string Subject { get; set; }
        public string Sender { get; set; }
        public List<string> Recipients { get; set; }
        public string Body { get; set; }
        public string Signature { get; set; }
    }
}