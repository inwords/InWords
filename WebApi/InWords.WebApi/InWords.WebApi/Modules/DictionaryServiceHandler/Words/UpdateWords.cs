using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.DictionaryServiceHandler.Words
{
    public class UpdateWords : AuthorizedRequestObjectHandler<UpdateWordsRequest, AddWordsReply, InWordsDataContext>
    {
        IRequestHandler<AuthorizedRequestObject<AddWordsRequest, AddWordsReply>, AddWordsReply> addWords;
        IRequestHandler<AuthorizedRequestObject<DeleteWordsRequest, Empty>, Empty> deleteWords;
        public UpdateWords(InWordsDataContext context,
            IRequestHandler<AuthorizedRequestObject<AddWordsRequest, AddWordsReply>, AddWordsReply> addWords,
            IRequestHandler<AuthorizedRequestObject<DeleteWordsRequest, Empty>, Empty> deleteWords) : base(context)
        {
            this.addWords = addWords;
            this.deleteWords = deleteWords;
        }

        public override async Task<AddWordsReply> HandleRequest(AuthorizedRequestObject<UpdateWordsRequest, AddWordsReply> request,
            CancellationToken cancellationToken = default)
        {
            var userId = request.UserId;
            var requestData = request.Value;

            DeleteWordsRequest deleteRequestData = new DeleteWordsRequest();
            deleteRequestData.Delete.AddRange(requestData.Update.Select(d => d.Delete));

            AddWordsRequest addRequestData = new AddWordsRequest();
            addRequestData.Words.AddRange(requestData.Update.Select(d => new AddWordRequest()
            {
                LocalId = d.LocalId,
                WordForeign = d.WordForeign,
                WordNative = d.WordNative
            }));

            var addWordsRequest = new AuthorizedRequestObject<AddWordsRequest, AddWordsReply>(addRequestData)
            {
                UserId = userId
            };

            var deleteRequest = new AuthorizedRequestObject<DeleteWordsRequest, Empty>(deleteRequestData)
            {
                UserId = userId
            };

            var addTask = addWords.Handle(addWordsRequest, cancellationToken);
            var deleteTask = deleteWords.Handle(deleteRequest, cancellationToken);

            await Task.WhenAll(addTask, deleteTask).ConfigureAwait(false);

            return addTask.Result;
        }
    }
}
