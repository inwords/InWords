using System.Collections.Generic;
using InWords.Data.DTO;
using MediatR;

namespace InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWordsIds
{
    public class GetLearningUserWordsIdsQuery : GetLearningUserWordsQueryBase, IRequest<List<int>>
    {
        public GetLearningUserWordsIdsQuery(int userId) : base(userId)
        {
        }
    }
}