using System.Collections.Generic;
using System.Linq;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;

namespace InWords.WebApi.Service
{
    public class UserService : ServiceBase
    {
        private readonly AccountRepository accauntRepositoty;
        private readonly UserRepository usersRepository;

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