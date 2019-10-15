using System.Collections.Generic;
using InWords.WebApi.Services.UserWordPairService.Enum;

namespace InWords.WebApi.Services.UserWordPairService.Abstraction
{
    public interface IKnowledgeQualifier
    {
        Dictionary<int, KnowledgeQualitys> Qualify();
    }
}