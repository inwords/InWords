using InWords.Data.DTO.GameBox;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.GameService;
using InWords.WebApi.Services.GameService.Requests.GetGameLevels;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1.CardsGame
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/Game")]
    [ApiController]
    [Produces("application/json")]
    public class ScoreController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly IGameScoreService gameScoreService;
        private readonly GameService gameService;

        public ScoreController(
            IMediator mediator,
            GameScoreService gameScoreService,
            GameService gameService)
        {
            this.mediator = mediator;
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
            LevelMetricQueryResult answer = gameScoreService.GetLevelScore(levelResult);

            if (levelResult.LevelId < 0)
                return Ok(answer);

            // save score to user level
            try
            {
                await gameScoreService.PostScoreAsync(authorizedId, answer);
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
        public async Task<IActionResult> UploadScore(IEnumerable<LevelResult> levelResults)
        {
            int authorizedId = User.GetUserId();

            IEnumerable<LevelMetricQueryResult> answers = levelResults.Select(lr => gameScoreService.GetLevelScore(lr));

            if (answers.Where(a => a.LevelId < 0).Count() > 0)
                return Ok(answers);

            try
            {
                await gameScoreService.UploadScoreAsync(authorizedId, answers);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }

            return Ok(answers);
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
            GameObject result = await mediator.Send(new GetLevelsByGameIdQuery(id, userId)).ConfigureAwait(false);
            return Ok(result);
        }
    }
}