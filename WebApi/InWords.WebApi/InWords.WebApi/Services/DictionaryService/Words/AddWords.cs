using InWords.Common.Extensions;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.DictionaryService.Extentions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.DictionaryService.Words
{
    public class AddWords : AuthorizedRequestObjectHandler<AddWordsRequest, AddWordsReply, InWordsDataContext>
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

            int userId = request.UserId;
            var requestData = request.Value;

            // Add words transation (savechanges)
            List<Word> dataBaseWords = await AddWordsAsync(requestData).ConfigureAwait(false);

            // Add wordPairs transaction 
            List<(int, WordPair)> pairsToAdd = SelectWordPairs(requestData, dataBaseWords);
            HashSet<int> inverted = Context.WordPairs.AddWordPairs(pairsToAdd.Select(d => d.Item2));
            await Context.SaveChangesAsync().ConfigureAwait(false);

            // Add user's word pair transation
            (int, UserWordPair)[] userWords = ConvertToUserWordPairs(userId, pairsToAdd, inverted).ToArray();
            Context.UserWordPairs.AddUserWordPair(userWords.Select(d => d.Item2));
            await Context.SaveChangesAsync().ConfigureAwait(false);


            // form reply
            AddWordsReply addWordsReply = new AddWordsReply();
            foreach (var word in userWords)
            {
                AddWordReply addWordReply = new AddWordReply
                {
                    LocalId = word.Item1,
                    ServerId = word.Item2.UserWordPairId
                };
                addWordsReply.WordIds.Add(addWordReply);
            }

            return addWordsReply;
        }

        private static IEnumerable<(int, UserWordPair)> ConvertToUserWordPairs(int userId, IEnumerable<(int, WordPair)> wordPairsToAdd, HashSet<int> inverted)
        {
            return wordPairsToAdd.Select(pair => (pair.Item1, new UserWordPair
            {
                UserId = userId,
                WordPairId = pair.Item2.WordPairId,
                IsInvertPair = inverted.Contains(pair.Item2.WordPairId)
            }));
        }

        private static List<(int, WordPair)> SelectWordPairs(AddWordsRequest requestData, List<Word> dataBaseWords)
        {
            var dictionary = dataBaseWords.ToContentDictionary();
            var wordPairsToAdd = new List<(int, WordPair)>();
            requestData.Words.ForEach(wp =>
            {
                wordPairsToAdd.Add((wp.LocalId, new WordPair()
                {
                    WordForeignId = dictionary[wp.WordForeign.ToNormalizedWord()].WordId,
                    WordNativeId = dictionary[wp.WordNative.ToNormalizedWord()].WordId
                }));
            });
            return wordPairsToAdd;
        }

        private async Task<List<Word>> AddWordsAsync(AddWordsRequest requestData)
        {
            var words = requestData.Words.SelectUnion(w1 => w1.WordForeign, w2 => w2.WordNative);
            var dataBaseWords = Context.Words.AddWords(words);
            await Context.SaveChangesAsync().ConfigureAwait(false);
            return dataBaseWords;
        }
    }
}