﻿using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Extensions.InWordsDataContext;
using InWords.WebApi.Model.UserWordPair;
using InWords.WebApi.Modules.ClassicCardGame.Service;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.ClassicCardGame
{
    public class EstimateClassicCardGame
        : AuthorizedRequestObjectHandler<CardGameMetrics, LevelPoints, InWordsDataContext>
    {
        public EstimateClassicCardGame(InWordsDataContext context) : base(context)
        {

        }

        public override async Task<LevelPoints> HandleRequest(
            AuthorizedRequestObject<CardGameMetrics, LevelPoints> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException($"{nameof(request)}");

            var userId = request.UserId;
            var value = request.Value;

            // for safety objective
            var userWords = Context.UserWordPairs.Where(u => u.UserId == userId);

            // find words knowlenge info in user's words pairs
            int[] metricsWordIds = value.WordIdOpenCount.Keys.ToArray();
            var existedWords = userWords.Where(d => metricsWordIds.Contains(d.UserWordPairId)).ToArray();
            // calculate memorization
            IKnowledgeQualifier knowledgeQualifier = new CardGameQualifier(value.WordIdOpenCount.ToDictionary(t => t.Key, t => t.Value));
            var license = knowledgeQualifier.Qualify();
            // update memorization
            existedWords.UpdateMemorisation(license);
            await Context.SaveChangesAsync().ConfigureAwait(false);

            // calculate level points and save

            throw new NotImplementedException();
        }
    }
}
