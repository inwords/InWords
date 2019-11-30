using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.CardGame;
using InWords.WebApi.Services.UserGameService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1._1.CardsGame
{
    [Authorize]
    [ApiVersion("1.1")]
    [Route("v{version:apiVersion}/Game")]
    [ApiController]
    [Produces("application/json")]
    public class ScoreController : ControllerBase
    {
        private readonly GameResultService gameResultService;
        private readonly LevelCreator levelCreator;

        public ScoreController(GameResultService gameResultService, LevelCreator levelCreator)
        {
            this.gameResultService = gameResultService;
            this.levelCreator = levelCreator;
        }

        /// <summary>
        ///     Use this to post score after game
        /// </summary>
        /// <deprecated>true</deprecated>
        /// <param name="levelMetricQuery"></param>
        /// <returns>Quantity of stars</returns>
        /// <response code="200">OK, scored</response>
        /// <response code="400">Null on request</response>
        [Route("Score")]
        [HttpPost]
        [ProducesResponseType(typeof(LevelMetricQueryResult), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostScore(LevelMetricQuery levelMetricQuery)
        {
            int authorizedId = User.GetUserId();

            LevelMetricQueryResult answer;
            // save score to user level
            try
            {
                // foreach level that doesn't have game create game
                IEnumerable<int> games = levelMetricQuery.WordPairIdOpenCounts.Select(w => w.Key);
                if (levelMetricQuery.GameLevelId <= 0)
                    levelMetricQuery.GameLevelId =
                        await levelCreator.CreateUserLevelAsync(authorizedId, games).ConfigureAwait(false);

                // save scores
                answer = await gameResultService.SetResultsAsync(authorizedId, levelMetricQuery)
                    .ConfigureAwait(false);
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
        /// <returns>Quantity of stars and level id</returns>
        [Route("UploadScore")]
        [HttpPost]
        public async Task<IActionResult> UploadScore(LevelMetricQuery[] cardGameScores)
        {
            int authorizedId = User.GetUserId();

            List<LevelMetricQueryResult> answer;
            // save score to user level
            try
            {
                answer = (await gameResultService.SetResultsAsync(authorizedId, cardGameScores)
                    .ConfigureAwait(false)).ToList();
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }

            return Ok(answer);
        }
    }
}