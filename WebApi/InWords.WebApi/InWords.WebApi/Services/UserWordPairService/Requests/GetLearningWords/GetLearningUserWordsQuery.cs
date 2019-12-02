using System.Collections.Generic;
using InWords.Data.DTO;
using InWords.WebApi.Services.UserWordPairService.Requests.Abstractions;
using MediatR;

namespace InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWords
{
    public class GetLearningUserWordsQuery : GetLearningUserWordsQueryBase , IRequest<List<WordTranslation>>
    {
        public GetLearningUserWordsQuery(int userId) : base(userId)
        {
        }
    }
}