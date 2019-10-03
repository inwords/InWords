using System.Collections.Generic;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.WebApi.Services.UserWordPairService.Abstraction;
using InWords.WebApi.Services.UserWordPairService.Enum;

namespace InWords.WebApi.Services.CardGame
{
    public class CardGameKnowledge : IKnowledgeQualifier
    {
        private readonly CardGameScore cardGameScore;

        public CardGameKnowledge(CardGameScore cardGameScore)
        {
            this.cardGameScore = cardGameScore;
        }

        Dictionary<int, KnowledgeQualitys> IKnowledgeQualifier.Qualify()
        {
            var qualifyPairs = new Dictionary<int, KnowledgeQualitys>();
            foreach (KeyValuePair<int, int> wpoc in cardGameScore.WordPairIdOpenCounts)
                qualifyPairs[wpoc.Key] = QualityOfPair(wpoc.Value);
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