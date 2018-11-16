namespace InWords.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Auth;
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
        private readonly WordsSetsService wordsSeriesService = null;

        public WordsSeriesController(InWordsDataContext context)
        {
            this.context = context;
            wordsSeriesService = new WordsSetsService(context);
        }


        /// POST api/Series
        /// <summary>
        /// The method that takes <see cref="WordsSeriaInformation"/>
        /// as <see cref="SeriaDescription"/>
        /// to update <seealso cref="Seria"/> in database
        /// </summary>
        /// <param name="wordsSeriaInformation">Description of words seria</param>
        /// <returns></returns>
        [Route("add")]
        [HttpPost]
        public async Task<IActionResult> PostAdd([FromBody] WordsSeriaInformation wordsSeriaInformation)
        {
            int authorizedID = User.Claims.GetUserID();

            var answer = await wordsSeriesService.AddSeries(authorizedID, wordsSeriaInformation);

            return Ok(answer);
        }

        // Get api/WordsSeries/id:int
        [Route("{id:int}")]
        [HttpGet]
        public async Task<IActionResult> Get([FromRoute]int id)
        {
            int authorizedID = User.Claims.GetUserID();
            var answer = await wordsSeriesService.Get(authorizedID, id);
            return Ok(answer);
        }

        // Get api/WordsSeries/id:int/words
        [Route("{id:int}/words")]
        [HttpGet]
        public async Task<IActionResult> GetWords([FromRoute]int id)
        {
            int authorizedID = User.Claims.GetUserID();
            var answer = await wordsSeriesService.GetSeriaWords(authorizedID, id);
            return Ok(answer);
        }

        // POST api/Series
        [Route("{id:int}/addwords")]
        [HttpPost]
        public async Task<IActionResult> PostAddWords([FromRoute]int id, [FromBody] WordsSet wordsSeriaPart)
        {
            int authorizedID = User.Claims.GetUserID();
            wordsSeriaPart.ServerId = id;
            await wordsSeriesService.AddWords(authorizedID, wordsSeriaPart);
            return Ok();
        }
    }
}