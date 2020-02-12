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
        public async Task<IActionResult> GetTraining(RegistrationRequest request)
        {
            var requestObject = new RequestObject<RegistrationRequest, RegistrationReply>(request);
            RegistrationReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
            return Ok(reply);
        }
    }
}