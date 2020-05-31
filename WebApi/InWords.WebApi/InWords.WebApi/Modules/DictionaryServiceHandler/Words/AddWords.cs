using Autofac;
using InWords.Common.Extensions;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.DictionaryServiceHandler.Words
{
    public class AddWords : AuthReqHandler<AddWordsRequest, AddWordsReply, InWordsDataContext>
    {
        public AddWords(InWordsDataContext context) : base(context)
        {

        }

        public override async Task<AddWordsReply> HandleRequest(
            AuthorizedRequestObject<AddWordsRequest, AddWordsReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException($"{nameof(request)}");
            AddWordsReply reply = new AddWordsReply();

            var userId = request.UserId;
            var words = request.Value.Words;

            var dictionaryPairs = words.GroupBy(d => d.LocalId).ToDictionary(d => d.Key, d => d.Select(d => new UserWordPair()
            {
                ForeignWord = d.WordForeign,
                NativeWord = d.WordNative,
                UserId = userId,
                Background = false,
            }).ToList());

            dictionaryPairs.ForEach((k) =>
            {
                Context.AddRange(k.Value);
            });

            await Context.SaveChangesAsync().ConfigureAwait(false);

            var dubles = (from uwp1 in Context.UserWordPairs.Where(u => u.UserId == userId)
                          from uwp2 in Context.UserWordPairs.Where(u => u.UserId == userId)
                          where uwp1.ForeignWord == uwp2.ForeignWord &&
                                        uwp1.NativeWord == uwp2.NativeWord &&
                                        uwp1.UserWordPairId > uwp2.UserWordPairId
                          select uwp1).ToArray();

            Context.UserWordPairs.RemoveRange(dubles);

            var backgrounds = (from uwp1 in Context.UserWordPairs.Where(u => u.UserId == userId)
                               from uwp2 in Context.UserWordPairs.Where(u => u.UserId == userId)
                               where
                               !uwp1.Background && uwp2.Background &&
                               uwp1.UserWordPairId > uwp2.UserWordPairId &&
                               uwp1.ForeignWord == uwp2.ForeignWord &&
                               uwp1.NativeWord == uwp2.NativeWord
                               select uwp2).ToArray();

            backgrounds.ForEach(d => d.Background = false);

            await Context.SaveChangesAsync().ConfigureAwait(false);

            var replys = dictionaryPairs.Select(d => d.Value.Select(w => new AddWordReply()
            {
                LocalId = d.Key,
                ServerId = w.UserWordPairId
            })).SelectMany(d => d);

            reply.WordIds.Add(replys);

            return reply;
        }
    }
}