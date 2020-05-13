using InWords.Data.DTO;
using InWords.Service.Auth.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
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
        ///    Use v2 Dictionary.TrainingIds 
        /// </summary>
        /// <returns>Quantity of stars</returns>
        /// <response code="200">Words to be repeated</response>
        /// <response code="401">Unauthorized access</response>
        [Obsolete("Use v2 Dictionary.Training")]
        [Route("training")]
        [HttpGet]
        [ProducesResponseType(typeof(List<WordTranslation>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetTraining()
        {
            return new ObjectResult(typeof(WordTranslation))
            {
                StatusCode = StatusCodes.Status301MovedPermanently,
            };
        }

        /// <summary>
        ///     Use v2 Dictionary.Training
        /// </summary>
        /// <returns>Quantity of stars</returns>
        /// <response code="200">Word pairs Ids to be repeated</response>
        /// <response code="401">Unauthorized access</response>
        [Obsolete("Use v2 Dictionary.TrainingIds")]
        [Route("trainingIds")]
        [HttpGet]
        [ProducesResponseType(typeof(List<int>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetTrainingIds()
        {
            return new ObjectResult(typeof(WordTranslation))
            {
                StatusCode = StatusCodes.Status301MovedPermanently,
            };
        }
    }
}