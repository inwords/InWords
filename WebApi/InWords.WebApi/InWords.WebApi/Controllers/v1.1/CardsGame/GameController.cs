using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.Data.DTO.Games.Levels;
using InWords.Service.Auth.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1._1.CardsGame
{
    [Authorize]
    [ApiVersion("1.1")]
    [Route("v{version:apiVersion}/game")]
    [ApiController]
    [Produces("application/json")]
    public class GameController : ControllerBase
    {
        private readonly IMediator mediator;

        public GameController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>
        ///     Use this to post score after game
        /// </summary>
        /// <deprecated>true</deprecated>
        /// <param name="levelMetricQuery"></param>
        /// <returns>Quantity of stars</returns>
        /// <response code="200">OK, scored</response>
        /// <response code="400">Null on request</response>
        [Route("score")]
        [HttpPost]
        [Obsolete]
        [ProducesResponseType(typeof(LevelMetricQueryResult), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostScore(LevelMetricQuery levelMetricQuery)
        {
            // Convert to new request
            var classicCardsMetrics = new ClassicCardLevelMetricQuery
            {
                UserId = User.GetUserId(),
                Metrics = new List<ClassicCardLevelMetric>()
                {
                    new ClassicCardLevelMetric()
                    {
                        GameLevelId = levelMetricQuery.GameLevelId,
                        WordPairIdOpenCounts = levelMetricQuery.WordPairIdOpenCounts
                    }
                }.ToImmutableArray()
            };

            // Actual code
            ClassicCardLevelMetricQueryResult result;
            try
            {
                result = await mediator.Send(classicCardsMetrics)
                    .ConfigureAwait(false);
            }
            catch (ArgumentOutOfRangeException e)
            {
                return BadRequest(e.Message);
            }

            // convert to obsolete answer
            var scoreInfo = result.ClassicCardLevelResult.FirstOrDefault();
            LevelMetricQueryResult answer =
                new LevelMetricQueryResult(scoreInfo.LevelId, scoreInfo.Score);

            return Ok(answer);
        }

        /// <summary>
        ///     Use to upload user results
        /// </summary>
        /// <returns>Quantity of stars and level id</returns>
        [Route("uploadScore")]
        [Obsolete]
        [HttpPost]
        public async Task<IActionResult> UploadScore(LevelMetricQuery[] cardGameScores)
        {
            var classicCardMetric = cardGameScores.Select(l => new ClassicCardLevelMetric()
            {
                GameLevelId = l.GameLevelId,
                WordPairIdOpenCounts = l.WordPairIdOpenCounts
            });

            // Convert to new request
            var classicCardsMetrics = new ClassicCardLevelMetricQuery
            {
                UserId = User.GetUserId(),
                Metrics = classicCardMetric.ToImmutableArray()
            };

            // Actual code
            ClassicCardLevelMetricQueryResult result;
            try
            {
                result = await mediator.Send(classicCardsMetrics)
                    .ConfigureAwait(false);
            }
            catch (ArgumentOutOfRangeException e)
            {
                return BadRequest(e.Message);
            }

            // convert to obsolete answer
            var scoreInfo = result.ClassicCardLevelResult.Select(m => new LevelMetricQueryResult(m.LevelId, m.Score));

            return Ok(scoreInfo.ToList());
        }
    }
}