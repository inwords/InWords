using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Data.DTO;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1
{
    /// <inheritdoc />
    /// <summary>
    ///     This is to CRUD words
    /// </summary>
    [Authorize]
    [Produces("application/json")]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/[controller]")]
    public class WordsController : ControllerBase
    {
        /// <summary>
        ///     Add list of words in dictionary
        /// </summary>
        /// <returns>user with id</returns>
        /// <response code="200">OK</response>
        /// <response code="400">Model is not valid</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="404">User not found</response>
        [ProducesResponseType(typeof(List<SyncBase>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Route("addPair")]
        [HttpPost]
        public async Task<IActionResult> AddPair([FromBody] List<WordTranslation> wordTranslations)
        {
            if (!ModelState.IsValid) return BadRequest();

            int authorizedId = User.GetUserId();

            List<SyncBase> answer = await wordsService.AddPair(authorizedId, wordTranslations);

            return Ok(answer);
        }

        //[Route("updatePair")]
        //[HttpPost]
        //public async Task<IActionResult> UpdatePair([FromBody] List<WordTranslation> wordTranslations)
        //{
        //    int authorizedId = User.Claims.GetUserId();

        //    List<SyncBase> answer = await wordsService.UpdateUserWordPair(authorizedId, wordTranslations);

        //    return Ok(answer);
        //}


        /// <summary>
        ///     Delete pairs from user dicrionary
        /// </summary>
        /// <returns>user with id</returns>
        /// <response code="200">OK pair deleted count</response>
        /// <response code="400">Model is not valid</response>
        /// <response code="401">Unauthorized</response>
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Route("deletePair")]
        [HttpPost]
        // ReSharper disable once InconsistentNaming
        public async Task<IActionResult> DeletePair([FromBody] IEnumerable<int> serverIds)
        {
            int authorizedId = User.GetUserId();

            int pairDeleted = await wordsService.DeleteUserWordPair(authorizedId, serverIds);

            return Ok(pairDeleted);
        }

        #region Ctor

        private readonly WordsService wordsService;

        /// <summary>
        /// </summary>
        /// <param name="wordsService"></param>
        public WordsController(WordsService wordsService)
        {
            this.wordsService = wordsService;
        }

        #endregion
    }
}