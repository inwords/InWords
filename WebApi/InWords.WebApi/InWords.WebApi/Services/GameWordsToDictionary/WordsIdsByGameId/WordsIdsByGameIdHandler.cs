using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data;
using MediatR;

namespace InWords.WebApi.Services.GameWordsToDictionary.WordsIdsByGameId
{
    public class WordsIdsByGameIdHandler : RequestHandler<WordsIdsByGameQuery, WordsIdsByGameIdQueryResult>
    {
        private readonly InWordsDataContext context;
        public WordsIdsByGameIdHandler(InWordsDataContext context)
        {
            this.context = context;
        }

        protected override WordsIdsByGameIdQueryResult Handle(WordsIdsByGameQuery request)
        {
            //context.cre

            return
                null; //new WordsIdsByGameIdQueryResult { Id = request.Id, Description = $"Description {request.Id}" };
        }
    }
}
