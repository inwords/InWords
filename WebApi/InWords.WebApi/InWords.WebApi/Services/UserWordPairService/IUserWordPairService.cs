using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService
{
    interface IUserWordPairService
    {
        public async Task UpdateWords(int userId, Dictionary<int,int> PairOpenCount);
    }
}
