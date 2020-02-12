﻿using InWords.Data.Domains;
using InWords.Data.Enums;
using InWords.Service.Encryption;
using InWords.Service.Encryption.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users
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
