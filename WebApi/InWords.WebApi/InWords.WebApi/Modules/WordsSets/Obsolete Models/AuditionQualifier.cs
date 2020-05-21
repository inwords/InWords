using InWords.Common.Extensions;
using InWords.Data.DTO.Enums;
using InWords.WebApi.Model.UserWordPair;
using System;
using System.Collections.Generic;

namespace InWords.WebApi.Modules.WordsSets.Models
{
    [Obsolete("Use Game Evaluator models")]
    public class AuditionQualifier : IKnowledgeQualifier
    {
        public int Complexity => 1;
        private readonly IDictionary<int, int> levelMetricQuery;
        public AuditionQualifier(IDictionary<int, int> levelMetricQuery)
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
                var o when o <= 1 => KnowledgeQualities.EasyToRemember,
                _ => KnowledgeQualities.NoLongerRemember,
            };
        }
    }
}
