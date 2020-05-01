using InWords.Data.DTO;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWords;
using InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWordsIds;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1dot1
{
    [Authorize]
    [ApiVersion("1.1")]
    [Route("v{version:apiVersion}/dictionary")]
    [ApiController]
    [Produces("application/json")]
    public class DictionaryController : ControllerBase
    {
        private readonly IMediator mediator;

        public DictionaryController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>
        ///     Get user dictionary words pairs to be repeated. Use when dictionary is not loaded or storage unavailable 
        /// </summary>
        /// <returns>Quantity of stars</returns>
        /// <response code="200">Words to be repeated</response>
        /// <response code="401">Unauthorized access</response>
        [Route("training")]
        [HttpGet]
        [ProducesResponseType(typeof(List<WordTranslation>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetTraining()
        {
            int authorizedId = User.GetUserId();
            var query = new GetLearningUserWordsQuery(authorizedId);
            List<WordTranslation> result = await mediator.Send(query).ConfigureAwait(false);
            return Ok(result);
        }

        /// <summary>
        ///     Get user dictionary word pairs ids to be repeated. Use when dictionary is downloaded and resolve worlds on client
        /// </summary>
        /// <returns>Quantity of stars</returns>
        /// <response code="200">Word pairs Ids to be repeated</response>
        /// <response code="401">Unauthorized access</response>
        [Route("trainingIds")]
        [HttpGet]
        [ProducesResponseType(typeof(List<int>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetTrainingIds()
        {
            int authorizedId = User.GetUserId();
            var query = new GetLearningUserWordsIdQuery(authorizedId);
            List<int> result = await mediator.Send(query).ConfigureAwait(false);
            return Ok(result);
        }
    }
}