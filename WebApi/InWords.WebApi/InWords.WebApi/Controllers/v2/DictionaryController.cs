using InWords.Protobuf;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v2
{
    [Authorize]
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
        ///   Used to add words to the user's dictionary.
        ///   The (localId) value should be zero (0) if you don't need to track words.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
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
        /// <remarks>
        /// {"UserWordpairIds": [1,2,3]}
        /// </remarks>
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

        /// <summary>
        /// Experimental use only! ZERO TESTS
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [SwaggerResponse(StatusCodes.Status200OK, "Returns Updated words", typeof(AddWordsReply))]
        [Route("updatewords")]
        [HttpPost]
        public async Task<IActionResult> UpdateWords([FromBody]UpdateWordsRequest request)
        {
            var reqestObject = new AuthorizedRequestObject<UpdateWordsRequest, AddWordsReply>(request)
            {
                UserId = User.GetUserId()
            };
            AddWordsReply reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return Ok(reply);
        }

        /// <summary>
        /// Use this do delete user's words
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [SwaggerResponse(StatusCodes.Status200OK, "Returns nothing", typeof(Empty))]
        [Route("deletewords")]
        [HttpPost]
        public async Task<IActionResult> DeleteWords([FromBody]DeleteWordsRequest request)
        {
            var reqestObject = new AuthorizedRequestObject<DeleteWordsRequest, Empty>(request)
            {
                UserId = User.GetUserId()
            };
            Empty reply = await mediator.Send(reqestObject).ConfigureAwait(false);
            return Ok(reply);
        }
    }
}