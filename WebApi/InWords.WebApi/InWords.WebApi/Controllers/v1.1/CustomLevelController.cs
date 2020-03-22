using InWords.Data.DTO.GameBox;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.UserGameService.GetUsersGameHistory;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1._1.CardsGame
{
    [Authorize]
    [ApiVersion("1.1")]
    [Route("v{version:apiVersion}/CustomLevel")]
    [ApiController]
    [Produces("application/json")]
    public class CustomLevelController : ControllerBase
    {
        private readonly IMediator mediator;

        public CustomLevelController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>
        ///     Use this to get last custom played games
        /// </summary>
        /// <deprecated>true</deprecated>
        /// <returns>History of users custom levels</returns>
        /// <response code="401">Unauthorized</response>
        /// <response code="200">OK</response>
        [Route("History")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<LevelInfo>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetHistory()
        {
            int authorizedId = User.GetUserId();
            var request = new GetUserGameStoryQuery()
            {
                UserId = authorizedId
            };
            List<LevelInfo> result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }
    }
}