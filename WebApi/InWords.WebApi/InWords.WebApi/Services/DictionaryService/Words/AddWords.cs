using InWords.Common.Extensions;
using InWords.Data;
using InWords.Data.Domains;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using System;
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
            var userId = request.UserId;
            var requestData = request.Value;

            var words = requestData
                .Words
                .SelectUnion(
                w1 => w1.WordForeign,
                w2 => w2.WordNative);

            foreach (var word in words)
            {
                if (Context.Words.Any(w => string.Equals(
                    w.Content,
                    word,
                    StringComparison.OrdinalIgnoreCase)))
                {
                    Context.Words.Add(new Word(word.ToLowerInvariant()));
                }
            }

            await Context.SaveChangesAsync().ConfigureAwait(false);

            foreach (var requestWord in requestData.Words)
            {
                Word wordForeign = new Word(requestWord.WordForeign);
            }

            // return result;
            throw new NotImplementedException();
        }
    }
}