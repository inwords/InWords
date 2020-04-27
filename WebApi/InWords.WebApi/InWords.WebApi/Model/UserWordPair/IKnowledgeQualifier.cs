using InWords.Data.DTO.Enums;
using System.Collections.Generic;

namespace InWords.WebApi.Model.UserWordPair
{
    public interface IKnowledgeQualifier
    {
        /// <summary>
        /// User's word pair ID and the quality of training
        /// </summary>
        /// <returns>Dictionary of id and quality</returns>
        Dictionary<int, KnowledgeQualities> Qualify();
    }
}