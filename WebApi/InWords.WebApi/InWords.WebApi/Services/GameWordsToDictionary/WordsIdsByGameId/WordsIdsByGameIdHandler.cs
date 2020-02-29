using InWords.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.GameWordsToDictionary.WordsIdsByGameId
{
    public class WordsIdsByGameIdHandler : IRequestHandler<WordsIdsByGameQuery, WordsIdsByGameIdQueryResult>
    {
        private readonly InWordsDataContext context;

        public WordsIdsByGameIdHandler(InWordsDataContext context)
        {
            this.context = context;
        }

        public async Task<WordsIdsByGameIdQueryResult> Handle(WordsIdsByGameQuery request,
            CancellationToken cancellationToken = default)
        {
            IQueryable<int> wordsId = context.WordsInGame(request.Id);
            List<int> wordsIdList = await wordsId.ToListAsync(cancellationToken).ConfigureAwait(false);

            return new WordsIdsByGameIdQueryResult
            {
                WordTranslationsList = wordsIdList
            };
        }
    }
}