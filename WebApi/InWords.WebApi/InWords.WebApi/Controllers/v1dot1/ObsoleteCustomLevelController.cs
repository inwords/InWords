using InWords.Data.DTO.GameBox;
using InWords.Service.Auth.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1dot1.CardsGame
{
    [Obsolete]
    [Authorize]
    [ApiVersion("1.1")]
    [Route("v{version:apiVersion}/CustomLevel")]
    [ApiController]
    [Produces("application/json")]
    public class CustomLevelController : ControllerBase
    {
        private readonly IMediator mediator;

        public CustomLevelController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>
        ///     "Use v2 wordset history"
        /// </summary>
        /// <deprecated>true</deprecated>
        /// <returns>History of users custom levels</returns>
        /// <response code="401">Unauthorized</response>
        /// <response code="200">OK</response>
        [Obsolete("Use v2 wordset history")]
        [Route("History")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<LevelInfo>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetHistory()
        {
            return new ObjectResult(typeof(LevelInfo))
            {
                StatusCode = StatusCodes.Status301MovedPermanently,
            };
        }
    }
}