using System;
using System.Collections.Generic;
using InWords.Service.TFA.Models.Email;

namespace InWords.Service.TFA.Interfaces
{
    public interface IEmailProvider
    {
        void Send(Email email);
        IEnumerable<Email> GetMail(string msg);
        event EventHandler<Email> OnGetMail;
    }
}