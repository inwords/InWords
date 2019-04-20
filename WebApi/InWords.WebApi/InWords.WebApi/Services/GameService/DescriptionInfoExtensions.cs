using System.Collections.Generic;
using System.Linq;
using InWords.Transfer.Data.Models.Creation;

namespace InWords.WebApi.Services.GameService
{
    /// <summary>
    /// </summary>
    public static class DescriptionInfoExtensions
    {
        /// <summary>
        ///     Test method returning Russian description
        /// </summary>
        /// <param name="descriptionInfos"></param>
        /// <returns></returns>
        public static DescriptionInfo GetRus(this List<DescriptionInfo> descriptionInfos)
        {
            // TODO Language service
            return descriptionInfos.First();
        }
    }
}