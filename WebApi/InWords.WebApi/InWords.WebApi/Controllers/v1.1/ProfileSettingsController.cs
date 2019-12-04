using System.Threading.Tasks;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.UsersAvatars.FileUploadAvatar;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1._1
{
    [Authorize]
    [ApiVersion("1.1")]
    [Route("v{version:apiVersion}/profileSettings")]
    [ApiController]
    [Produces("application/json")]
    public class ProfileSettings : ControllerBase
    {
        private readonly IMediator mediator;

        public ProfileSettings(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>
        ///     Use this to update user avatar
        /// </summary>
        /// <returns>Quantity of stars</returns>
        /// <response code="200">Words to be repeated</response>
        /// <response code="401">Unauthorized access</response>
        /// <response code="417">File is zero length</response>
        [Route("uploadAvatar")]
        [HttpPut]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status417ExpectationFailed)]
        public async Task<IActionResult> UploadAvatar(IFormFile file)
        {
            if (IsNullOrZeroLength(file)) return StatusCode(417, "File is zero length");

            int authorizedId = User.GetUserId();
            var query = new UploadAvatarQuery(authorizedId,file);
            UploadAvatarQueryResult result = await mediator.Send(query).ConfigureAwait(false);
            return Ok(result);
        }

        private static bool IsNullOrZeroLength(IFormFile file)
        {
            return file != null && file.Length <= 0;
        }
    }
}