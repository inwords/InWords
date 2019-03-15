using InWords.Data.Models;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;

namespace InWords.WebApi.Service
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Data;

    public class UserService : ServiceBase
    {
        private readonly UserRepository usersRepository;
        private readonly AccountRepository accauntRepositoty;

        public UserService(InWordsDataContext context) : base(context)
        {
            usersRepository = new UserRepository(context);
            accauntRepositoty = new AccountRepository(context);
        }

        public IEnumerable<User> GetUsers(string nickLike)
        {
            return usersRepository.Get(u => u.NickName.ToLower().Contains(nickLike.ToLower())).Take(50);
        }
    }
}
