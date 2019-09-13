using InWords.Data.Domains;
using InWords.Data.Repositories;
using InWords.WebApi.Services.UserWordPairService.Abstraction;
using InWords.WebApi.Services.UserWordPairService.Enum;
using InWords.WebApi.Services.UserWordPairService.Extension;
using InWords.WebApi.Services.UserWordPairService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService
{
    public class KnowledgeUpdateService : IUserWordPairService
    {
        private readonly UserWordPairRepository userWordPairRepository = null;
        private readonly KnowledgeLicenseManager knowledgeLicenseManager = null;
        public KnowledgeUpdateService(UserWordPairRepository userWordPairRepository)
        {
            this.userWordPairRepository = userWordPairRepository;
            this.knowledgeLicenseManager = new KnowledgeLicenseManager();
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
            userWordPairs = UpdateLicenseInformation(userWordPairs, PairKnowledges);
            // update knowledge licence
            await userWordPairRepository.Update(userWordPairs);
        }

        private IEnumerable<UserWordPair> UpdateLicenseInformation(IEnumerable<UserWordPair> userWordPairs, Dictionary<int, KnowledgeQualitys> PairKnowledges)
        {
            foreach (var userWordPair in userWordPairs)
            {
                KnowledgeQualitys quality = PairKnowledges[userWordPair.UserWordPairId];
                KnowledgeLicense knowledgeLicense = userWordPair.GetLicense();
                knowledgeLicense = knowledgeLicenseManager.Update(knowledgeLicense, quality);
                userWordPair.SetLicense(knowledgeLicense);
            }
            return userWordPairs;
        }
    }
}
