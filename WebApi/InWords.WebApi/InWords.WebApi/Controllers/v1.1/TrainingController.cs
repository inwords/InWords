using InWords.Data.DTO.Games.Levels;
using InWords.Service.Auth.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1._1
{
    [Authorize]
    [ApiVersion("1.1")]
    [Route("v{version:apiVersion}/training")]
    [ApiController]
    [Produces("application/json")]
    public class TrainingController : ControllerBase
    {
        private readonly IMediator mediator;

        public TrainingController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>
        /// Use this to upload user's level's metric
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /estimate
        ///     
        ///   {
        ///    "metrics": [
        ///    {
        ///        "gameLevelId": 12,
        ///        "wordPairIdOpenCounts": {
        ///            "1": 4,
        ///            "2": 5,
        ///            "5": 1
        ///        }
        ///    },
        ///   "metrics": [
        ///    {
        ///        "gameLevelId": 0, (NOTE: If gameLevelId is zero game will be created in history)
        ///        "wordPairIdOpenCounts": {
        ///            "3": 1,
        ///            "2": 2,
        ///            "1": 3
        ///        }
        ///    }
        ///    ]
        ///   }
        ///                
        /// </remarks>
        [HttpPost]
        [Route("estimate")]
        public async Task<IActionResult> Estimate(ClassicCardLevelMetricQuery classicCardsMetrics)
        {
            if (classicCardsMetrics is null)
                return BadRequest("Argument is null");

            classicCardsMetrics.UserId = User.GetUserId();

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
            return Ok(result);
        }
    }
}
