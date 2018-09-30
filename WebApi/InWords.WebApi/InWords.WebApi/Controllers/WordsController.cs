using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Auth.Providers;
using InWords.Data.Models;
using InWords.Data.Models.Repositories;
using InWords.Transfer.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WordsController : ControllerBase
    {
        private readonly UserWordPairRepository userWordPairRepository = null;
        private readonly WordPairRepository wordPairRepository = null;
        private readonly WordRepository wordRepository = null;


        public WordsController()
        {
            Data.InWordsDataContext context = new Data.InWordsDataContext();
            userWordPairRepository = new UserWordPairRepository(context);
            wordPairRepository = new WordPairRepository(context);
            wordRepository = new WordRepository(context);
        }

        [Authorize]
        [Route("addpair")]
        [HttpPost]
        public async Task<IActionResult> AddPair([FromBody] WordTranslation wordTranslation)
        {
            int authorizedID = AuthProvider.GetUserID(User);

            Word firstWordForeign = new Word
            {
                Content = wordTranslation.WordForeign
            };

            Word secondWordNative = new Word
            {
                Content = wordTranslation.WordNative
            };

            var wordpair = await wordPairRepository.Stack(firstWordForeign, secondWordNative);

            Word wordForeign = wordpair.WordForeign;
            Word native = wordpair.WordNative;

            if (wordpair.WordForeign == null)
            {
                wordForeign = await wordRepository.FindById(wordpair.WordNativeID);
            }

            if (wordpair.WordNative == null)
            {
                native = await wordRepository.FindById(wordpair.WordNativeID);
            }

            UserWordPair CreatedPair = new UserWordPair()
            {
                WordPairID = wordpair.WordPairID,
                IsInvertPair = wordForeign.Content == firstWordForeign.Content,
                UserID = authorizedID
            };

            CreatedPair = await userWordPairRepository.Stack(CreatedPair);

            return Ok(CreatedPair.UserWordPairID);
        }
    }
}