using MediatR;
using System.Collections.Generic;

namespace InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWordsIds
{
    public class GetLearningUserWordsIdQuery : IRequest<List<int>>
    {
        public int DaysForward { get; set; } = 1;
        public int UserId { get; set; }
        public GetLearningUserWordsIdQuery(int userId)
        {
            UserId = userId;
        }
    }
}