using InWords.Data;
using InWords.WebApi.Business.GameEvaluator.Enum;
using InWords.WebApi.Business.GameEvaluator.Model;
using InWords.WebApi.Model.UserWordPair;
using InWords.WebApi.Modules.ClassicCardGame.Extentions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets.Extentions
{
    public static class DBUpdateUserWordPairsExtention
    {
        public static void UpdateMemorization(this InWordsDataContext context, IEnumerable<WordKnowledge> wordKnowledges, int userid)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));
            // wind all words
            var knowledges = wordKnowledges.ToArray();
            var pairsToUpdate = knowledges.Select(d => d.UserWordPairId).ToArray();

            var userwordpairs = context.UserWordPairs.Where(w => w.UserId == userid && pairsToUpdate.Contains(w.UserWordPairId)).ToArray();

            var knowledgeDictionary = wordKnowledges
                .GroupBy(d => d.UserWordPairId)
                .ToDictionary(
                d => d.Key, 
                d => d.Aggregate(WordKnowledge.Agregate));

            foreach (var pair in userwordpairs)
            {
                if (knowledgeDictionary.ContainsKey(pair.UserWordPairId))
                {
                    var memoryData = knowledgeDictionary[pair.UserWordPairId];
                    switch (memoryData.MemoryLevel)
                    {
                        case MemoryLevel.Unknown:
                            pair.LearningPeriod = (short)Math.Floor(pair.LearningPeriod * 0.2);
                            break;
                        case MemoryLevel.Known: break;
                        case MemoryLevel.WellKnown:
                            pair.LearningPeriod += 1;
                            break;
                    }

                    pair.TimeGap = DateTime.UtcNow.AddDays(BaseMemorization.Ebbinghaus(pair.LearningPeriod, 0.8 * memoryData.Complexity));
                }
            }
        }
    }
}
