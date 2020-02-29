using InWords.WebApi.Services.UserWordPairService.Enum;
using System.Collections.Generic;

namespace InWords.WebApi.Services.UserWordPairService.Abstraction
{
    public interface IKnowledgeQualifier
    {
        Dictionary<int, KnowledgeQualitys> Qualify();
    }
}