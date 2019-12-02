using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using InWords.Data.DTO.Abstractions;
using InWords.Data.DTO.Enums;

namespace InWords.Data.DTO.Games.Levels
{
    public class ClassicCardLevelMetric : ILevelScore, IKnowledgeQualifier
    {
        public int GameLevelId { get; set; }
        public Dictionary<int, int> UserWordPairIdOpenCounts { get; set; }
        public int Score()
        {
            var score = 0;
            int wordsCount = UserWordPairIdOpenCounts.Count * 2;
            int openingQuantity = UserWordPairIdOpenCounts.Sum(s => s.Value);
            int bestOpeningsCount = wordsCount * 2 - 2;
            if (openingQuantity <= bestOpeningsCount)
                score = 3;
            else if (openingQuantity <= wordsCount * 2.25)
                score = 2;
            else if (openingQuantity <= wordsCount * 2.5) score = 1;
            return score;
        }

        public ImmutableDictionary<int, KnowledgeQualities> Qualify()
        {
            var qualifyPairs = new Dictionary<int, KnowledgeQualities>();
            foreach ((int key, int value) in UserWordPairIdOpenCounts)
                qualifyPairs[key] = QualityOfPair(value);

            return qualifyPairs.ToImmutableDictionary();
        }

        private static KnowledgeQualities QualityOfPair(int openCounts)
        {
            return openCounts switch
            {
                var o when o <= 4 => KnowledgeQualities.EasyToRemember,
                5 => KnowledgeQualities.StillRemember,
                _ => KnowledgeQualities.NoLongerRemember
            };
        }
    }
}
