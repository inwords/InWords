namespace InWords.Service.TFA
{
    using System;
    using System.Collections.Generic;

    public interface IEmailProvider
    {
        void Send(Email email);
        IEnumerable<Email> GetMail(string msg);
        event EventHandler<Email> OnGetMail;
    }
}
