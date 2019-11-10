using MediatR;

namespace InWords.WebApi.Services.GameWordsToDictionary.WordsIdsByGameId
{
    public class WordsIdsByGameQuery : IRequest<WordsIdsByGameIdQueryResult>
    {
        public int Id { get; set; }
    }
}