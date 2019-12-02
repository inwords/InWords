using System.Collections.Generic;
using System.Linq;

namespace InWords.Data.DTO.Services
{
    public static class CardGame
    {
        public static int Score(int wordsCount, int openingQuantity)
        {
            var score = 0;
            int bestOpeningsCount = wordsCount * 2 - 2;
            if (openingQuantity <= bestOpeningsCount)
                score = 3;
            else if (openingQuantity <= wordsCount * 2.25)
                score = 2;
            else if (openingQuantity <= wordsCount * 2.5) score = 1;
            return score;
        }

        public static int Score(Dictionary<string, int> wordPariDicrionary)
        {
            int wordsCount = wordPariDicrionary.Count * 2;
            int openingQuantity = wordPariDicrionary.Sum(s => s.Value);
            return Score(wordsCount, openingQuantity);
        }
    }
}