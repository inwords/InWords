using InWords.Service.TFA.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Service.TFA.Controllers
{
    public class EmailController
    {
        private readonly AuthRequestRepository authRequestRepository = null;

        public EmailController()
        {
            TFADataContext context = new TFADataContext();
            authRequestRepository = new AuthRequestRepository(context);
        }

        public async void ConfirmEmail(string Email)
        {
            AuthRequest request = new AuthRequest()
            {
                Identity = Email,
                Code = "5000",
                TimeToLive = DateTime.Now.AddMinutes(10)
            };
            await authRequestRepository.Create(request);
        }
    }
}
