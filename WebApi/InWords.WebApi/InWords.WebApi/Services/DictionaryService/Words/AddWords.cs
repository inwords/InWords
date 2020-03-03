using InWords.Data;
using InWords.Data.Domains;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.DictionaryService.Words
{
    public class AddWords : AuthorizedRequestObjectHandler<AddWordsRequest, AddWordsReply, InWordsDataContext>
    {
        public AddWords(InWordsDataContext context) : base(context)
        {
        }

        public override Task<AddWordsReply> HandleRequest(
            AuthorizedRequestObject<AddWordsRequest, AddWordsReply> request,
            CancellationToken cancellationToken = default)
        {
            var userId = request.UserId;
            var requestData = request.Value;

            foreach (var requestWord in requestData.Words)
            {
                Word wordForeign = new Word(requestWord.WordForeign);
                Word wordNative = new Word(requestWord.WordNative);
                WordPair wordPair = new WordPair()
                {
                    WordNative = wordNative,
                    WordForeign = wordForeign
                };
            }

            return base.HandleRequest(request, cancellationToken);
        }
    }
}
