using InWords.WebApi.Model.UserWordPair;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService.Abstraction
{
    [Obsolete]
    internal interface IUserWordPairService
    {
        Task UpdateKnowledge(int userid, IKnowledgeQualifier knowledgeQualifier);
    }
}