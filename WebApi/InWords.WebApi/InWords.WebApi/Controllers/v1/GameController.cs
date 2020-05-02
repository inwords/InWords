using InWords.Data.DTO;
using InWords.Data.DTO.GameBox;
using InWords.WebApi.Services.GameService;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1.CardsGame
{
    /// <inheritdoc />
    /// <summary>
    ///     This game controller allow CRUD games
    /// </summary>
    [Authorize]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/Game")]
    [ApiController]
    [Produces("application/json")]
    public class GameController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly GameLevelWordService gameLevelWordService;

        public GameController(GameLevelWordService gameLevelWordService
            , IMediator mediator)
        {
            this.mediator = mediator;
            this.gameLevelWordService = gameLevelWordService;
        }

        /// <summary>
        ///     This is to get Words translation list of level
        /// </summary>
        /// <see cref="Level" />
        /// <see cref="WordTranslation" />
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("level/{id}")]
        [HttpGet]
        [Obsolete]
        public async Task<IActionResult> GetLevel(int id)
        {
            Level answer = await gameLevelWordService.GetLevelWordsAsync(id)
                .ConfigureAwait(false);

            return Ok(answer);
        }
    }
}