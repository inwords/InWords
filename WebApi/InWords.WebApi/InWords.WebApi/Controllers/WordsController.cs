using InWords.Auth.Extensions;
using InWords.Data.Models;
using InWords.Transfer.Data.Models;

namespace InWords.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Auth;
    using InWords.Data;
    using InWords.Transfer.Data;
    using InWords.WebApi.Service;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class WordsController : ControllerBase
    {
        private readonly InWordsDataContext context = null;
        private readonly WordsService wordsService = null;

        public WordsController(InWordsDataContext context)
        {
            this.context = context;
            wordsService = new WordsService(context);
        }

        /// <summary>
        /// Add list of words in dictionary
        /// </summary>
        /// <param name="wordTranslations"></param>
        /// <returns></returns>
        [Authorize]
        [Route("addPair")]
        [HttpPost]
        public async Task<IActionResult> AddPair([FromBody] List<WordTranslation> wordTranslations)
        {
            int authorizedId = User.Claims.GetUserId();

            List<SyncBase> answer = await wordsService.AddPair(authorizedId, wordTranslations);

            return Ok(answer);
        }

        /// <summary>
        /// Delete UserWordPair from server database.
        /// </summary>
        /// <param name="server_IDs">List ofUserWordPair.UserWordPairID</param>
        /// <returns></returns>
        [Authorize]
        [Route("deletepair")]
        [HttpPost]
        public async Task<IActionResult> DeletePair([FromBody] IEnumerable<int> server_IDs)
        {
            int authorizedID = User.Claims.GetUserId();

            int pairDeleted = await wordsService.DeleteUserWordPair(authorizedID, server_IDs);

            return Ok(pairDeleted);
        }
    }
}