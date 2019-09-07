using System.Collections.Generic;
using System.Linq;
using InWords.Data.Domains;
using InWords.Data.Repositories;

namespace InWords.WebApi.Services
{
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