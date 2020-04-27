using System;

namespace InWords.WebApi.Model.UserWordPair
{
    public abstract class BaseMemorization
    {
        public virtual Memorization Grant(Memorization currentMemorization)
        {
            int days = Ebbinghaus(currentMemorization.Period);
            currentMemorization.RepeatTime = DateTime.UtcNow.AddDays(days);
            return currentMemorization;
        }

        /// <summary>
        ///     Implementation of
        ///     <a href="https://en.wikipedia.org/wiki/Forgetting_curve">Forgetting curve</a>
        /// </summary>
        /// <param name="subconsciousLevel"></param>
        /// <param name="MemoryLevel"></param>
        /// <returns></returns>
        public static int Ebbinghaus(int stability, double retrievabilityLevel = 0.8)
        {
            double days = -(stability + 1) * (Math.Log(retrievabilityLevel) - stability);
            int daysCount = Convert.ToInt32(Math.Round(days));
            return daysCount;
        }
    }
}