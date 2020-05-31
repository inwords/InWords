using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Org.BouncyCastle.Ocsp;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.DictionaryServiceHandler.Words
{
    public class UpdateWords : AuthReqHandler<UpdateWordsRequest, AddWordsReply, InWordsDataContext>
    {
        IRequestHandler<AuthReq<AddWordsRequest, AddWordsReply>, AddWordsReply> addWords;
        IRequestHandler<AuthReq<DeleteWordsRequest, Empty>, Empty> deleteWords;
        public UpdateWords(InWordsDataContext context,
            IRequestHandler<AuthReq<AddWordsRequest, AddWordsReply>, AddWordsReply> addWords,
            IRequestHandler<AuthReq<DeleteWordsRequest, Empty>, Empty> deleteWords) : base(context)
        {
            this.addWords = addWords;
            this.deleteWords = deleteWords;
        }

        public override async Task<AddWordsReply> HandleRequest(AuthReq<UpdateWordsRequest, AddWordsReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

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

            var addWordsRequest = new AuthReq<AddWordsRequest, AddWordsReply>(addRequestData)
            {
                UserId = userId
            };

            var deleteRequest = new AuthReq<DeleteWordsRequest, Empty>(deleteRequestData)
            {
                UserId = userId
            };

            var addTask = await addWords.Handle(addWordsRequest, cancellationToken).ConfigureAwait(false);
            var deleteTask = await deleteWords.Handle(deleteRequest, cancellationToken).ConfigureAwait(false);

            return addTask;
        }
    }
}
