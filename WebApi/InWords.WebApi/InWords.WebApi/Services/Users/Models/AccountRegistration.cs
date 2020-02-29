using InWords.Data.Domains;
using InWords.Data.Enums;
using InWords.Service.Encryption;
using InWords.Service.Encryption.Interfaces;
using InWords.WebApi.Services.Users.Extentions;
using System;

namespace InWords.WebApi.Services.Users.Models
{
    public class AccountRegistration
    {
        private readonly IPasswordSalter passwordSalter;
        public Account Account { get; private set; }
        public AccountRegistration(string email, string password, string nickName = "")
        {
            passwordSalter = new SaltGenerator();
            if (string.IsNullOrEmpty(nickName))
            {
                nickName = NicknameGenerator.FromEmail(email);
            }

            Account = new Account()
            {
                Email = email,
                Hash = passwordSalter.SaltPassword(password),
                Role = RoleType.Unverified,
                RegistrationDate = DateTime.UtcNow
            };
            Account.User = new User
            {
                NickName = nickName,
                Experience = 0
            };
        }
    }
}
