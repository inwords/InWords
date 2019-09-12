using InWords.Data.Domains;
using InWords.Data.Repositories;
using InWords.WebApi.Services.UserWordPairService.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService
{
    public class KnowledgeUpdate
    {
        private readonly UserWordPairRepository userWordPairRepository = null;
        public KnowledgeUpdate(UserWordPairRepository userWordPairRepository)
        {
            this.userWordPairRepository = userWordPairRepository;
        }

        /// <summary>
        /// This is to update <see cref="UserWordPair"/> learning period
        /// </summary>
        /// <param name="PairKnowledges">Int is <see cref="UserWordPair"/> id</param>
        /// <returns></returns>
        public async Task ByDicrinary(Dictionary<int, KnowledgeQualitys> PairKnowledges)
        {
            // load all user words
            IEnumerable<UserWordPair> userWordPairs = userWordPairRepository.GetWhere(u => PairKnowledges.ContainsKey(u.UserWordPairId));
            // calculate knowledge update
            
            // update knowledge licence
        }
    }
}
