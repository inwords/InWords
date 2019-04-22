using System;
using System.Threading.Tasks;
using InWords.Service.TFA.Data;
using InWords.Service.TFA.Interfaces;
using InWords.Service.TFA.Services;

namespace InWords.Service.TFA.Controllers
{
    /// <summary>
    ///     Controller to confirm email address
    /// </summary>
    public class EmailController : I2FaProvider //todo : Base2FAProvider + common IsValidKey
    {
        private readonly EmailService emailService;

        public EmailController()
        {
            var context = new TFADataContext();
            emailService = new EmailService(context);
        }

        Task<string> I2FaProvider.GetKey(string identity)
        {
            throw new NotImplementedException();
        }

        Task<bool> I2FaProvider.IsValidKey(string identity, string key)
        {
            throw new NotImplementedException();
        }

        public async Task<string> ConfirmEmail(string email)
        {
            string key = await emailService.GetKey(email); //todo async
            return key;
        }
    }
}