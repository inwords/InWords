﻿using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets
{
    public class ToDictionaryHandler
        : AuthReqHandler<WordSetWordsRequest, Empty, InWordsDataContext>
    {
        IRequestHandler<AuthReq<AddWordsRequest, AddWordsReply>, AddWordsReply> addWords;

        public ToDictionaryHandler(InWordsDataContext context,
            IRequestHandler<AuthReq<AddWordsRequest, AddWordsReply>, AddWordsReply> addWords) : base(context)
        {
            this.addWords = addWords;
        }

        public override async Task<Empty> HandleRequest(AuthReq<WordSetWordsRequest, Empty> request, CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new NullReferenceException();

            int[] levels = GetLevelsInSet(request.Value.WordSetId);

            AddWordRequest[] pairs = GetPairsFromLevel(levels);

            await AddWordsToUser(pairs, request.UserId, cancellationToken).ConfigureAwait(false);

            return new Empty();
        }

        private int[] GetLevelsInSet(int wordSetId)
        {
            return Context.GameLevels.Where(d => d.GameId == wordSetId).Select(d => d.GameLevelId).ToArray();
        }

        private AddWordRequest[] GetPairsFromLevel(int[] levels)
        {
            return Context.GameLevelWords
                .Where(d => levels.Any(l => l == d.GameLevelId))
                .Select(w => new AddWordRequest()
                {
                    WordForeign = w.ForeignWord,
                    WordNative = w.NativeWord
                }).ToArray();
        }

        private Task AddWordsToUser(AddWordRequest[] pairs, int userId, CancellationToken cancellationToken)
        {
            AddWordsRequest addRequestData = new AddWordsRequest();
            addRequestData.Words.AddRange(pairs);
            var addWordsRequest = new AuthReq<AddWordsRequest, AddWordsReply>(addRequestData)
            {
                UserId = userId
            };
            return addWords.Handle(addWordsRequest, cancellationToken);
        }
    }
}
