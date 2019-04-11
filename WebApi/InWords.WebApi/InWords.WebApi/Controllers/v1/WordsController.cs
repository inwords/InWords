using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Auth.Extensions;
using InWords.Data.Models;
using InWords.Transfer.Data.Models;
using InWords.WebApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1
{
    /// <inheritdoc />
    /// <summary>
    ///     This is to CRUD words
    /// </summary>
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/[controller]")]
    public class WordsController : ControllerBase
    {
        private readonly WordsService wordsService;

        /// <summary>
        ///     Standard injected constructor
        /// </summary>
        /// <param name="context"></param>
        public WordsController(InWordsDataContext context)
        {
            wordsService = new WordsService(context);
        }

        /// <summary>
        ///     Add list of words in dictionary
        /// </summary>
        /// <param name="wordTranslations"></param>
        /// <returns></returns>
        [Route("addPair")]
        [HttpPost]
        public async Task<IActionResult> AddPair([FromBody] List<WordTranslation> wordTranslations)
        {
            int authorizedId = User.Claims.GetUserId();

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
        ///     Delete UserWordPair from server database.
        /// </summary>
        /// <param name="server_IDs">List ofUserWordPair.UserWordPairID</param>
        /// <returns></returns>
        [Route("deletePair")]
        [HttpPost]
        // ReSharper disable once InconsistentNaming
        public async Task<IActionResult> DeletePair([FromBody] IEnumerable<int> server_IDs)
        {
            int authorizedId = User.Claims.GetUserId();

            int pairDeleted = await wordsService.DeleteUserWordPair(authorizedId, server_IDs);

            return Ok(pairDeleted);
        }
    }
}