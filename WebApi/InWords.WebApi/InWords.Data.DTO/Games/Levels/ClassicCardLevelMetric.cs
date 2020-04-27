using InWords.Data.DTO.Abstractions;
using InWords.Data.DTO.Enums;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;

namespace InWords.Data.DTO.Games.Levels
{
    public class ClassicCardLevelMetric : ILevelScore, IKnowledgeQualifier
    {
        /// <summary>
        /// Represent a shared game level id, id equals zero if it, history brand new levels
        /// </summary>
        public int GameLevelId { get; set; }
        /// <summary>
        /// Word Pair Id means users need to store theirs global word pair id
        /// </summary>
        public Dictionary<int, int> WordPairIdOpenCounts { get; set; }
        public int Score()
        {
            var score = 0;
            int wordsCount = WordPairIdOpenCounts.Count * 2;
            int openingQuantity = WordPairIdOpenCounts.Sum(s => s.Value);
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
            foreach ((int key, int value) in WordPairIdOpenCounts)
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
