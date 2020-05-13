using System;

namespace InWords.WebApi.Model.UserWordPair
{
    public abstract class BaseMemorization
    {
        /// <summary>
        /// </summary>
        /// <param name="currentMemorization">Complexity of the game from 0 to 1]</param>
        /// <param name="complexity"></param>
        /// <returns></returns>
        public virtual Memorization Grant(Memorization currentMemorization, double complexity)
        {
            if (complexity > 1.0 || complexity < 0.0)
                throw new ArgumentOutOfRangeException(nameof(complexity));

            int days = Ebbinghaus(currentMemorization.Period,complexity);
            currentMemorization.RepeatTime = DateTime.UtcNow.AddDays(days);
            return currentMemorization;
        }

        /// <summary>
        ///     Implementation of
        ///     <a href="https://en.wikipedia.org/wiki/Forgetting_curve">Forgetting curve</a>
        /// </summary>
        /// <param name="stability"></param>
        /// <param name="retrievabilityLevel"></param>
        /// <returns></returns>
        public static int Ebbinghaus(int stability, double retrievabilityLevel = 0.8)
        {
            double days = -(stability + 1) * (Math.Log(retrievabilityLevel) - stability);
            int daysCount = Convert.ToInt32(Math.Round(days));
            return daysCount;
        }
    }
}