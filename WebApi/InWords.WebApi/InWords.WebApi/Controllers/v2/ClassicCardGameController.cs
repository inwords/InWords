using Grpc.Core;
using InWords.Protobuf;
using InWords.WebApi.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v2
{
    [Authorize]
    [ApiVersion("2")]
    [Route("v{version:apiVersion}/ClassicCardGame")]
    [ApiController]
    [Produces("application/json")]
    public class ClassicCardGameController : Controller
    {
        private readonly IMediator mediator;
        public ClassicCardGameController(IMediator mediator) => this.mediator = mediator;

        /// <summary>
        /// Use wordset estimate
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Obsolete("Use wordset estimate")]
        [HttpPost]
        [Route("estimate")]
        [ProducesResponseType(typeof(LevelPoints), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Status), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Estimate(CardGameMetrics request)
            => await mediator.AuthorizeHandlerActionResult<CardGameMetrics, LevelPoints>(request, User).ConfigureAwait(false);

        /// <summary>
        /// Use wordset estimate without game level id
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Obsolete("Use wordset estimate without game level id")]
        [HttpPost]
        [Route("save")]
        [ProducesResponseType(typeof(LevelPoints), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Status), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Save(CardGameInfos request)
            => await mediator.AuthorizeHandlerActionResult<CardGameInfos, LevelPoints>(request, User).ConfigureAwait(false);

    }
}
