namespace InWords.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Auth.Providers;
    using InWords.Data;
    using InWords.Data.Models;
    using InWords.Transfer.Data;
    using InWords.WebApi.Service;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WordsSeriesController : ControllerBase
    {
        private readonly InWordsDataContext context = null;
        private readonly WordsSeriesService wordsService = null;

        public WordsSeriesController(InWordsDataContext context)
        {
            this.context = context;
            wordsService = new WordsSeriesService(context);
        }


        // POST api/Series
        [Authorize]
        [Route("add")]
        [HttpPost]
        public async Task<IActionResult> PostAdd([FromBody] WordsSeriaInformation wordsSeriaInformation)
        {
            int authorizedID = AuthProvider.GetUserID(User);

            var answer = await wordsService.AddSeries(authorizedID, wordsSeriaInformation);

            return Ok(answer);
        }
    }
}