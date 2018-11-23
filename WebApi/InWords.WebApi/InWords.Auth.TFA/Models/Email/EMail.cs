namespace InWords.Auth.TFA
{
    public class Email
    {
        public string Subject { get; set; }
        public string Sender { get; set; }
        public string Recipient { get; set; }
        public string Body { get; set; }
        public string Signature { get; set; }
    }
}