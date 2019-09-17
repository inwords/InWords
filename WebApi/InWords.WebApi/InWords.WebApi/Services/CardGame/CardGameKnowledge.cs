using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.WebApi.Services.UserWordPairService.Abstraction;
using InWords.WebApi.Services.UserWordPairService.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.CardGame
{
    public class CardGameKnowledge : IKnowledgeQualifier
    {
        private readonly CardGameScore cardGameScore = null;
        public CardGameKnowledge(CardGameScore cardGameScore)
        {
            this.cardGameScore = cardGameScore;
        }

        Dictionary<int, KnowledgeQualitys> IKnowledgeQualifier.Qualify()
        {
            Dictionary<int, KnowledgeQualitys> qualifyPairs = new Dictionary<int, KnowledgeQualitys>();
            foreach (var wpoc in cardGameScore.WordPairIdOpenCounts)
            {
                qualifyPairs[wpoc.Key] = QualityOfPair(wpoc.Value);
            }
            return qualifyPairs;
        }

        private KnowledgeQualitys QualityOfPair(int OpenCounts)
        {
            switch (OpenCounts)
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
