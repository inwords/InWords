using Google.Protobuf.Collections;
using InWords.Data;
using InWords.Data.Creations.GameBox;
using InWords.Protobuf;
using InWords.WebApi.Extensions.InWordsDataContextExtention;
using InWords.WebApi.Modules.ClassicCardGame.Extentions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static InWords.Protobuf.CardGameMetrics.Types;

namespace InWords.WebApi.Modules.ClassicCardGame
{
    public class SaveLevels : AuthorizedRequestObjectHandler<CardGameInfos, LevelPoints, InWordsDataContext>
    {
        private readonly IRequestHandler<AuthorizedRequestObject<CardGameMetrics, LevelPoints>, LevelPoints> estimateClassicCardGame;
        public SaveLevels(InWordsDataContext context,
            IRequestHandler<AuthorizedRequestObject<CardGameMetrics, LevelPoints>, LevelPoints> estimateClassicCardGame
            ) : base(context)
        {
            this.estimateClassicCardGame = estimateClassicCardGame;
        }

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
            var levels = await CreateLevels(historyGameId, userId, list).ConfigureAwait(false);
            return await CalculateMetrics(userId, info, levels, cancellationToken).ConfigureAwait(false);
        }

        private Task<LevelPoints> CalculateMetrics(int userId,
            RepeatedField<CardGameInfos.Types.CardGameInfo> info,
            int[] levels,
            CancellationToken cancellationToken)
        {
            CardGameMetrics cardGameMetrics = new CardGameMetrics();
            for (int i = 0; i < levels.Length; i++)
            {
                var cardGameMetric = new CardGameMetric()
                {
                    GameLevelId = levels[i]
                };
                cardGameMetric.WordIdOpenCount.Add(info[i].WordIdOpenCount);
                cardGameMetrics.Metrics.Add(cardGameMetric);
            }

            var estimateRequest = new AuthorizedRequestObject<CardGameMetrics, LevelPoints>(cardGameMetrics)
            {
                UserId = userId
            };

            return estimateClassicCardGame.Handle(estimateRequest, cancellationToken);
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
