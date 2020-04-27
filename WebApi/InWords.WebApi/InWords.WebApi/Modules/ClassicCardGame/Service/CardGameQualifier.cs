using InWords.Common.Extensions;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.Protobuf;
using InWords.WebApi.Modules.Abstractions;
using InWords.WebApi.Services.UserWordPairService.Enum;
using System;
using System.Collections.Generic;

namespace InWords.WebApi.Modules.ClassicCardGame.Service
{
    public sealed class CardGameQualifier : IKnowledgeQualifier
    {
        private readonly Dictionary<int, int> levelMetricQuery;
        public CardGameQualifier(Dictionary<int,int> levelMetricQuery)
        {
            this.levelMetricQuery = levelMetricQuery;
        }

        Dictionary<int, KnowledgeQualitys> IKnowledgeQualifier.Qualify()
        {
            var qualifyPairs = new Dictionary<int, KnowledgeQualitys>();

            levelMetricQuery.ForEach((metric) =>
            {
                qualifyPairs[metric.Key] = QualityOfPair(metric.Value);
            });

            return qualifyPairs;
        }

        private KnowledgeQualitys QualityOfPair(int openCounts)
        {
            return openCounts switch
            {
                var o when o <= 4 => KnowledgeQualitys.EasyToRemember,
                5 => KnowledgeQualitys.StillRemember,
                _ => KnowledgeQualitys.NoLongerRemember,
            };
        }
    }
}