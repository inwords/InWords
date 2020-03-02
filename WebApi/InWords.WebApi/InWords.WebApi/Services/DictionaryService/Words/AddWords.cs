using InWords.Data;
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

            return base.HandleRequest(request, cancellationToken);
        }
    }
}
