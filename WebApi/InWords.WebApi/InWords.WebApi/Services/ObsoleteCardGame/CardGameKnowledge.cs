using System;
using System.Collections.Generic;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.WebApi.Services.UserWordPairService.Abstraction;
using InWords.WebApi.Services.UserWordPairService.Enum;

namespace InWords.WebApi.Services.CardGame
{
    [Obsolete]
    public sealed class  CardGameKnowledge : IKnowledgeQualifier
    {
        private readonly LevelMetricQuery levelMetricQuery;

        public CardGameKnowledge(LevelMetricQuery levelMetricQuery)
        {
            this.levelMetricQuery = levelMetricQuery;
        }

        Dictionary<int, KnowledgeQualitys> IKnowledgeQualifier.Qualify()
        {
            var qualifyPairs = new Dictionary<int, KnowledgeQualitys>();
            foreach ((int key, int value) in levelMetricQuery.WordPairIdOpenCounts)
                qualifyPairs[key] = QualityOfPair(value);
            return qualifyPairs;
        }

        private KnowledgeQualitys QualityOfPair(int openCounts)
        {
            switch (openCounts)
            {
                case var o when o <= 4:
                    return KnowledgeQualitys.EasyToRemember;
                case 5:
                    return KnowledgeQualitys.StillRemember;
                default:
                    return KnowledgeQualitys.NoLongerRemember;
            }
        }
    }
}