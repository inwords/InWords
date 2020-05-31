using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.DictionaryServiceHandler.Words
{
    public class DeleteWords : AuthReqHandler<DeleteWordsRequest, Empty, InWordsDataContext>
    {
        public DeleteWords(InWordsDataContext context) : base(context)
        {
        }

        public override async Task<Empty> HandleRequest(AuthReq<DeleteWordsRequest, Empty> request, CancellationToken cancellationToken = default)
        {
            int[] toDelete = request.Value.Delete.ToArray();
            var uwp = Context.UserWordPairs.Where(d => d.UserId == request.UserId).Where(d => toDelete.Any(t => t == d.UserWordPairId));
            Context.RemoveRange(uwp);
            await Context.SaveChangesAsync().ConfigureAwait(false);
            return new Empty();
        }
    }
}
