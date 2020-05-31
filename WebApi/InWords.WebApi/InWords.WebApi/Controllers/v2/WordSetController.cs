using InWords.Protobuf;
using InWords.WebApi.Extensions;
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
    [Route("v{version:apiVersion}/wordset")]
    [ApiController]
    [Produces("application/json")]
    public class WordSetController : ControllerBase
    {
        private readonly IMediator mediator;

        public WordSetController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>
        /// This is to get word's in word set
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <remarks>
        ///  
        /// . 
        /// Word's marked as hasAdded if user already has this word in the dictionary.               
        ///  
        /// 
        /// </remarks>
        [Route("getwordslist")]
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status200OK, "Words in set", typeof(WordSetWordsReply))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register(WordSetWordsRequest request)
         => await mediator
            .AuthorizeHandlerActionResult<WordSetWordsRequest, WordSetWordsReply>(request, User)
            .ConfigureAwait(false);

        /// <summary>
        /// Adds all words from the set of words to the user's dictionary
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Route("to-dictionary")]
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status200OK, "Words added", typeof(Empty))]
        public async Task<IActionResult> ToDictionary(WordSetWordsRequest request)
        => await mediator
            .AuthorizeHandlerActionResult<WordSetWordsRequest, Empty>(request, User)
            .ConfigureAwait(false);

        /// <summary>
        /// Returns a list of the official sets of words.
        /// </summary>
        /// <returns></returns>
        [Route("sets")]
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, "Words added", typeof(WordSetReply))]
        public async Task<IActionResult> GetSets()
        => await mediator
            .AuthorizeHandlerActionResult<Empty, WordSetReply>(new Empty(), User)
            .ConfigureAwait(false);


        /// <summary>
        /// Returns the levels of the selected set of words
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [SwaggerResponse(StatusCodes.Status200OK, "WordSet's levels list", typeof(GetLevelsReply))]
        public async Task<IActionResult> GetLevels([FromRoute] int id)
        {
            var request = new GetLevelsRequest()
            {
                WordSetId = id
            };
            return await mediator
                .AuthorizeHandlerActionResult<GetLevelsRequest, GetLevelsReply>(request, User)
                .ConfigureAwait(false);
        }


        /// <summary>
        /// Use this to get word's in level
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("level/{id}")]
        [SwaggerResponse(StatusCodes.Status200OK, "Level's words list", typeof(GetLevelWordsReply))]
        public async Task<IActionResult> GetLevelWords([FromRoute] int id)
        {
            var request = new GetLevelWordsRequest()
            {
                LevelId = id
            };
            return await mediator.
                AuthorizeHandlerActionResult<GetLevelWordsRequest, GetLevelWordsReply>(request, User)
                .ConfigureAwait(false);
        }

        [HttpGet("history")]
        [SwaggerResponse(StatusCodes.Status200OK, "history levels", typeof(GameScoreReply))]
        public async Task<IActionResult> History()
            => await mediator.AuthorizeHandlerActionResult<Empty, GameScoreReply>(new Empty(), User)
            .ConfigureAwait(false);

        /// <summary>
        /// This method saves trainings and evaluates games from 0 to 6 half stars
        /// </summary>
        /// <param name="trainingDataRequest"></param>
        /// <returns></returns>
        [HttpPost("estimate")]
        [SwaggerResponse(StatusCodes.Status200OK, "history levels", typeof(TrainingScoreReply))]
        public async Task<IActionResult> History(TrainingDataRequest trainingDataRequest)
            => await mediator.AuthorizeHandlerActionResult<TrainingDataRequest, TrainingScoreReply>(trainingDataRequest, User)
            .ConfigureAwait(false);

        [HttpPost("fullsets")]
        [SwaggerResponse(StatusCodes.Status200OK, "history levels", typeof(WordSetReply))]
        public Task<IActionResult> GetFullSets(SetsCountRequest request)
            => mediator.AuthorizeHandlerActionResult<SetsCountRequest, WordSetReply>(request, User);

    }
}