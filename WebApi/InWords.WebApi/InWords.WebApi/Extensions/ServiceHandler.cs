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

        public static async Task<IActionResult> AuthorizeHandlerActionResult<TRequest, TReply>(
            this IMediator mediator,
            TRequest request,
            ClaimsPrincipal user) where TRequest : new() where TReply : new()
        {
            var (result, status) = await mediator.AuthorizeHandler<TRequest, TReply>(request, user)
                .ConfigureAwait(false);

            return Switch(result, status);
        }

        private static IActionResult Switch<TReply>(TReply reply, Status status) => status switch
        {
            var s when s.StatusCode == StatusCode.OK => new OkObjectResult(reply),
            var s when s.StatusCode == StatusCode.DataLoss => new ConflictObjectResult(s),
            var s when s.StatusCode == StatusCode.Unauthenticated => new UnauthorizedObjectResult(s),
            var s when s.StatusCode == StatusCode.NotFound => new NotFoundObjectResult(s),
            var s when
            s.StatusCode == StatusCode.Internal ||
            s.StatusCode == StatusCode.Unavailable ||
            s.StatusCode == StatusCode.Unimplemented ||
            s.StatusCode == StatusCode.Unknown
            => new ObjectResult(s)
            {
                StatusCode = StatusCodes.Status500InternalServerError
            },
            _ => new BadRequestObjectResult(status)
        };
    }
}
