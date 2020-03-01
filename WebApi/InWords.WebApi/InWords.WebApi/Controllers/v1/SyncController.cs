using InWords.Data.DTO;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace InWords.WebApi.Controllers.v1
{
    /// <summary>
    ///     Everething about sync
    /// </summary>
    [ApiController]
    [ApiVersion("1.0")]
    [Produces("application/json")]
    [Route("v{version:apiVersion}/[controller]")]
    public class SyncController : ControllerBase
    {
        ///// <summary>
        /////     Request auth token 
        ///// </summary>
        ///// <returns>A newly token</returns>
        ///// <response code="200">Success</response>
        ///// <response code="400">Auth error</response>  
        //[ProducesResponseType(typeof(TokenResponse), StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Route("WordPairs")]
        //[HttpPost]
        ////todo PushRequest (list<wordTranslation> + serverId_toDelete)
        //public IActionResult PushWordPairs([FromBody] IEnumerable<WordTranslation> wordTranslationList)
        //{
        //    //foreach (WordTranslation WordTranslation in wordTranslationList)
        //    //{
        //    //    //ServerID = 0;
        //    //    if (WordTranslation.ServerId == 0)
        //    //    {
        //    //        //add
        //    //    }
        //    //    else if (WordTranslation.ServerId < 0)
        //    //    {
        //    //        //delete
        //    //    }
        //    //    else
        //    //    {
        //    //        //check exist
        //    //    }
        //    //    //Server.ID = serverID
        //    //    //ServerID =-ID;
        //    //}
        //    return Ok();
        //}

        /// <summary>
        ///     Pull word pairs
        /// </summary>
        /// <returns>Words pairs to delete and to add</returns>
        /// <response code="200">OK</response>
        /// <response code="401">Unauthorized</response>
        [Authorize]
        [Route("pullWordPairs")]
        [HttpPost]
        [ProducesResponseType(typeof(PullWordsAnswer), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult PullWordPairs([FromBody] List<int> serverIds)
        {
            int authorizedId = User.GetUserId();

            PullWordsAnswer pullAnswer = syncService.PullWordPairs(authorizedId, serverIds);

            return Ok(pullAnswer);
        }

        #region ctor

        private readonly SyncService syncService;


        public SyncController(SyncService syncService)
        {
            this.syncService = syncService;
        }

        #endregion
    }
}