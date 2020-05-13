using InWords.Common.Extensions;
using InWords.Data.DTO.Enums;
using InWords.WebApi.Model.UserWordPair;
using System;
using System.Collections.Generic;

namespace InWords.WebApi.Modules.WordsSets.Models
{
    public sealed class CardGameQualifier : IKnowledgeQualifier
    {
        public int Complexity => 8;
        private readonly IDictionary<int, int> levelMetricQuery;
        public CardGameQualifier(IDictionary<int, int> levelMetricQuery)
        {
            this.levelMetricQuery = levelMetricQuery;
        }
        public Dictionary<int, KnowledgeQualities> Qualify()
        {
            var qualifyPairs = new Dictionary<int, KnowledgeQualities>();

            levelMetricQuery.ForEach((metric) =>
            {
                qualifyPairs[metric.Key] = QualityOfPair(metric.Value);
            });

            return qualifyPairs;
        }

        private KnowledgeQualities QualityOfPair(int openCounts)
        {
            return openCounts switch
            {
                var o when o <= 4 => KnowledgeQualities.EasyToRemember,
                5 => KnowledgeQualities.StillRemember,
                _ => KnowledgeQualities.NoLongerRemember,
            };
        }
    }
}