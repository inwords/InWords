using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.DTO.GameBox;
using MediatR;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace InWords.WebApi.Services.UserGameService.GetUsersGameHistory
{
    public class GetUserGameStoryHandler : IRequestHandler<GetUserGameStoryQuery, LevelInfo>
    {
        private readonly InWordsDataContext context;

        public GetUserGameStoryHandler(InWordsDataContext context)
        {
            this.context = context;
        }

        public Task<LevelInfo> Handle(GetUserGameStoryQuery request, CancellationToken cancellationToken)
        {
            //var allUsersGames = context.Creations.Where(c => c.CreationId.Equals(request.UserId));
            //var allLevels = context.GameLevels.Where(l=>l.)
            throw new NotImplementedException();
        }
    }
}
