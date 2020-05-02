using Grpc.Core;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace InWords.WebApi.Extensions
{
    public static class ServiceHandler
    {
        /// <summary>
        /// Grpc Authorize handler
        /// </summary>
        /// <typeparam name="TRequest"></typeparam>
        /// <typeparam name="TReply"></typeparam>
        /// <param name="mediator"></param>
        /// <param name="request"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public static async Task<TReply> AuthorizeHandler<TRequest, TReply>(
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

            var reqestObject = new AuthorizedRequestObject<TRequest, TReply>(request)
            {
                UserId = context.GetHttpContext().User.GetUserId()
            };
            context.Status = new Status(reqestObject.StatusCode, reqestObject.Detail);
            TReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return reply;
        }

        /// <summary>
        /// Http authorize handler
        /// </summary>
        /// <typeparam name="TRequest"></typeparam>
        /// <typeparam name="TReply"></typeparam>
        /// <param name="mediator"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static async Task<(TReply reply, Status status)> AuthorizeHandler<TRequest, TReply>(
            this IMediator mediator,
            TRequest request,
            ClaimsPrincipal user) where TRequest : new() where TReply : new()
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            if (mediator == null)
            {
                Status status = new Status(StatusCode.Internal, "Mediator is null or method not registred");
                return (new TReply(), status);
            }

            var reqestObject = new AuthorizedRequestObject<TRequest, TReply>(request)
            {
                UserId = user.GetUserId()
            };
            TReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);

            return (reply, new Status(reqestObject.StatusCode, reqestObject.Detail));
        }
    }
}
