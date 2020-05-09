using Grpc.Core;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace InWords.WebApi.Extensions
{
    public static class AnonimouseHandlerExtention
    {
      
        public static async Task<TReply> AnonimousHandler<TRequest, TReply>(
            this IMediator mediator,
            TRequest request,
            ServerCallContext context) where TRequest : new() where TReply : new()
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));

            if (mediator == null)
            {
                context.Status = new Status(StatusCode.Internal, "Mediator is null or method not registred");
                return new TReply();
            }

            var reqestObject = new RequestObject<TRequest, TReply>(request);
            context.Status = new Status(reqestObject.StatusCode, reqestObject.Detail);
            TReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return reply;
        }


        private static async Task<(TReply reply, Status status)> AnonimousHandler<TRequest, TReply>(
            this IMediator mediator,
            TRequest request) where TRequest : new() where TReply : new()
        {
            if (mediator == null)
            {
                Status status = new Status(StatusCode.Internal, "Mediator is null or method not registred");
                return (new TReply(), status);
            }

            var reqestObject = new RequestObject<TRequest, TReply>(request);

            TReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);

            return (reply, new Status(reqestObject.StatusCode, reqestObject.Detail));
        }

        public static async Task<IActionResult> AnonimousHandlerActionResult<TRequest, TReply>(
            this IMediator mediator,
            TRequest request) where TRequest : new() where TReply : new()
        {
            var (result, status) = await mediator.AnonimousHandler<TRequest, TReply>(request)
                .ConfigureAwait(false);

            return AuthorizeHandlerExtention.Switch(result, status);
        }
    }
}
