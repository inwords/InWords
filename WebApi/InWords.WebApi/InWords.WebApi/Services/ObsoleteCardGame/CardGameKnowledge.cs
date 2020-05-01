using InWords.Data.DTO.Enums;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.WebApi.Model.UserWordPair;
using System;
using System.Collections.Generic;

namespace InWords.WebApi.Services.CardGame
{
    [Obsolete]
    public sealed class CardGameKnowledge : IKnowledgeQualifier
    {
        private readonly LevelMetricQuery levelMetricQuery;

        public CardGameKnowledge(LevelMetricQuery levelMetricQuery)
        {
            this.levelMetricQuery = levelMetricQuery;
        }

        Dictionary<int, KnowledgeQualities> IKnowledgeQualifier.Qualify()
        {
            var qualifyPairs = new Dictionary<int, KnowledgeQualities>();
            foreach ((int key, int value) in levelMetricQuery.WordPairIdOpenCounts)
                qualifyPairs[key] = QualityOfPair(value);
            return qualifyPairs;
        }

        private KnowledgeQualities QualityOfPair(int openCounts)
        {
            switch (openCounts)
            {
                case var o when o <= 4:
                    return KnowledgeQualities.EasyToRemember;
                case 5:
                    return KnowledgeQualities.StillRemember;
                default:
                    return KnowledgeQualities.NoLongerRemember;
            }
        }
    }
}