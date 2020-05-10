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
    public static partial class HandlerExtention
    {
        private static async Task<(TReply reply, Status status)> GenericHandler<TRequest, TReply>(
            this IMediator mediator,
            TRequest request, int? userId = null) where TRequest : new() where TReply : new()
        {
            dynamic reqestObject;
            if (userId.HasValue)
            {
                reqestObject = new AuthorizedRequestObject<TRequest, TReply>(request)
                {
                    UserId = userId.Value
                };
            }
            else
            {
                reqestObject = new RequestObject<TRequest, TReply>(request);
            }
            TReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return (reply, new Status(reqestObject.StatusCode, reqestObject.Detail));
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
