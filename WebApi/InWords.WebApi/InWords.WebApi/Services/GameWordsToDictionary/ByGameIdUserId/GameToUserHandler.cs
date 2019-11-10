using System;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using MediatR;

namespace InWords.WebApi.Services.GameWordsToDictionary.ByGameIdUserId
{
    public class GameToUserHandler : IRequestHandler<GameToUserQuery, GameToUserQueryResult>
    {
        private readonly InWordsDataContext context;
        public GameToUserHandler(InWordsDataContext context)
        {
            this.context = context;
        }
        public Task<GameToUserQueryResult> Handle(GameToUserQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
