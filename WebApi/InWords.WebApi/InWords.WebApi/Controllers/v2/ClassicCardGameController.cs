using InWords.Protobuf;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v2
{
    [ApiVersion("2")]
    [Route("v{version:apiVersion}/ClassicCardGame")]
    [ApiController]
    [Produces("application/json")]
    public class ClassicCardGameController
    {
        private readonly IMediator mediator;
        public ClassicCardGameController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        [Route("estimate")]
        [ProducesResponseType(typeof(LevelPoints), StatusCodes.Status200OK)]
        public async Task<IActionResult> Estimate(CardGameMetrics request)
        {
            throw new NotImplementedException();
            //if (classicCardsMetrics is null)
            //    return BadRequest("Argument is null");

            //classicCardsMetrics.UserId = User.GetUserId();

            //ClassicCardLevelMetricQueryResult result;
            //try
            //{
            //    result = await mediator.Send(classicCardsMetrics)
            //        .ConfigureAwait(false);
            //}
            //catch (ArgumentOutOfRangeException e)
            //{
            //    return BadRequest(e.Message);
            //}
            //return Ok(result);
        }
    }
}
