using InWords.Data.DTO;
using InWords.Data.DTO.GameBox;
using InWords.Data.Enums;
using InWords.Data.Repositories;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.GameService;
using InWords.WebApi.Services.GameWordsToDictionary.ByGameIdUserId;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1.CardsGame
{
    /// <inheritdoc />
    /// <summary>
    ///     This game controller allow CRUD games
    /// </summary>
    [Authorize]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class GameController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly CreationRepository creationRepository;
        private readonly GameLevelWordService gameLevelWordService;
        private readonly GameService gameService;

        public GameController(CreationRepository creationRepository,
            GameLevelWordService gameLevelWordService,
            GameService gameService, IMediator mediator)
        {
            this.mediator = mediator;
            this.creationRepository = creationRepository;
            this.gameLevelWordService = gameLevelWordService;
            this.gameService = gameService;
        }

        /// <summary>
        ///     This is to add game pack from body use Game pack object
        /// </summary>
        /// <see cref="GamePack" />
        /// <param name="gamePack">describe game</param>
        /// <returns></returns>
        [Route("addGamePack")]
        [HttpPost]
        public async Task<IActionResult> AddGamePack([FromBody] GamePack gamePack)
        {
            int authorizedId = User.GetUserId();

            SyncBase answer = await gameService.AddGamePackAsync(authorizedId, gamePack);

            return Ok(answer);
        }

        /// <summary>
        ///     Returns short information about all games in database
        /// </summary>
        /// <returns></returns>
        [Route("GameInfo")]
        [HttpGet]
        public IActionResult GetGameInfo()
        {
            IEnumerable<GameInfo> answer = gameService.GetGames();

            return Ok(answer);
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
        public async Task<IActionResult> GetLevel(int id)
        {
            Level answer = await gameLevelWordService.GetLevelWordsAsync(id)
                .ConfigureAwait(false);

            return Ok(answer);
        }

        /// <summary>
        ///     This is api to delete game box
        ///     Deletion allow only if it is your game
        ///     of if your are admin
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("Delete/{id}")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public Task<IActionResult> Delete(int id)
        {
            return DeleteRange(id);
        }

        /// <summary>
        ///     This is to delete more then one game at request
        /// </summary>
        /// <param name="ids">array of game to be deleted</param>
        /// <response code="200">Count of deleted words</response>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteRange")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteRange(params int[] ids)
        {
            int userId = User.GetUserId();

            string role = User.GetUserRole();

            int count = role == RoleType.Admin.ToString()
                ? await creationRepository.DeleteGames(ids).ConfigureAwait(false)
                : await creationRepository.DeleteOwnGames(userId, ids).ConfigureAwait(false);

            return count == 0 ? (IActionResult)NotFound("Zero object can be deleted") : Ok(count);
        }

        /// <summary>
        /// Adds words to the user dictionary by GameId avoiding existing ones
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /AddWordsToUserDictionary
        ///     
        ///     42 // id of the game
        ///                
        /// </remarks>
        /// <param name="gameId">Game Id from which to take the words</param>
        /// <response code="200">Count of added words</response>
        /// <returns>Count of adding words</returns>
        [HttpPost]
        [Route("AddWordsToUserDictionary")]
        [ProducesResponseType(typeof(GameToUserQueryResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> AddWordsToUserDictionary([FromBody] int gameId)
        {
            int userId = User.GetUserId();
            var query = new GameToUserQuery(userId, gameId);
            GameToUserQueryResult result = await mediator.Send(query).ConfigureAwait(false);
            return Ok(result);
        }
    }
}

///// <summary>
///// Creates a TodoItem.
///// </summary>
///// <remarks>
///// Sample request:
/////
/////     POST /Todo
/////     {
/////        "id": 1,
/////        "name": "Item1",
/////        "isComplete": true
/////     }
/////
///// </remarks>