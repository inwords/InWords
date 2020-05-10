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
        public static async Task<TReply> AuthorizeHandler<TRequest, TReply>(
            this IMediator mediator,
            TRequest request,
            ServerCallContext context) where TRequest : new() where TReply : new()
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));

            var (reply, status) = await mediator.GenericHandler<TRequest, TReply>(request, context.GetHttpContext().User.GetUserId())
                .ConfigureAwait(false);

            context.Status = status;
            return reply;
        }

    
        public static async Task<IActionResult> AuthorizeHandlerActionResult<TRequest, TReply>(
            this IMediator mediator,
            TRequest request,
            ClaimsPrincipal user) where TRequest : new() where TReply : new()
        {
            var (result, status) = await mediator.GenericHandler<TRequest, TReply>(request, user.GetUserId())
                .ConfigureAwait(false);

            return Switch(result, status);
        }

        public static async Task<TReply> AnonimousHandler<TRequest, TReply>(
            this IMediator mediator,
            TRequest request,
            ServerCallContext context) where TRequest : new() where TReply : new()
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));

            var (reply, status) = await mediator.GenericHandler<TRequest, TReply>(request)
                .ConfigureAwait(false);

            context.Status = status;
            
            return reply;
        }


        public static async Task<IActionResult> AnonimousHandlerActionResult<TRequest, TReply>(
            this IMediator mediator,
            TRequest request) where TRequest : new() where TReply : new()
        {
            var (result, status) = await mediator.GenericHandler<TRequest, TReply>(request)
                .ConfigureAwait(false);

            return Switch(result, status);
        }
    }
}
