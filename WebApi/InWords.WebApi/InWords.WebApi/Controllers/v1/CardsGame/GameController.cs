using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Data.DTO;
using InWords.Data.DTO.GameBox;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.Data.Enums;
using InWords.Data.Repositories;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.GameService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        private readonly GameBoxRepository gameBoxRepository;
        private readonly GameLevelWordService gameLevelWordService;
        private readonly GameScoreService gameScoreService;
        private readonly GameService gameService;

        /// <summary>
        /// </summary>
        /// <param name="gameScoreService"></param>
        /// <param name="gameBoxRepository"></param>
        /// <param name="gameLevelWordService"></param>
        /// <param name="gameService"></param>
        public GameController(GameScoreService gameScoreService, GameBoxRepository gameBoxRepository,
            GameLevelWordService gameLevelWordService, GameService gameService)
        {
            this.gameScoreService = gameScoreService;
            this.gameBoxRepository = gameBoxRepository;
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

            SyncBase answer = await gameService.AddGamePack(authorizedId, gamePack);

            return Ok(answer);
        }

        /// <summary>
        ///     in dev Didn't work now
        /// </summary>
        /// <deprecated>true</deprecated>
        /// <param name="levelResult"></param>
        /// <returns></returns>
        [Route("score")]
        [HttpPost]
        public async Task<IActionResult> PostScore(LevelResult levelResult)
        {
            int authorizedId = User.GetUserId();
            // calculate score
            LevelScore answer = gameScoreService.GetLevelScore(levelResult);

            // save score to user level
            try
            {
                await gameScoreService.UpdateUserScore(authorizedId, answer);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }

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
            List<GameInfo> answer = gameService.GetGames();

            return Ok(answer);
        }

        /// <summary>
        ///     Use this to get game information by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetGame(int id)
        {
            int userId = User.GetUserId();
            // find levels
            GameObject answer = await gameService.GetGameObject(id);
            if (answer == null) return NotFound();

            // set stars
            answer = await gameScoreService.GetGameStars(userId, answer);

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
        public IActionResult GetLevel(int id)
        {
            Level answer = gameLevelWordService.GetLevelWords(id);

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
        public async Task<IActionResult> Delete(int id)
        {
            return await DeleteRange(id);
        }

        /// <summary>
        ///     This is to delete more then one game at request
        /// </summary>
        /// <param name="ids">array of game to be deleted</param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteRange")]
        public async Task<IActionResult> DeleteRange(params int[] ids)
        {
            int userId = User.GetUserId();

            string role = User.GetUserRole();

            int count = role == RoleType.Admin.ToString()
                ? await gameBoxRepository.DeleteGames(ids)
                : await gameBoxRepository.DeleteOwnGames(userId, ids);

            return count == 0 ? (IActionResult) NotFound("Zero object can be deleted") : Ok(count);
        }
    }
}