namespace InWords.Service.TFA
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class EmailService : I2FAProvider
    {
        private readonly IEmailProvider emailProvider = null;

        public EmailService(IEmailProvider emailProvider = null)
        {
            emailProvider = emailProvider ?? new Providers.EmailProvider();

            this.emailProvider = emailProvider;
        }

        public string GetKey(string identity)
        {
            throw new NotImplementedException();
        }

        public bool IsValidKey(string identity, string key)
        {
            throw new NotImplementedException();
        }
    }
}