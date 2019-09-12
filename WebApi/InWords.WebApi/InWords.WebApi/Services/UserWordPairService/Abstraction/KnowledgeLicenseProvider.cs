using InWords.WebApi.Services.UserWordPairService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService.Abstraction
{
    public abstract class KnowledgeLicenseProvider
    {
        public abstract KnowledgeLicense Grant(KnowledgeLicense knowledgeLicense);

        /// <summary>
        /// Implementation of 
        /// <a href="https://en.wikipedia.org/wiki/Forgetting_curve">Forgetting curve</a>
        /// </summary>
        /// <param name="subconsciousLevel"></param>
        /// <param name="MemoryLevel"></param>
        /// <returns></returns>
        public int Ebbinghaus(int stability, double retrievabilityLevel = 0.8)
        {
            double days = Math.Pow(stability, 2) + stability * Math.Log(retrievabilityLevel) + stability - Math.Log(retrievabilityLevel);
            int daysCount = Convert.ToInt32(Math.Round(days));
            return daysCount;
        }
    }
}
