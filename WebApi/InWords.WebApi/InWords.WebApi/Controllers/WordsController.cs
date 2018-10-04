using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Auth.Providers;
using InWords.Data.Models;
using InWords.Data.Models.Repositories;
using InWords.Transfer.Data;
using InWords.WebApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers
{
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
    }
}