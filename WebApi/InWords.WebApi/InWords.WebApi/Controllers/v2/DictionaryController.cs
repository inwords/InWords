using Grpc.Core;
using InWords.Protobuf;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Extensions;
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

        public DictionaryController(IMediator mediator) => this.mediator = mediator;
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
            => await mediator.AuthorizeHandlerActionResult<AddWordsRequest, AddWordsReply>(request, User).ConfigureAwait(false);

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
            => await mediator.AuthorizeHandlerActionResult<GetWordsRequest, WordsReply>(request, User).ConfigureAwait(false);


        /// <summary>
        /// Deletes the old word and adds a new one. Use during editing
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [SwaggerResponse(StatusCodes.Status200OK, "Returns Updated words", typeof(AddWordsReply))]
        [Route("updatewords")]
        [HttpPost]
        public async Task<IActionResult> UpdateWords([FromBody]UpdateWordsRequest request)
        {
            var reqestObject = new AuthReq<UpdateWordsRequest, AddWordsReply>(request)
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
            => await mediator.AuthorizeHandlerActionResult<DeleteWordsRequest, Empty>(request, User).ConfigureAwait(false);



        [SwaggerResponse(StatusCodes.Status200OK, "", typeof(LookupReply))]
        [Route("lookup")]
        [HttpPost]
        public async Task<IActionResult> Lookup(LookupRequest request)
            => await mediator.AnonimousHandlerActionResult<LookupRequest, LookupReply>(request).ConfigureAwait(false);

        /// <summary>
        /// Use this to request pairs to learn
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [SwaggerResponse(StatusCodes.Status200OK, "Returns Training Pairs", typeof(TrainingReply))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, "Request status", typeof(Status))]
        [Route("training")]
        [HttpGet]
        public async Task<IActionResult> Training()
            => await mediator.AuthorizeHandlerActionResult<Empty, TrainingReply>(new Empty(), User).ConfigureAwait(false);

        /// <summary>
        /// Use this to request pairs to learn
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [SwaggerResponse(StatusCodes.Status200OK, "Returns Training Ids", typeof(TrainingIdsReply))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, "Request status", typeof(Status))]
        [Route("trainingIds")]
        [HttpGet]
        public async Task<IActionResult> TrainingIds()
            => await mediator.AuthorizeHandlerActionResult<Empty, TrainingIdsReply>(new Empty(), User).ConfigureAwait(false);
    }
}