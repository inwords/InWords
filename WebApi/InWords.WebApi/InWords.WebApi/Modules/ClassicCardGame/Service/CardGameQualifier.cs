using InWords.Common.Extensions;
using InWords.Data.DTO.Enums;
using InWords.WebApi.Model.UserWordPair;
using System.Collections.Generic;

namespace InWords.WebApi.Modules.ClassicCardGame.Service
{
    public sealed class CardGameQualifier : IKnowledgeQualifier
    {
        private readonly Dictionary<int, int> levelMetricQuery;
        public CardGameQualifier(Dictionary<int, int> levelMetricQuery)
        {
            this.levelMetricQuery = levelMetricQuery;
        }

        Dictionary<int, KnowledgeQualities> IKnowledgeQualifier.Qualify()
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