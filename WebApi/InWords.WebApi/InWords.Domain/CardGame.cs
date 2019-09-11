using System.Runtime.InteropServices;

namespace InWords.Domain
{
    public static class CardGame
    {
        public static int Score(int wordsCount, int openingQuantity)
        {
            int score = 0;
            int bestOpeningsCount = wordsCount * 2 - 2;
            if (openingQuantity <= bestOpeningsCount)
                score = 3;
            else if (openingQuantity <= wordsCount * 2.25)
                score = 2;
            else if (openingQuantity <= wordsCount * 2.5) score = 1;
            return score;
        }

        //public static int SocreDictinary(Dictionary())
        //{

        //}
    }
}