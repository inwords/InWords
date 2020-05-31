using Google.Protobuf.Collections;
using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Modules.ClassicCardGame.Extentions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static InWords.Protobuf.CardGameMetrics.Types;

namespace InWords.WebApi.Modules.ClassicCardGame
{
    public class SaveLevels : AuthReqHandler<CardGameInfos, LevelPoints, InWordsDataContext>
    {
        private readonly IRequestHandler<AuthReq<CardGameMetrics, LevelPoints>, LevelPoints> estimateClassicCardGame;
        public SaveLevels(InWordsDataContext context,
            IRequestHandler<AuthReq<CardGameMetrics, LevelPoints>, LevelPoints> estimateClassicCardGame
            ) : base(context)
        {
            this.estimateClassicCardGame = estimateClassicCardGame;
        }

        public override async Task<LevelPoints> HandleRequest(
            AuthReq<CardGameInfos, LevelPoints> request,
            CancellationToken cancellationToken = default)
        {

            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var userId = request.UserId;
            var info = request.Value.Info;

            // add level
            var list = info.Select(d => d.WordIdOpenCount.Select(d => d.Key).ToArray()).ToList();
            var levels = await Context.CreateLevels(userId, list).ConfigureAwait(false);
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

            var estimateRequest = new AuthReq<CardGameMetrics, LevelPoints>(cardGameMetrics)
            {
                UserId = userId
            };

            return estimateClassicCardGame.Handle(estimateRequest, cancellationToken);
        }
    }
}
