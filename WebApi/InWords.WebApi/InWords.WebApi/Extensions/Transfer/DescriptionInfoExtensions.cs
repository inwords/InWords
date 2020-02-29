using InWords.Data.DTO.Creation;
using System.Collections.Generic;
using System.Linq;

namespace InWords.WebApi.Extensions.Transfer
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
            return !descriptionInfos.Any() ? new DescriptionInfo() : descriptionInfos.First();
        }
    }
}