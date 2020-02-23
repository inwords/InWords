using System.Threading.Tasks;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WordSet.V2;

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
        [ProducesResponseType(typeof(WordSetWordsReply), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register(WordSetWordsRequest request)
        {
            var requestObject = new AuthorizedRequestObject<WordSetWordsRequest, WordSetWordsReply>(request)
            {
                UserId = User.GetUserId()
            };
            WordSetWordsReply reply = await mediator.Send(requestObject).ConfigureAwait(false);
            return Ok(reply);
        }
    }
}