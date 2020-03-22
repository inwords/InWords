﻿using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v2
{
    [ApiVersion("2")]
    [Route("v{version:apiVersion}/auth")]
    [ApiController]
    [Produces("application/json")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator mediator;

        public AuthController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        /// <summary>
        ///   Used to add words to the user's dictionary.
        ///   The (localId) value should be zero (0) if you don't need to track words.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [SwaggerResponse(StatusCodes.Status200OK, "Returns Token", typeof(TokenReply))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [Route("oauth2")]
        [HttpPost]
        public async Task<IActionResult> OAuth2([FromBody] OAuthTokenRequest request)
        {
            var requestObject = new RequestObject<OAuthTokenRequest, TokenReply>(request);
            TokenReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
            if (requestObject.StatusCode != Grpc.Core.StatusCode.OK)
            {
                return BadRequest(requestObject.Detail);
            }
            return Ok(reply);
        }

        [SwaggerResponse(StatusCodes.Status200OK, "Returns Token", typeof(TokenReply))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [Route("basic")]
        [HttpPost]
        public async Task<IActionResult> Basic([FromBody] TokenRequest request)
        {
            var requestObject = new RequestObject<TokenRequest, TokenReply>(request);

            TokenReply reply = await mediator.Send(requestObject).ConfigureAwait(false);

            if (requestObject.StatusCode != Grpc.Core.StatusCode.OK)
            {
                return BadRequest(requestObject.Detail);
            }
            return Ok(reply);
        }

        [SwaggerResponse(StatusCodes.Status200OK, "Returns Token", typeof(TokenReply))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest request)
        {
            var requestObject = new RequestObject<RegistrationRequest, RegistrationReply>(request);
            RegistrationReply reply = await mediator.Send(requestObject).ConfigureAwait(false);

            if (requestObject.StatusCode != Grpc.Core.StatusCode.OK)
            {
                BadRequest(requestObject.Detail);
            }
            return Ok(new TokenReply()
            {
                Token = reply.Token,
                UserId = reply.Userid
            });
        }
    }
}