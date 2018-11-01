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
        private readonly WordsSetsService wordsSeriesService = null;

        public WordsSeriesController(InWordsDataContext context)
        {
            this.context = context;
            wordsSeriesService = new WordsSetsService(context);
        }


        // POST api/Series
        [Route("add")]
        [HttpPost]
        public async Task<IActionResult> PostAdd([FromBody] WordsSeriaInformation wordsSeriaInformation)
        {
            int authorizedID = AuthProvider.GetUserID(User);

            var answer = await wordsSeriesService.AddSeries(authorizedID, wordsSeriaInformation);

            return Ok(answer);
        }

        // Get api/Series
        [AllowAnonymous]
        [Route("{id:int}")]
        [HttpGet]
        public async Task<IActionResult> Get([FromRoute]int id)
        {
            //int authorizedID = AuthProvider.GetUserID(User);
            //var answer = await wordsSeriesService.Get(authorizedID, id);
            var answer = await wordsSeriesService.Get(0, id);
            return Ok(answer);
        }

        // POST api/Series
        [Route("{id:int}/addwords")]
        [HttpPost]
        public async Task<IActionResult> PostAddWords([FromRoute]int id, [FromBody] IEnumerable<WordsSeriaPart> wordsSeriaParts)
        {
            int authorizedID = AuthProvider.GetUserID(User);
            //var answer = await wordsSeriesService.AddSeries(authorizedID, wordsser);
            return Ok();
        }
    }
}