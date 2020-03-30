using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets
{
    public class GetLevelWords
        : AuthorizedRequestObjectHandler<WordSetWordsRequest, WordSetWordsReply, InWordsDataContext>
    {
        public GetLevelWords(InWordsDataContext context) : base(context)
        {
        }

        public override Task<WordSetWordsReply> HandleRequest(AuthorizedRequestObject<WordSetWordsRequest, WordSetWordsReply> request, CancellationToken cancellationToken = default)
        {
            var userId = request.UserId;
            var data = request.Value;



            return base.HandleRequest(request, cancellationToken);
        }
    }
}
