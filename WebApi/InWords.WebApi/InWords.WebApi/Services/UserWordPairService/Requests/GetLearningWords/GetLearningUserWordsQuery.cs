using System.Collections.Generic;
using InWords.Data.DTO;
using MediatR;

namespace InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWords
{
    public class GetLearningUserWordsQuery : IRequest<List<WordTranslation>>
    {
        public int UserId { get; set; }
    }
}