using InWords.WebApi.Model.UserWordPair;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService.Abstraction
{
    internal interface IUserWordPairService
    {
        Task UpdateKnowledge(int userid, IKnowledgeQualifier knowledgeQualifier);
    }
}