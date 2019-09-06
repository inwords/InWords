using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class EmailLinkVerificationService
    {
        //private async Task<bool> HasLink(string base64Link)
        //{
        //    EmailVerifier emailVerifier = await emailVerifierRepository.FindById(base64Link);
        //    return emailVerifier != null;
        //}

        //private async Task ProccedMessageLinkVerification(IList<EmailVerifier> emailVerifiers, bool isCorrect)
        //{
        //    if (isCorrect)
        //    {
        //        // Delete email verification
        //        await emailVerifierRepository.Remove(userId);
        //    }
        //    else
        //    {
        //        EmailVerifier emailVerifier = await emailVerifierRepository.FindById(userId);
        //        emailVerifier.Attempts++;
        //        await emailVerifierRepository.Update(emailVerifier);
        //    }
        //}

        //public async Task<bool> IsLinkCorrect(string link)
        //{
        //    bool isCorrect = await HasLink(link);
        //    await ProccedMessageLinkVerification(isCorrect);
        //    return isCorrect;
        //}
    }
}
