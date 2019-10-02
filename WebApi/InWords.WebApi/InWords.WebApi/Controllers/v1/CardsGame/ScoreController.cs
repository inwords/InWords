using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Data.DTO.GameBox;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.GameService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1.CardsGame
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/Game")]
    [ApiController]
    [Produces("application/json")]
    public class ScoreController : ControllerBase
    {
        private readonly IGameScoreService gameScoreService;
        private readonly GameService gameService;

        public ScoreController(GameScoreService gameScoreService, GameService gameService)
        {
            this.gameScoreService = gameScoreService;
            this.gameService = gameService;
        }

        /// <summary>
        ///     Use this to post score after game
        /// </summary>
        /// <deprecated>true</deprecated>
        /// <param name="levelResult"></param>
        /// <returns>Quantity of stars</returns>
        [Route("score")]
        [HttpPost]
        public async Task<IActionResult> PostScore(LevelResult levelResult)
        {
            int authorizedId = User.GetUserId();
            // calculate score
            LevelScore answer = gameScoreService.GetLevelScore(levelResult);

            if (levelResult.LevelId < 0)
                return Ok(answer);

            // save score to user level
            try
            {
                await gameScoreService.PostScore(authorizedId, answer);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }

            return Ok(answer);
        }

        /// <summary>
        ///     Use to upload user results
        /// </summary>
        /// <param name="levelScores"></param>
        /// <returns>Quantity of stars and level id</returns>
        [Route("UploadScore")]
        [HttpPost]
        public async Task<IActionResult> UploadScore(IEnumerable<LevelScore> levelScores)
        {
            int authorizedId = User.GetUserId();
            //rebase test
            try
            {
                await gameScoreService.UploadScore(authorizedId, levelScores);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
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
            // todo single service/request implementation
            int userId = User.GetUserId();
            // find levels
            GameObject answer = await gameService.GetGameObject(id);
            if (answer == null) return NotFound();

            // set stars
            answer = await gameScoreService.GetGameStars(userId, answer);

            return Ok(answer);
        }
    }
}