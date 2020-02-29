using InWords.Data.Domains.EmailEntitys;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace InWords.WebApi.Services.Users.Extentions
{
    public static class ContextEmailVerifies
    {
        private const int EMAIL_OUT_OF_DATE = 7;
        public static IQueryable<EmailVerifies> OutOfDated(this DbSet<EmailVerifies> emailVerifies, int code, string email, int userId)
        {
            DateTime outOfdate = DateTime.UtcNow.AddDays(EMAIL_OUT_OF_DATE);
            return emailVerifies
                .Where(e => e.UserId.Equals(userId) &&
                e.Code.Equals(code) &&
                e.Email.Equals(email, StringComparison.InvariantCultureIgnoreCase));
        }
    }
}
