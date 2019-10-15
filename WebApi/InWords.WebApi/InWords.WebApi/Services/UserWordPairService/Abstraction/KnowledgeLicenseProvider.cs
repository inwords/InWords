using System;
using InWords.WebApi.Services.UserWordPairService.Models;

namespace InWords.WebApi.Services.UserWordPairService.Abstraction
{
    public abstract class KnowledgeLicenseProvider
    {
        public virtual KnowledgeLicense Grant(KnowledgeLicense knowledgeLicense)
        {
            int days = Ebbinghaus(knowledgeLicense.Period);
            knowledgeLicense.RepeatTime = DateTime.UtcNow.AddDays(days);
            return knowledgeLicense;
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