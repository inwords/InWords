using System;

namespace InWords.WebApi.Services.Users.Extentions
{
    public static class NicknameGenerator
    {
        public static string FromEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentNullException($"{nameof(email)} is null");

            string nickname = email.Remove(email.IndexOf("@", StringComparison.Ordinal));

            return nickname;
        }
    }
}
