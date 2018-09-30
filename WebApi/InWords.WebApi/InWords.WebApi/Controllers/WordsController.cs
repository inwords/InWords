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
        [Route("registration")]
        [HttpPost]
        public async Task<IActionResult> AddPair([FromBody] WordTranslation wordTranslation)
        {
            int authorizedID = AuthProvider.GetUserID(User);

            Word first = new Word
            {
                Content = wordTranslation.WordForeign
            };

            Word second = new Word
            {
                Content = wordTranslation.WordNative
            };

            var wordpair = await wordPairRepository.Stack(first, second);

            Word wordForeign = null;//await wordRepository.FindById(wordpair.WordNativeID);
            Word native = null;//await wordRepository.FindById(wordpair.WordNativeID)
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
                WordPair = wordpair,
                IsInvertPair = wordForeign.Content == wordpair.WordForeign.Content,
                UserID = authorizedID
            };

            await userWordPairRepository.Stack(CreatedPair);

            return Ok(CreatedPair.UserWordPairID);
        }
    }
}