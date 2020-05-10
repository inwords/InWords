using InWords.Protobuf;
using InWords.WebApi.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
         => await mediator
            .AuthorizeHandlerActionResult<EmailChangeRequest, EmailChangeReply>(request, User)
            .ConfigureAwait(false);


        /// <summary>
        ///   Use this to confirm email code
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize]
        [ProducesResponseType(typeof(ConfirmEmailRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("confirmEmail")]
        [HttpPost]
        public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailRequest request)
            => await mediator.AuthorizeHandlerActionResult<ConfirmEmailRequest, ConfirmEmailReply>(request, User).ConfigureAwait(false);

        /// <summary>
        /// Input point for the link from the confirmation email.
        /// </summary>
        /// <param name="encryptLink"></param>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        [Route("Confirm/{encryptLink}")]
        [ProducesResponseType(typeof(ConfirmEmailReply), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ConfirmLink(string encryptLink)
        {
            ConfirmEmailLinkRequest request = new ConfirmEmailLinkRequest()
            {
                ActivationGuid = encryptLink
            };
            var result = await mediator
                .AnonimousHandlerActionResult<ConfirmEmailLinkRequest, ConfirmEmailReply>(request)
                .ConfigureAwait(false);

            if (result is ObjectResult resultObject)
            {
                if (resultObject.StatusCode == StatusCodes.Status200OK)
                {
                    // email confirm
                    return Redirect("http://inwords.ru/");
                }
            }
            return BadRequest();
        }

        /// <summary>
        /// Deletes all user information without being able to return it. 
        /// When implementing this function, use the warning window.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize]
        [HttpDelete]
        [Route("delete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete([FromBody] DeleteAccountRequest request)
            => await mediator.AuthorizeHandlerActionResult<DeleteAccountRequest, Empty>(request, User).ConfigureAwait(false);
    }
}