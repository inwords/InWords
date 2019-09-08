using System;

namespace InWords.Common
{
    public static class EmailHider
    {
        private static readonly string stars = "***";
        private static readonly int loginLength = 2;
        public static string Hide(string email)
        {
            string[] split = email.Split("@");

            string login = split[0];
            if (string.IsNullOrEmpty(login) || login.Length < loginLength)
                login = "";
            else
                login = split[0].Substring(0, loginLength);

            string domain = stars;
            if (split.Length > 1 && !string.IsNullOrWhiteSpace(split[1]))
                domain = split[1];

            string hidedEmail = $"{login}{stars}@{domain}";
            return hidedEmail;
        }
    }
}
