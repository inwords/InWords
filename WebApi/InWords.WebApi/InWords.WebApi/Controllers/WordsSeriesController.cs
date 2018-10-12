namespace InWords.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Data.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WordsSeriesController : ControllerBase
    {
        // POST api/Series
        [Authorize]
        [Route("add")]
        [HttpPost]
        public void PostAdd([FromBody] Seria seria)
        {

        }
    }
}