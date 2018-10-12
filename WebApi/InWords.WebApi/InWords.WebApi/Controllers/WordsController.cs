namespace InWords.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Auth.Providers;
    using InWords.Transfer.Data;
    using InWords.WebApi.Service;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class WordsController : ControllerBase
    {
        private readonly Data.InWordsDataContext context = null;
        private readonly WordsService wordsService = null;

        public WordsController()
        {
            context = new Data.InWordsDataContext();
            wordsService = new WordsService(context);
        }

        [Authorize]
        [Route("addpair")]
        [HttpPost]
        public async Task<IActionResult> AddPair([FromBody] List<WordTranslation> wordTranslations)
        {
            int authorizedID = AuthProvider.GetUserID(User);

            var answer = await wordsService.AddPair(authorizedID, wordTranslations);

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
            int authorizedID = AuthProvider.GetUserID(User);

            int pairDeleted = await wordsService.DeleteUserWordPair(authorizedID, server_IDs);

            return Ok(pairDeleted);
        }
    }
}