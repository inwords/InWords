using InWords.Data;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Modules.WordsSets.Extentions;
using InWords.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static InWords.Protobuf.WordSetReply.Types;

namespace InWords.WebApi.Modules.WordsSets
{
    public class GetWordSetsHandler
        : AuthReqHandler<Empty, WordSetReply, InWordsDataContext>
    {
        public GetWordSetsHandler(InWordsDataContext context) : base(context)
        {
        }

        public override Task<WordSetReply> HandleRequest(
            AuthReq<Empty, WordSetReply> request, CancellationToken cancellationToken = default)
            => Context.GetWordSets();

    }
}
