namespace InWords.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Data.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class SeriesController : ControllerBase
    {
        // POST api/Series
        [HttpPost]
        public void Post([FromBody] Seria seria)
        {

        }


    }
}