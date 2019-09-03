﻿using InWords.Abstractions;
using InWords.Data.Domains.EmailEntitys;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InWords.Data.Repositories
{
    public class EmailVerifierRepository : Repository<EmailVerifier>
    {
        public EmailVerifierRepository(InWordsDataContext context) : base(context)
        {

        }

        public async Task<EmailVerifier> CreateEmailVerifier(int userId, int code)
        {
            EmailVerifier emailVerifier = new EmailVerifier
            {
                UserId = userId,
                Code = code,
                SentTime = DateTime.Now
            };
            return await Create(emailVerifier);
        }
    }
}