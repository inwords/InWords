using System;
using System.Threading.Tasks;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Registration.V2;

namespace InWords.WebApi.Controllers.v2
{
    [ApiVersion("2")]
    [Route("v{version:apiVersion}/profile")]
    [ApiController]
    [Produces("application/json")]
    public class ProfileController : ControllerBase
    {
        private readonly IMediator mediator;

        public ProfileController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>
        /// Use this to register user
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <remarks>
        /// Token will be sent in response to the request.               
        ///  
        /// During registration a activation message will be sent to the user's email. 
        ///  
        /// 400 means that the user was not found or the password was entered incorrectly
        /// </remarks>
        [Route("register")]
        [HttpPost]
        [ProducesResponseType(typeof(RegistrationReply), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register(RegistrationRequest request)
        {
            try
            {
                var requestObject = new RequestObject<RegistrationRequest, RegistrationReply>(request);
                RegistrationReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
                return Ok(reply);
            }
            catch (ArgumentException e)
            {
                return BadRequest($"{e.Message}");
            }
        }

        /// <summary>
        ///     Use this to get token
        /// </summary>
        /// <returns>user's access token</returns>
        /// <response code="200">Success</response>
        /// <response code="400">Access denied</response>
        [ProducesResponseType(typeof(TokenReply), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("token")]
        [HttpPost]
        public async Task<IActionResult> Token([FromBody] TokenRequest request)
        {
            try
            {
                var requestObject = new RequestObject<TokenRequest, TokenReply>(request);
                TokenReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
                return Ok(reply);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}