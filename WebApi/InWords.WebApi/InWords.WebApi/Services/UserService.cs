using InWords.Data.Domains;
using InWords.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InWords.WebApi.Services
{
    [Obsolete]
    public class UserService
    {
        private readonly UserRepository usersRepository;

        public UserService(UserRepository usersRepository)
        {
            this.usersRepository = usersRepository;
        }

        public IEnumerable<User> GetUsers(string nickLike)
        {
            return usersRepository.GetWhere(u => u.NickName.ToLower().Contains(nickLike.ToLower())).Take(50);
        }
    }
}