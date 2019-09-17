using InWords.WebApi.Services.UserWordPairService.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService.Abstraction
{
    public interface IKnowledgeQualifier
    {
        Dictionary<int, KnowledgeQualitys> Qualify();
    }
}
