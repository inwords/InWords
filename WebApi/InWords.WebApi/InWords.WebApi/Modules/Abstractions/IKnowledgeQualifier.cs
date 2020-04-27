using InWords.WebApi.Services.UserWordPairService.Enum;
using System.Collections.Generic;

namespace InWords.WebApi.Modules.Abstractions
{
    public interface IKnowledgeQualifier
    {
        /// <summary>
        /// User's word pair ID and the quality of training
        /// </summary>
        /// <returns>Dictionary of id and quality</returns>
        Dictionary<int, KnowledgeQualitys> Qualify();
    }
}