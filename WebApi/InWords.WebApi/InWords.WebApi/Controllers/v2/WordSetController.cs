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
        {
            var requestObject = new AuthorizedRequestObject<WordSetWordsRequest, WordSetWordsReply>(request)
            {
                UserId = User.GetUserId()
            };
            WordSetWordsReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
            return Ok(reply);
        }

        [Route("to-dictionary")]
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status200OK, "Words added", typeof(Empty))]
        public async Task<IActionResult> ToDictionary(WordSetWordsRequest request)
        {
            var requestObject = new AuthorizedRequestObject<WordSetWordsRequest, Empty>(request)
            {
                UserId = User.GetUserId()
            };
            return Ok(await mediator.Send(requestObject).ConfigureAwait(false));
        }
    }
}