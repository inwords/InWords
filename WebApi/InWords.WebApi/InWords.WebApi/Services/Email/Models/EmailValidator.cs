using InWords.Data.Repositories;
using InWords.WebApi.Services.Abstractions;
using System;

namespace InWords.WebApi.Services.Email.Models
{
    public class EmailCodeValidator : IValidator
    {
        public readonly EmailVerifierRepository emailVerifierRepository;

        public EmailCodeValidator(EmailVerifierRepository emailVerifierRepository)
        {
            this.emailVerifierRepository = emailVerifierRepository;
        }

        bool IValidator.IsValid()
        {
            throw new NotImplementedException();
        }
    }
}