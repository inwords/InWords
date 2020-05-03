using InWords.Common.Extensions;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;
using InWords.Data.DTO.GameBox;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Extensions.InWordsDataContextExtention;
using InWords.WebApi.Modules.ClassicCardGame.Extentions;
using InWords.WebApi.Services.Abstractions;
using Microsoft.AspNetCore.Mvc.Formatters;
using MimeKit.Encodings;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.ClassicCardGame.Service
{
    public class SaveLevels : AuthorizedRequestObjectHandler<CardGameInfos, LevelPoints, InWordsDataContext>
    {
        public SaveLevels(InWordsDataContext context) : base(context) { }

        public override async Task<LevelPoints> HandleRequest(
            AuthorizedRequestObject<CardGameInfos, LevelPoints> request,
            CancellationToken cancellationToken = default)
        {

            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var userId = request.UserId;
            var info = request.Value.Info;

            var historyGameId = await Context.AddOrGetUserHistoryGame(userId).ConfigureAwait(false);
            
            // add level
            var list = info.Select(d => d.WordIdOpenCount.Select(d => d.Key).ToArray()).ToList();
            var levels = CreateLevels(historyGameId, userId, list);
            
            // calculate metrics


            throw new NotImplementedException();
        }

        private async Task<int[]> CreateLevels(int gameId, int userId, IList<int[]> pairsInLevels)
        {
            var levels = pairsInLevels.Select(d =>
            {
                var game = new GameLevel()
                {
                    GameId = gameId
                };
                Context.Add(game);
                return game;
            }).ToArray();
            await Context.SaveChangesAsync().ConfigureAwait(false);

            for (int i = 0; i < pairsInLevels.Count; i++)
            {
                var currentLevel = levels[i];
                int[] currentWordsIds = pairsInLevels[i].ToArray();

                var currentWords = Context.CurrentUserWordPairs(userId)
                    .Where(u => currentWordsIds.Contains(u.UserWordPairId))
                    .ToArray();

                var gameLevelWords = currentWords.Select(w => new GameLevelWord()
                {
                    ForeignWord = w.ForeignWord,
                    NativeWord = w.NativeWord,
                    GameLevelId = currentLevel.GameLevelId,
                }).ToArray();

                Context.GameLevelWords.AddRange(gameLevelWords);
            }
            await Context.SaveChangesAsync().ConfigureAwait(false);
            return levels.Select(level => level.GameLevelId).ToArray();
        }
    }
}
