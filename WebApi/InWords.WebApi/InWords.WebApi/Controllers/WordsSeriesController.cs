namespace InWords.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
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
        private readonly Data.InWordsDataContext context = null;
        private readonly WordsSeriesService wordsService = null;

        public WordsSeriesController()
        {
            context = new Data.InWordsDataContext();
            wordsService = new WordsSeriesService(context);
        }


        // POST api/Series
        [Authorize]
        [Route("add")]
        [HttpPost]
        public void PostAdd([FromBody] WordsSeriaInformation seria)
        {

        }
    }
}