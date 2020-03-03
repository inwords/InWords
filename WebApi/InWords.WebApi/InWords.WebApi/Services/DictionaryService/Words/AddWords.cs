using InWords.Common.Extensions;
using InWords.Data;
using InWords.Data.Domains;
using InWords.WebApi.gRPC.Services;
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
                throw new ArgumentNullException($"{nameof(request)} is null");

            var userId = request.UserId;
            var requestData = request.Value;

            // Add words transation
            List<Word> dataBaseWords = await AddWordsAsync(requestData).ConfigureAwait(false);

            // Add wordPairs transaction
            var dictionary = dataBaseWords.ToContentDictionary();
            var wordPairs = new List<WordPair>();
            requestData.Words.ForEach(wp =>
            {
                wordPairs.Add(new WordPair()
                {
                    WordForeignId = dictionary[wp.WordForeign.ToNormalizedWord()].WordId,
                    WordNativeId = dictionary[wp.WordNative.ToNormalizedWord()].WordId
                });
            });
            //Context.WordPairs.add
            await Context.SaveChangesAsync().ConfigureAwait(false);
            // Add user's word pair transation

            // return result;
            throw new NotImplementedException();
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