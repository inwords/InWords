using InWords.Data.Domains;
using InWords.Data.Repositories;
using InWords.WebApi.Modules.Abstractions;
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
    [Obsolete]
    public class KnowledgeUpdateService : IUserWordPairService
    {
        private readonly KnowledgeLicenseCalculator knowledgeLicenseCalculator;
        private readonly UserWordPairRepository userWordPairRepository;

        public KnowledgeUpdateService(UserWordPairRepository userWordPairRepository)
        {
            this.userWordPairRepository = userWordPairRepository;
            knowledgeLicenseCalculator = new KnowledgeLicenseCalculator();
        }

        /// <summary>
        ///     This is to update <see cref="UserWordPair" /> learning period
        /// </summary>
        /// <param name="PairKnowledges">Int is <see cref="UserWordPair" /> id</param>
        /// <returns></returns>
        public async Task UpdateKnowledge(int userid, IKnowledgeQualifier knowledgeQualifier)
        {
            // calculate knowledge update
            IEnumerable<UserWordPair> userWordPairs = CalculateKnowledgeUpdate(userid, knowledgeQualifier);
            // update knowledge licence
            await userWordPairRepository.Update(userWordPairs);
        }

        public async Task UpdateKnowledge(int userid, params IKnowledgeQualifier[] knowledgeQualifiers)
        {
            // calculate knowledge update
            IEnumerable<UserWordPair> userWordPairs = knowledgeQualifiers
                .Select(k => CalculateKnowledgeUpdate(userid, k))
                .Aggregate((x, y) => x.Concat(y));

            IEnumerable<UserWordPair> bestPair = userWordPairs
                .GroupBy(s => s.UserWordPairId)
                .Select(s => SelectBestTrained(s, userWordPairs));

            // update knowledge licence
            await userWordPairRepository.Update(userWordPairs);
        }

        private static UserWordPair SelectBestTrained(IGrouping<int, UserWordPair> s,
            IEnumerable<UserWordPair> userWordPairs)
        {
            return userWordPairs
                .Where(u => u.UserWordPairId.Equals(s.Key))
                .OrderByDescending(o => o.LearningPeriod).First();
        }

        private IEnumerable<UserWordPair> CalculateKnowledgeUpdate(int userid, IKnowledgeQualifier knowledgeQualifier)
        {
            Dictionary<int, KnowledgeQualitys> knowledgeQuality = knowledgeQualifier.Qualify();
            // load all user words
            IEnumerable<UserWordPair> userWordPairs = userWordPairRepository.GetWhere(u =>
                knowledgeQuality.ContainsKey(u.WordPairId) && u.UserId.Equals(userid));
            // calculate knowledge update
            userWordPairs = UpdateLicenseInformation(userWordPairs, knowledgeQuality);
            return userWordPairs;
        }

        /// <summary>
        ///     This method for updating <see cref="UserWordPair" />'s learning period and time to learning
        ///     using PairKnowledges from IKnowledgeQualifier.
        /// </summary>
        /// <param name="userWordPairs"></param>
        /// <param name="PairKnowledges"></param>
        /// <returns></returns>
        private IEnumerable<UserWordPair> UpdateLicenseInformation(IEnumerable<UserWordPair> userWordPairs,
            Dictionary<int, KnowledgeQualitys> PairKnowledges)
        {
            // for every word pair in user dictionary 
            foreach (UserWordPair userWordPair in userWordPairs)
            {
                // get quality from qualifier
                KnowledgeQualitys quality = PairKnowledges[userWordPair.WordPairId];

                // get wordpair license
                KnowledgeLicense knowledgeLicense = userWordPair.GetLicense();

                // update license by license and quality
                knowledgeLicense = knowledgeLicenseCalculator.Update(knowledgeLicense, quality);

                // set license in pair strucure 
                userWordPair.SetLicense(knowledgeLicense);
            }

            return userWordPairs;
        }
    }
}