using InWords.Data.Domains.EmailEntitys;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace InWords.WebApi.Services.Users.Extentions
{
    public static class EmailVerifiesExtentions
    {
        private const int EMAIL_OUT_OF_DATE = 7;
        public static IQueryable<EmailVerifies> OutOfDated(this DbSet<EmailVerifies> emailVerifies, int code, string email, int userId)
        {
            DateTime outOfdate = DateTime.UtcNow.AddDays(EMAIL_OUT_OF_DATE);
            return emailVerifies
                .Where(e => (e.UserId.Equals(userId) &&
                e.Code.Equals(code) &&
                e.Email.ToLower() == email.ToLower()) || e.SentTime < outOfdate);
        }

        public static IQueryable<EmailVerifies> OutOfDated(this DbSet<EmailVerifies> emailVerifies, Guid guid)
        {
            DateTime outOfdate = DateTime.UtcNow.AddDays(EMAIL_OUT_OF_DATE);
            return emailVerifies.Where(e => e.Guid.Equals(guid) || e.SentTime < outOfdate);
        }
    }
}
