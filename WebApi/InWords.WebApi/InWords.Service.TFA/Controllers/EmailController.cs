namespace InWords.Service.TFA.Controllers
{
    using InWords.Service.TFA.Data;
    using System;
    using System.Threading.Tasks;

    /// <summary>
    /// Controller to confirm email address
    /// </summary>
    public class EmailController : I2FAProvider //todo : Base2FAProvider + common IsValidKey
    {
        private readonly EmailService emailService = null;

        public EmailController()
        {
            var context = new TFADataContext();
            emailService = new EmailService(context);
        }

        public async Task<string> ConfirmEmail(string email)
        {
            var key = await emailService.GetKey(email); //todo async
            return key;
        }

        Task<string> I2FAProvider.GetKey(string identity)
        {
            throw new NotImplementedException();
        }

        Task<bool> I2FAProvider.IsValidKey(string identity, string key)
        {
            throw new NotImplementedException();
        }
    }
}
