using InWords.Service.Auth.Extensions;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v2
{
    [ApiVersion("2")]
    [Route("v{version:apiVersion}/dictionary")]
    [ApiController]
    [Produces("application/json")]
    public class DictionaryController : ControllerBase
    {
        private readonly IMediator mediator;

        public DictionaryController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        /// <summary>
        ///   Use this to request update user's email
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize]
        [ProducesResponseType(typeof(EmailChangeRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("updateEmail")]
        [HttpPost]
        public async Task<IActionResult> UpdateEmail([FromBody] EmailChangeRequest request)
        {
            try
            {
                var reqestObject = new AuthorizedRequestObject<EmailChangeRequest, EmailChangeReply>(request)
                {
                    UserId = User.GetUserId()
                };
                EmailChangeReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
                return Ok(reply);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}