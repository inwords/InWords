using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class VerificationCleaner
    {
        public readonly EmailVerifierRepository emailVerifierRepository;

        public VerificationCleaner(EmailVerifierRepository emailVerifierRepository)
        {
            this.emailVerifierRepository = emailVerifierRepository;
        }

        public async Task ClearUserVereficationsStory(int userId)
        {
            IEnumerable<EmailVerifies> verifications = emailVerifierRepository.GetWhere(e => e.UserId == userId);
            await emailVerifierRepository.Remove(verifications.ToArray());
        }
    }
}