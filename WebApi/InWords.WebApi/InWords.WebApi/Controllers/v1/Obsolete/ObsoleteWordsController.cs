using InWords.Data.DTO;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1
{
    /// <inheritdoc />
    /// <summary>
    ///     This is to CRUD words
    /// </summary>
    [Authorize]
    [Obsolete]
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
        [Obsolete]
        public async Task<IActionResult> AddPair([FromBody] List<WordTranslation> wordTranslations)
        {
            if (!ModelState.IsValid) return BadRequest();

            int authorizedId = User.GetUserId();

            List<SyncBase> answer =
                await wordsService.AddPairAsync(authorizedId, wordTranslations).ConfigureAwait(false);

            return Ok(answer);
        }

        [Route("updatePair")]
        [ProducesResponseType(typeof(List<SyncBase>), StatusCodes.Status200OK)]
        [HttpPost]
        [Obsolete]

        public async Task<IActionResult> UpdatePair([FromBody] Dictionary<int, WordTranslation> wordTranslations)
        {
            int authorizedId = User.GetUserId();

            List<SyncBase> answer = await wordsService.UpdateUserWordPairAsync(authorizedId, wordTranslations)
                .ConfigureAwait(false);

            return Ok(answer);
        }


        /// <summary>
        ///     Delete pairs from user dictionary
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
        [Obsolete]

        // ReSharper disable once InconsistentNaming
        public async Task<IActionResult> DeletePair([FromBody] IEnumerable<int> serverIds)
        {
            int authorizedId = User.GetUserId();

            int pairDeleted = await wordsService.DeleteUserWordPairAsync(authorizedId, serverIds).ConfigureAwait(false);

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