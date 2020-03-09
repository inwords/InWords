using InWords.Service.Auth.Extensions;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v2
{
    [ApiVersion("2")]
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
        ///   Use this to request update user's email
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize]
        [ProducesResponseType(typeof(AddWordsRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("addwords")]
        [HttpPost]
        public async Task<IActionResult> AddWords([FromBody] AddWordsRequest request)
        {
            var reqestObject = new AuthorizedRequestObject<AddWordsRequest, AddWordsReply>(request)
            {
                UserId = User.GetUserId()
            };
            AddWordsReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return Ok(reply);
        }

        /// <summary>
        ///   Use this to get words and delete words that not exists
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Authorize]
        [ProducesResponseType(typeof(WordsReply), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("getwords")]
        [HttpPost]
        public async Task<IActionResult> GetWords([FromBody] GetWordsRequest request)
        {
            var reqestObject = new AuthorizedRequestObject<GetWordsRequest, WordsReply>(request)
            {
                UserId = User.GetUserId()
            };
            WordsReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return Ok(reply);
        }
    }
}