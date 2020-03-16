using Grpc.Core;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Extensions
{
    public static class ServerCallContextExtensions
    {
        public static void UpdateStatus<TRequest, TReply>
            (this ServerCallContext serverCallContext, RequestObject<TRequest, TReply> requestObject) where TRequest : new() where TReply : new()
        {
            if (requestObject != null && serverCallContext != null && requestObject.StatusCode != StatusCode.OK)
            {
                serverCallContext.Status = new Status(requestObject.StatusCode, requestObject.Detail);
            }
        }
    }
}
